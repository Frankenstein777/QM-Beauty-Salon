"use client";

import { use, useState, useEffect } from "react";
import styles from "./page.module.css";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/ui/ProductCard";
import { Star, Minus, Plus, Heart, Share2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

// Import products directly instead of redefining them to ensure consistency
import { products } from "@/app/shop/page";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params); // Unwrapping params for Next.js 15

    type CatalogProduct = typeof products[0];

    // Find the actual product from our catalog
    const currentProduct = products.find(p => p.slug === slug);

    // Add missing mock properties to current product that are needed
    const product = currentProduct ? {
        ...currentProduct,
        description: "Experience the epitome of elegance with this premium item. Crafted from premium materials, this piece features intricate detailing and a comfortable fit. Perfect for weddings, galas, and special occasions.",
        images: [currentProduct.image],
        rating: 4.8,
        reviews: Math.floor(Math.random() * 200) + 10,
        sizes: ["Standard", "Large", "Custom"],
        colors: ["Gold", "Silver", "Rose Gold", "Black"]
    } : {
        // Fallback for unknown slugs
        id: "1",
        name: "Item Not Found",
        price: "$0",
        description: "This item could not be found in our catalog.",
        images: ["/Autogele 1.png"],
        rating: 0,
        reviews: 0,
        sizes: ["Standard"],
        colors: ["Standard"],
        category: "Unknown",
        slug: "unknown"
    };

    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);

    const incrementQty = () => setQuantity((prev) => prev + 1);
    const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const { showToast } = useToast();

    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('wishlist');
        if (stored) {
            const wishlist = JSON.parse(stored);
            if (wishlist.includes(product.id)) {
                setIsWishlisted(true);
            }
        }
    }, [product.id]);

    const toggleWishlist = () => {
        const stored = localStorage.getItem('wishlist') || '[]';
        let wishlist = JSON.parse(stored);

        if (isWishlisted) {
            wishlist = wishlist.filter((id: string) => id !== product.id);
            setIsWishlisted(false);
            showToast("Removed from wishlist!", "info");
        } else {
            if (!wishlist.includes(product.id)) wishlist.push(product.id);
            setIsWishlisted(true);
            showToast("Added to wishlist!", "success");
        }
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    };

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: product.name,
                    text: `Check out this ${product.name} at QM Beauty Salon!`,
                    url: window.location.href,
                });
            } else {
                await navigator.clipboard.writeText(window.location.href);
                showToast("Link copied to clipboard!", "info");
            }
        } catch (error) {
            console.error("Error sharing", error);
        }
    };

    const basePrice = typeof product.price === 'string'
        ? parseFloat(product.price.replace(/[^0-9.-]+/g, "")) || 0
        : (product.price as unknown as number) || 0;

    // Calculate dynamic pricing based on customizations
    const sizeModifier = selectedSize === "Large" ? 15 : selectedSize === "Custom" ? 30 : 0;
    const colorModifier = selectedColor === "Black" || selectedColor === "Standard" ? 0 : 5;

    const numericPrice = basePrice + sizeModifier + colorModifier;

    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: `${product.name} (${selectedSize}, ${selectedColor})`,
            price: numericPrice,
            image: product.images[0],
            size: selectedSize,
            color: selectedColor,
            quantity: quantity
        });
        showToast(`${quantity}x ${product.name} added to your bag!`, "success");
    };

    return (
        <div className={styles.container}>
            <div className={styles.breadcrumb}>
                <span>Shop</span> / <span>{product.category}</span> / <span>{product.name}</span>
            </div>

            <div className={styles.productLayout}>
                {/* Image Gallery */}
                <div className={styles.gallery}>
                    <div className={styles.mainImage} style={{ backgroundImage: `url('${encodeURI(product.images[0])}')` }}>
                        {/* Main Image View */}
                    </div>
                </div>

                {/* Product Details */}
                <div className={styles.details}>
                    <h1 className={styles.title}>{product.name}</h1>
                    <div className={styles.rating}>
                        <div className={styles.stars}>
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "#D4AF37" : "none"} color="#D4AF37" />
                            ))}
                        </div>
                        <span className={styles.reviewCount}>({product.reviews} reviews)</span>
                    </div>

                    <h2 className={styles.price}>${numericPrice.toLocaleString()}</h2>
                    <p className={styles.description}>{product.description}</p>

                    <div className={styles.options}>
                        <div className={styles.optionGroup}>
                            <label>Color: <span className={styles.selectedValue}>{selectedColor}</span></label>
                            <div className={styles.colorOptions}>
                                {product.colors.map((color: string) => (
                                    <button
                                        key={color}
                                        className={`${styles.colorBtn} ${selectedColor === color ? styles.activeColor : ""}`}
                                        onClick={() => setSelectedColor(color)}
                                        style={{ backgroundColor: color === "Gold" ? "#D4AF37" : color === "Silver" ? "#C0C0C0" : color === "Rose Gold" ? "#B76E79" : "#000" }}
                                        aria-label={`Select ${color}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className={styles.optionGroup}>
                            <label>Size: <span className={styles.selectedValue}>{selectedSize}</span></label>
                            <div className={styles.sizeOptions}>
                                {product.sizes.map((size: string) => (
                                    <button
                                        key={size}
                                        className={`${styles.sizeBtn} ${selectedSize === size ? styles.activeSize : ""}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <div className={styles.quantity}>
                            <button onClick={decrementQty}><Minus size={16} /></button>
                            <span>{quantity}</span>
                            <button onClick={incrementQty}><Plus size={16} /></button>
                        </div>
                        <Button variant="primary" size="lg" className={styles.addToCartBtn} fullWidth onClick={handleAddToCart}>
                            Add to Bag - ${(numericPrice * quantity).toLocaleString()}
                        </Button>
                    </div>

                    <div className={styles.metaActions}>
                        <button className={styles.metaBtn} onClick={toggleWishlist}>
                            <Heart size={18} fill={isWishlisted ? "var(--black, #000)" : "none"} />
                            {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                        </button>
                        <button className={styles.metaBtn} onClick={handleShare}>
                            <Share2 size={18} /> Share
                        </button>
                    </div>

                    <div className={styles.guarantees}>
                        <div className={styles.guaranteeItem}>
                            <h4>Premium Quality</h4>
                            <p>Hand-selected materials for lasting beauty.</p>
                        </div>
                        <div className={styles.guaranteeItem}>
                            <h4>Fast Delivery</h4>
                            <p>Ships within 3-5 business days globally.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <section className={styles.relatedSection}>
                <h3 className={styles.sectionTitle}>You May Also Like</h3>
                <div className={styles.relatedGrid}>
                    {products.filter((p: CatalogProduct) => p.category === product.category && p.id !== product.id).slice(0, 3).map((p: CatalogProduct) => (
                        <ProductCard key={p.id} {...p} />
                    ))}
                </div>
            </section>
        </div>
    );
}
