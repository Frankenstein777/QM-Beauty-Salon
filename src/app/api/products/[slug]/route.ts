import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';

export const dynamic = 'force-dynamic';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> } // Match the unwrap style used in the new component
) {
    try {
        const p = await params;
        const product = await prisma.product.findUnique({
            where: {
                slug: p.slug,
            },
        });

        if (!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }
        return NextResponse.json(product);
    } catch (error) {
        console.error('Failed to fetch product:', error);
        return NextResponse.json(
            { error: 'Failed to fetch product' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ slug: string }> } // Note: Route actually receives ID but folder is named slug for now, reusing slug var
) {
    try {
        const p = await params;

        // Find existing product to get Cloudinary URLs (optional, for cleanup)
        const existing = await prisma.product.findUnique({
            where: { id: p.slug } // Using slug param as ID here because the route is /api/products/[id] basically
        });

        // Basic Cleanup if media exists
        if (existing?.image?.includes('cloudinary')) {
            const urlParts = existing.image.split('/');
            const idWithExt = urlParts[urlParts.length - 1];
            const publicId = `qmgele_products/${idWithExt.split('.')[0]}`;
            await cloudinary.uploader.destroy(publicId);
        }

        await prisma.product.delete({
            where: { id: p.slug }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete product:', error);
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const p = await params;
        const productId = p.slug;

        const data = await request.formData();
        const file = data.get('file') as File | null;
        const name = data.get('name') as string;
        const price = data.get('price') as string;
        const category = data.get('category') as string;

        let mediaUrl = undefined;
        let videoUrl = undefined;

        if (file) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const isVideo = file.type.startsWith('video/');

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
                mediaUrl = result.secure_url.replace(/\.[^/.]+$/, ".jpg");
            } else {
                mediaUrl = result.secure_url;
                videoUrl = null; // Clear old video if uploading image
            }
        }

        const updateData: any = {
            name,
            price,
            category,
        };

        if (mediaUrl !== undefined) {
            updateData.image = mediaUrl;
            if (videoUrl !== undefined) updateData.videoUrl = videoUrl;
        }

        const product = await prisma.product.update({
            where: { id: productId },
            data: updateData
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error('Failed to update product:', error);
        return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }
}
