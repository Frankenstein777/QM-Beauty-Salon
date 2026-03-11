"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import ProductCard from "@/components/ui/ProductCard";
import { Filter, ChevronDown, X } from "lucide-react";

import { categories } from "@/lib/data";

interface Product {
    id: string;
    name: string;
    price: string;
    category: string;
    slug: string;
    image: string | null;
}

function ShopContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q")?.toLowerCase() || "";

    const [products, setProducts] = useState<Product[]>([]);
    const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
    const [sortBy, setSortBy] = useState("featured");
    const [activeCategory, setActiveCategory] = useState("All");
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [priceRange, setPriceRange] = useState(500);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        let filtered = [...products];

        // Search query
        if (query) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query)
            );
        }

        // Category
        if (activeCategory !== "All") {
            filtered = filtered.filter(p => p.category === activeCategory);
        }

        // Price range
        filtered = filtered.filter(p => {
            const numPrice = typeof p.price === 'string'
                ? parseFloat(p.price.replace(/[^0-9.-]+/g, "")) || 0
                : (p.price as unknown as number) || 0;
            return numPrice <= priceRange;
        });

        // Sorting
        switch (sortBy) {
            case "price-asc":
                filtered.sort((a, b) => {
                    const priceA = typeof a.price === 'string' ? parseFloat(a.price.replace(/[^0-9.-]+/g, "")) : (a.price as unknown as number);
                    const priceB = typeof b.price === 'string' ? parseFloat(b.price.replace(/[^0-9.-]+/g, "")) : (b.price as unknown as number);
                    return priceA - priceB;
                });
                break;
            case "price-desc":
                filtered.sort((a, b) => {
                    const priceA = typeof a.price === 'string' ? parseFloat(a.price.replace(/[^0-9.-]+/g, "")) : (a.price as unknown as number);
                    const priceB = typeof b.price === 'string' ? parseFloat(b.price.replace(/[^0-9.-]+/g, "")) : (b.price as unknown as number);
                    return priceB - priceA;
                });
                break;
            case "name-asc":
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name-desc":
                filtered.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }

        setDisplayProducts(filtered);
    }, [query, activeCategory, priceRange, sortBy]);

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <h1 className={styles.title}>Shop Collections</h1>
                <p className={styles.subtitle}>Curated luxury for the modern woman.</p>
            </div>

            <div className={styles.layout}>
                {/* Mobile Filter Overlay Background */}
                {isMobileFilterOpen && (
                    <div className={styles.mobileFilterOverlay} onClick={() => setIsMobileFilterOpen(false)} />
                )}

                {/* Sidebar Filters */}
                <aside className={`${styles.sidebar} ${isMobileFilterOpen ? styles.sidebarOpen : ""}`}>
                    {isMobileFilterOpen && (
                        <div className={styles.mobileSidebarHeader}>
                            <h2>Filters</h2>
                            <button className={styles.closeSidebarBtn} onClick={() => setIsMobileFilterOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>
                    )}

                    <div className={styles.filterGroup}>
                        <h3 className={styles.filterTitle}>
                            Category <ChevronDown size={16} />
                        </h3>
                        <ul className={styles.filterList}>
                            {categories.map((cat) => (
                                <li
                                    key={cat}
                                    className={cat === activeCategory ? styles.activeFilter : ""}
                                    onClick={() => setActiveCategory(cat)}
                                >
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
                            <input
                                type="range"
                                min="0"
                                max="500"
                                step="10"
                                value={priceRange}
                                onChange={(e) => setPriceRange(Number(e.target.value))}
                                className={styles.rangeInput}
                            />
                            <div className={styles.priceLabels}>
                                <span>$0</span>
                                <span>${priceRange}</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className={styles.main}>
                    <div className={styles.toolbar}>
                        <span>Showing {displayProducts.length} results</span>
                        <div className={styles.toolbarActions}>
                            <select
                                className={styles.sortSelect}
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="featured">Sort by: Featured</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="name-asc">Name: A to Z</option>
                                <option value="name-desc">Name: Z to A</option>
                            </select>
                            <button className={styles.mobileFilterBtn} onClick={() => setIsMobileFilterOpen(true)}>
                                Filter <Filter size={14} />
                            </button>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className={styles.loadingContainer}>Loading products...</div>
                    ) : (
                        <div className={styles.grid}>
                            {displayProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    category={product.category}
                                    slug={product.slug}
                                    image={product.image || "/placeholder.jpg"}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={<div className={styles.container}>Loading products...</div>}>
            <ShopContent />
        </Suspense>
    );
}
