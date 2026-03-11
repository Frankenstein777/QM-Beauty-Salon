"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Button from "@/components/ui/Button";
import { UploadCloud, X, ArrowLeft } from "lucide-react";

export default function AddProductPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "Auto gele",
    });

    const categories = ["Auto gele", "Wigs and hairs", "Make-up", "Nails and lashes"];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("price", formData.price.toString());
            data.append("category", formData.category);
            if (file) {
                data.append("file", file);
            }

            const res = await fetch("/api/products", {
                method: "POST",
                body: data,
            });

            if (res.ok) {
                alert("Product created successfully!");
                router.push("/admin/products");
            } else {
                const error = await res.json();
                alert(`Error: ${error.error}`);
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while creating the product.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Button variant="text" href="/admin/products" icon={<ArrowLeft size={16} />}>
                    Back to Catalog
                </Button>
                <h1 className={styles.title}>Add New Product</h1>
                <p className={styles.subtitle}>Upload images or videos of your new collection.</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <div className={styles.mainColumn}>
                    <div className={styles.card}>
                        <h3>Basic Details</h3>

                        <div className={styles.inputGroup}>
                            <label>Product Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. Royal Gold Auto Gele"
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.rowLayout}>
                            <div className={styles.inputGroup}>
                                <label>Price ($)</label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    placeholder="0.00"
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label>Category</label>
                                <select
                                    className={styles.input}
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    {categories.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <h3>Media Upload</h3>
                        <p className={styles.helperText}>Upload an image or short marketing video for this product.</p>

                        {!previewUrl ? (
                            <div className={styles.uploadArea}>
                                <input
                                    type="file"
                                    accept="image/*,video/mp4,video/quicktime"
                                    className={styles.fileInput}
                                    onChange={handleFileChange}
                                    id="media-upload"
                                />
                                <label htmlFor="media-upload" className={styles.uploadLabel}>
                                    <UploadCloud size={40} className={styles.uploadIcon} />
                                    <span>Click to upload or drag and drop</span>
                                    <span className={styles.uploadSubInfo}>SVG, PNG, JPG or MP4 (max. 10MB)</span>
                                </label>
                            </div>
                        ) : (
                            <div className={styles.previewArea}>
                                {file?.type.startsWith('video/') ? (
                                    <video src={previewUrl} controls className={styles.mediaPreview} />
                                ) : (
                                    <img src={previewUrl} alt="Preview" className={styles.mediaPreview} />
                                )}
                                <button
                                    type="button"
                                    className={styles.removeMediaBtn}
                                    onClick={() => {
                                        setFile(null);
                                        setPreviewUrl(null);
                                    }}
                                >
                                    <X size={16} /> Remove Media
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.sidebarColumn}>
                    <div className={styles.card}>
                        <h3>Publish</h3>
                        <p className={styles.helperText}>Ready to show this product to your queens?</p>
                        <Button
                            variant="primary"
                            size="lg"
                            fullWidth
                            disabled={isLoading}
                            className={styles.publishBtn}
                        >
                            {isLoading ? "Saving..." : "Publish Product"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
