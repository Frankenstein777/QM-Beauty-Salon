"use client";

import { use, useState } from "react";
import styles from "./page.module.css";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/ui/ProductCard";
import { Star, Minus, Plus, Share2, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";

// Mock Data for individual product (would come from API/DB in real app)
const product = {
    id: "1",
    name: "Royal AutoGele - Gold Series",
    price: 15000,
    description: "Experience the epitome of elegance with our hand-tied Royal AutoGele. Crafted from premium Asooke fabric, this piece features intricate detailing and a comfortable adjustable fit. Perfect for weddings, galas, and special occasions.",
    images: ["/Autogele 1.png", "/Autogele 2.png", "/Autogele 3.png"],
    rating: 4.8,
    reviews: 124,
    sizes: ["Standard", "Large", "Custom"],
    colors: ["Gold", "Silver", "Rose Gold", "Black"],
    category: "Auto gele"
};

const relatedProducts = [
    {
        id: "2",
        name: "Luxury Bone Straight Wig",
        price: "₦150,000",
        category: "Wigs and hairs",
        slug: "luxury-bone-straight",
        image: "/wig 1.jpeg"
    },
    {
        id: "6",
        name: "Swarovski Auto gele",
        price: "₦35,000",
        category: "Auto gele",
        slug: "swarovski-autogele",
        image: "/Autogele 2.png"
    },
    {
        id: "4",
        name: "Bridal Handfan - Pearl",
        price: "₦25,000",
        category: "Nails and lashes",
        slug: "bridal-handfan-pearl",
        image: "/Nails 1.jpeg"
    }
];

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params); // Unwrapping params for Next.js 15
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);

    const incrementQty = () => setQuantity((prev) => prev + 1);
    const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            size: selectedSize,
            color: selectedColor,
            quantity: quantity
        });
        alert(`${quantity}x ${product.name} added to your bag!`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.breadcrumb}>
                <span>Shop</span> / <span>{product.category}</span> / <span>{product.name}</span>
            </div>

            <div className={styles.productLayout}>
                {/* Image Gallery */}
                <div className={styles.gallery}>
                    <div className={styles.mainImage} style={{ backgroundImage: `url(${product.images[activeImage]})` }}>
                        {/* Main Image View */}
                    </div>
                    <div className={styles.thumbnailGrid}>
                        {product.images.map((img, idx) => (
                            <button
                                key={idx}
                                className={`${styles.thumbnail} ${activeImage === idx ? styles.activeThumb : ""}`}
                                style={{ backgroundImage: `url(${img})` }}
                                onClick={() => setActiveImage(idx)}
                            />
                        ))}
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

                    <h2 className={styles.price}>₦{product.price.toLocaleString()}</h2>
                    <p className={styles.description}>{product.description}</p>

                    <div className={styles.options}>
                        <div className={styles.optionGroup}>
                            <label>Color: <span className={styles.selectedValue}>{selectedColor}</span></label>
                            <div className={styles.colorOptions}>
                                {product.colors.map((color) => (
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
                                {product.sizes.map((size) => (
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
                            Add to Cart - ₦{(product.price * quantity).toLocaleString()}
                        </Button>
                    </div>

                    <div className={styles.metaActions}>
                        <button className={styles.metaBtn}><Heart size={18} /> Add to Wishlist</button>
                        <button className={styles.metaBtn}><Share2 size={18} /> Share</button>
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
                    {relatedProducts.map((p) => (
                        <ProductCard key={p.id} {...p} />
                    ))}
                </div>
            </section>
        </div>
    );
}
