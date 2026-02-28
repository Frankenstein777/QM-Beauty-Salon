"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import ProductCard from "@/components/ui/ProductCard";
import { Filter, ChevronDown } from "lucide-react";

// Extended Mock Data
export const products = [
    // Auto gele
    { id: "1", name: "Royal Auto gele - Gold", price: "₦15,000", category: "Auto gele", slug: "royal-autogele-gold", image: "/Autogele 1.png" },
    { id: "2", name: "Swarovski Auto gele", price: "₦35,000", category: "Auto gele", slug: "swarovski-autogele", image: "/Autogele 2.png" },
    { id: "3", name: "Bridal Auto gele - Pearl", price: "₦25,000", category: "Auto gele", slug: "bridal-autogele-pearl", image: "/Autogele 3.png" },
    { id: "4", name: "Emerald Green Auto gele", price: "₦18,000", category: "Auto gele", slug: "emerald-autogele", image: "/Autogele 4.png" },
    { id: "5", name: "Ruby Red Auto gele", price: "₦18,000", category: "Auto gele", slug: "ruby-autogele", image: "/Autogele 5.png" },

    // Wigs and hairs
    { id: "6", name: "Luxury Bone Straight Wig", price: "₦150,000", category: "Wigs and hairs", slug: "luxury-bone-straight", image: "/wig 1.jpeg" },
    { id: "7", name: "Double Drawn Human Hair", price: "₦85,000", category: "Wigs and hairs", slug: "double-drawn-hair", image: "/wig 2.jpeg" },
    { id: "8", name: "Kinky Curly Wig", price: "₦65,000", category: "Wigs and hairs", slug: "kinky-curly-wig", image: "/wig 3.jpeg" },
    { id: "9", name: "Body Wave Frontal Wig", price: "₦120,000", category: "Wigs and hairs", slug: "body-wave-frontal", image: "/wig 4.jpeg" },
    { id: "10", name: "Bob Style HD Lace Wig", price: "₦75,000", category: "Wigs and hairs", slug: "bob-style-hd-lace", image: "/wig 1.jpeg" },

    // Make-up
    { id: "11", name: "Velvet Matte Lip Kit", price: "₦12,000", category: "Make-up", slug: "velvet-matte-lip", image: "/makeup 1.jpg" },
    { id: "12", name: "Bridal Glow Foundation", price: "₦25,000", category: "Make-up", slug: "bridal-glow-foundation", image: "/makeup 2.jpg" },
    { id: "13", name: "Eyeshadow Palette - Sunset", price: "₦15,000", category: "Make-up", slug: "eyeshadow-palette-sunset", image: "/makeup 3.jpg" },
    { id: "14", name: "Setting Spray - Long Lasting", price: "₦10,000", category: "Make-up", slug: "setting-spray", image: "/makeup 1.jpg" },
    { id: "15", name: "HD Concealer - Warm", price: "₦8,000", category: "Make-up", slug: "hd-concealer", image: "/makeup 2.jpg" },

    // Nails and lashes
    { id: "16", name: "Mink Lashes - Dramatic", price: "₦5,000", category: "Nails and lashes", slug: "mink-lashes-dramatic", image: "/lashes 1.jpg" },
    { id: "17", name: "Natural Silk Lashes", price: "₦4,500", category: "Nails and lashes", slug: "natural-silk-lashes", image: "/lashes 2.jpg" },
    { id: "18", name: "Press-on Nails - French Tip", price: "₦7,000", category: "Nails and lashes", slug: "press-on-nails-french", image: "/Nails 1.jpeg" },
    { id: "19", name: "Acrylic Nail Kit", price: "₦25,000", category: "Nails and lashes", slug: "acrylic-nail-kit", image: "/Nails 2.jpeg" },
    { id: "20", name: "Gel Polish Set", price: "₦18,000", category: "Nails and lashes", slug: "gel-polish-set", image: "/nails 3.jpeg" }
];

const categories = ["All", "Auto gele", "Wigs and hairs", "Make-up", "Nails and lashes"];

export default function ShopPage() {
    const [displayProducts, setDisplayProducts] = useState(products);

    useEffect(() => {
        // Shuffle products on component mount so it's random on each visit
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        setDisplayProducts(shuffled);
    }, []);

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <h1 className={styles.title}>Shop Collections</h1>
                <p className={styles.subtitle}>Curated luxury for the modern woman.</p>
            </div>

            <div className={styles.layout}>
                {/* Sidebar Filters */}
                <aside className={styles.sidebar}>
                    <div className={styles.filterGroup}>
                        <h3 className={styles.filterTitle}>
                            Category <ChevronDown size={16} />
                        </h3>
                        <ul className={styles.filterList}>
                            {categories.map((cat) => (
                                <li key={cat} className={cat === "All" ? styles.activeFilter : ""}>
                                    {cat}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.filterGroup}>
                        <h3 className={styles.filterTitle}>
                            Price <ChevronDown size={16} />
                        </h3>
                        <div className={styles.priceRange}>
                            <input type="range" min="0" max="200000" className={styles.rangeInput} />
                            <div className={styles.priceLabels}>
                                <span>₦0</span>
                                <span>₦200k+</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className={styles.main}>
                    <div className={styles.toolbar}>
                        <span>Showing {displayProducts.length} results</span>
                        <button className={styles.sortBtn}>
                            Sort by: Featured <ChevronDown size={14} />
                        </button>
                        <button className={styles.mobileFilterBtn}>
                            Filter <Filter size={14} />
                        </button>
                    </div>

                    <div className={styles.grid}>
                        {displayProducts.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
