"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Edit2, Trash2, Plus, Image as ImageIcon, Video as VideoIcon } from "lucide-react";
import styles from "./page.module.css";
import Button from "@/components/ui/Button";

interface Product {
    id: string;
    name: string;
    price: string;
    category: string;
    slug: string;
    image: string | null;
    videoUrl: string | null;
}

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/products");
            if (res.ok) {
                const data = await res.json();
                setProducts(data);
            }
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            const res = await fetch(`/api/products/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setProducts(products.filter(p => p.id !== id));
            } else {
                alert("Failed to delete product");
            }
        } catch (error) {
            console.error(error);
            alert("Error deleting product");
        }
    };

    if (isLoading) {
        return <div className={styles.loading}>Loading catalog...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Product Catalog</h1>
                    <p className={styles.subtitle}>Manage your store's inventory.</p>
                </div>
                <Button href="/admin/products/new" variant="primary" icon={<Plus size={18} />}>
                    Add New Product
                </Button>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Media</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={5} className={styles.emptyState}>No products found. Start by adding one.</td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.id}>
                                    <td className={styles.mediaCell}>
                                        {product.image ? (
                                            <div className={styles.thumbnails}>
                                                <img src={product.image} alt={product.name} className={styles.thumbnail} />
                                                {product.videoUrl && <VideoIcon size={14} className={styles.videoBadge} />}
                                            </div>
                                        ) : (
                                            <div className={styles.placeholderThumbnail}><ImageIcon size={20} /></div>
                                        )}
                                    </td>
                                    <td className={styles.nameCell}>{product.name}</td>
                                    <td><span className={styles.badge}>{product.category}</span></td>
                                    <td className={styles.priceCell}>${product.price}</td>
                                    <td className={styles.actionsCell}>
                                        <Link href={`/admin/products/${product.id}`} className={styles.actionBtn} title="Edit Product">
                                            <Edit2 size={16} />
                                        </Link>
                                        <button
                                            className={`${styles.actionBtn} ${styles.deleteBtn}`}
                                            title="Delete Product"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
