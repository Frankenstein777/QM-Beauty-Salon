"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Button from "@/components/ui/Button";
import { Check, X } from "lucide-react";

interface ServiceItem {
    id: string;
    name: string;
    price: string;
    description: string;
    features: string[];
    image: string;
}

interface ServiceCategory {
    title: string;
    id: string;
    description: string;
    items: ServiceItem[];
}

const serviceCategories: ServiceCategory[] = [
    {
        title: "AutoGele & Headwraps",
        id: "gele",
        description: "Hand-tied perfection for every occasion. No stress, just elegance.",
        items: [
            {
                id: "auto-gele-basic",
                name: "Standard AutoGele",
                price: "$15",
                description: "Pre-styled gele that is easy to wear and fully adjustable. Available in various fabrics including Asooke and Damask.",
                features: ["Custom fabric choice", "Adjustable velcro strap", "Secure fit", "Reusable"],
                image: "/Autogele 4.png"
            },
            {
                id: "bridal-gele",
                name: "Bridal Gele Styling",
                price: "From $40",
                description: "Exquisite, intricate gele styling specifically designed for brides. Includes on-site styling service.",
                features: ["On-site styling", "Intricate multi-layer design", "Accessory placement", "Consultation included"],
                image: "/Autogele 3.png"
            }
        ]
    },
    {
        title: "Professional Makeup",
        id: "makeup",
        description: "Enhancing your natural beauty with premium products and expert techniques.",
        items: [
            {
                id: "soft-glam",
                name: "Soft Glam",
                price: "$40",
                description: "A natural, radiant look perfect for daytime events, photoshoots, or guests.",
                features: ["Skin prep & priming", "Light contouring", "Neutral eye look", "Premium lashes included"],
                image: "/lashes 5.jpg"
            },
            {
                id: "bridal-glam",
                name: "Bridal Makeup",
                price: "From $150",
                description: "High-definition, long-lasting makeup artistry for your special day. Waterproof and tear-proof.",
                features: ["Pre-wedding trial", "Luxury skin prep", "Touch-up kit included", "Full body glow"],
                image: "/makeup 1.jpg"
            }
        ]
    },
    {
        title: "Hair & Wigs",
        id: "hair",
        description: "From custom wig making to flawless installations.",
        items: [
            {
                id: "wig-install",
                name: "Wig Installation",
                price: "$25",
                description: "Flawless frontal or closure installation with customization for a natural hairline.",
                features: ["Bleached knots", "Haipline plucking", "Hot comb styling", "Baby hairs (optional)"],
                image: "/wig 1.jpeg"
            },
            {
                id: "custom-wig",
                name: "Custom Wig Making",
                price: "From $50",
                description: "Bespoke wig construction tailored to your exact head measurements.",
                features: ["Machine or hand stitched", "Bundle coloring service", "Cut & Style included", "Elastic band method"],
                image: "/wig 2.jpeg"
            }
        ]
    }
];

export default function ServicesPage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>Our Services</h1>
                    <p className={styles.subtitle}>Curated beauty experiences designed to make you shine.</p>
                </div>
            </header>

            <div className={styles.content}>
                {serviceCategories.map((category) => (
                    <section key={category.id} id={category.id} className={styles.categorySection}>
                        <div className={styles.categoryHeader}>
                            <h2 className={styles.categoryTitle}>{category.title}</h2>
                            <p className={styles.categoryDesc}>{category.description}</p>
                        </div>

                        <div className={styles.grid}>
                            {category.items.map((item) => (
                                <div key={item.id} className={styles.card}>
                                    <div
                                        className={styles.imageContainer}
                                        onClick={() => setSelectedImage(item.image)}
                                        role="button"
                                        aria-label={`View full image for ${item.name}`}
                                    >
                                        <div
                                            className={styles.image}
                                            style={{ backgroundImage: `url('${encodeURI(item.image)}')` }}
                                        />
                                        <div className={styles.imageOverlay}>
                                            <span>View Full Image</span>
                                        </div>
                                        <span className={styles.priceTag}>{item.price}</span>
                                    </div>

                                    <div className={styles.cardBody}>
                                        <h3 className={styles.itemName}>{item.name}</h3>
                                        <p className={styles.description}>{item.description}</p>

                                        <div className={styles.divider}></div>

                                        <ul className={styles.features}>
                                            {item.features.map((feature, idx) => (
                                                <li key={idx} className={styles.feature}>
                                                    <Check size={14} className={styles.checkIcon} /> {feature}
                                                </li>
                                            ))}
                                        </ul>

                                        <Button variant="primary" fullWidth href="/contact">
                                            Book Appointment
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}

                {/* CTA Section */}
                <div className={styles.ctaSection}>
                    <h2>Ready to transform your look?</h2>
                    <p>Book a consultation with Queen Mary today.</p>
                    <Button variant="outline" size="lg" href="/contact">Contact Us</Button>
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className={styles.lightboxOverlay} onClick={() => setSelectedImage(null)}>
                    <button
                        className={styles.lightboxCloseBtn}
                        onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                        aria-label="Close image"
                    >
                        <X size={32} />
                    </button>
                    <div
                        className={styles.lightboxContent}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
                    >
                        <img
                            src={encodeURI(selectedImage)}
                            alt="Service full view"
                            className={styles.lightboxImage}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
