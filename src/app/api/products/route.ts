import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
    try {
        const data = await request.formData();
        const file = data.get('file') as File | null;
        const name = data.get('name') as string;
        const price = data.get('price') as string;
        const category = data.get('category') as string;

        // Generate a simple slug
        const baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        let slug = baseSlug;

        // Ensure unique slug
        let counter = 1;
        while (await prisma.product.findUnique({ where: { slug } })) {
            slug = `${baseSlug}-${counter}`;
            counter++;
        }

        let mediaUrl = null;
        let videoUrl = null;

        if (file) {
            // Convert standard fetch File to Node.js Buffer
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const isVideo = file.type.startsWith('video/');

            // Upload to Cloudinary using a standard approach for App Router
            const uploadPromise = new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { resource_type: isVideo ? 'video' : 'image', folder: 'qmgele_products' },
                    (error, result) => {
                        if (error || !result) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(buffer);
            });

            const result = await uploadPromise as any;

            if (isVideo) {
                videoUrl = result.secure_url;
                // Optionally get a thumbnail image from the video
                mediaUrl = result.secure_url.replace(/\.[^/.]+$/, ".jpg");
            } else {
                mediaUrl = result.secure_url;
            }
        }

        const product = await prisma.product.create({
            data: {
                name,
                price,
                category,
                slug,
                image: mediaUrl,
                videoUrl: videoUrl
            },
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error('Failed to create product:', error);
        return NextResponse.json(
            { error: 'Failed to create product' },
            { status: 500 }
        );
    }
}
