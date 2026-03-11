import { PrismaClient } from '@prisma/client'
import { products } from '../src/lib/data'

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding...')

    // Clear existing data (optional, but good for idempotent seeds)
    await prisma.product.deleteMany()
    console.log('Cleared existing products')

    for (const product of products) {
        const p = await prisma.product.create({
            data: {
                name: product.name,
                price: product.price,
                category: product.category,
                slug: product.slug,
                image: product.image,
            }
        })
        console.log(`Created product with id: ${p.id} and slug: ${p.slug}`)
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
