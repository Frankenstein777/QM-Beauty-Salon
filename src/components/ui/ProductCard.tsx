"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Eye } from "lucide-react";
import styles from "./ProductCard.module.css";
import Button from "./Button";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
    id: string;
    name: string;
    price: string;
    image: string;
    category: string;
    slug: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
    id,
    name,
    price,
    image,
    category,
    slug,
}) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        // Simple price parser to numeric. e.g "₦15,000" -> 15000
        const numericPrice = parseFloat(price.replace(/[^0-9.-]+/g, "")) || 0;

        addToCart({
            id,
            name,
            price: numericPrice,
            image,
            quantity: 1,
        });
        alert(`${name} added to bag!`);
    };

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                {/* Using a div background for now as specific dimensions might vary, 
            or Next.js Image with fill if we have real images. 
            For this demo, we'll use a placeholder structure relative to the implementation plan. 
        */}
                <Link href={`/shop/${slug}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                    <div
                        className={styles.imagePlaceholder}
                        style={{ backgroundImage: `url('${encodeURI(image)}')` }}
                    />
                    <div className={styles.overlay}>
                        <div className={styles.actions}>
                            <Button variant="primary" size="sm" icon={<ShoppingBag size={16} />} onClick={(e) => {
                                e.preventDefault();
                                handleAddToCart();
                            }}>
                                Add to Cart
                            </Button>
                            <Button variant="secondary" size="sm" icon={<Eye size={16} />} onClick={(e) => {
                                // Default link behavior handles navigation
                            }}>
                                View
                            </Button>
                        </div>
                    </div>
                    <span className={styles.categoryTag}>{category}</span>
                </Link>
            </div>

            <div className={styles.details}>
                <Link href={`/shop/${slug}`}>
                    <h3 className={styles.name}>{name}</h3>
                </Link>
                <span className={styles.price}>{price}</span>
            </div>
        </div>
    );
};

export default ProductCard;
