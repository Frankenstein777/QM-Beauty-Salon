"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import ProductCard from "@/components/ui/ProductCard";
import Button from "@/components/ui/Button";
import { products } from "@/lib/data";

export default function WishlistPage() {
    const [wishlistProducts, setWishlistProducts] = useState<typeof products>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('wishlist');
        if (stored) {
            const wishlistIds = JSON.parse(stored);
            const items = products.filter(p => wishlistIds.includes(p.id));
            setWishlistProducts(items);
        }
        setIsLoaded(true);
    }, []);

    const clearWishlist = () => {
        if (confirm("Are you sure you want to clear your wishlist?")) {
            localStorage.setItem('wishlist', JSON.stringify([]));
            setWishlistProducts([]);
        }
    };

    if (!isLoaded) return <div className={styles.container}><div className={styles.loading}>Loading your wishlist...</div></div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Your Wishlist</h1>
                <p className={styles.subtitle}>Pieces you have your eye on.</p>
            </div>

            <div className={styles.content}>
                {wishlistProducts.length > 0 ? (
                    <>
                        <div className={styles.toolbar}>
                            <span>{wishlistProducts.length} items saved</span>
                            <button className={styles.clearBtn} onClick={clearWishlist}>Clear Wishlist</button>
                        </div>
                        <div className={styles.grid}>
                            {wishlistProducts.map(product => (
                                <ProductCard key={product.id} {...product} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className={styles.emptyState}>
                        <h2>Your wishlist is empty</h2>
                        <p>Browse our catalog and save your favorite styles for later.</p>
                        <Button href="/shop" variant="primary" size="lg" className={styles.shopBtn}>
                            Explore Shop
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
