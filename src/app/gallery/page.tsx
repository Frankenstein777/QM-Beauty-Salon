import styles from "./page.module.css";
import { Instagram } from "lucide-react";

const galleryImages = [
    { id: 1, category: "Make-up", src: "/makeup 1.jpg", alt: "Bridal Makeup" },
    { id: 2, category: "Auto gele", src: "/Autogele 2.png", alt: "Royal Auto gele" },
    { id: 3, category: "Wigs and hairs", src: "/wig 2.jpeg", alt: "Custom Wig Unit" },
    { id: 4, category: "Nails and lashes", src: "/Nails 1.jpeg", alt: "Gel Manicure" },
    { id: 5, category: "Make-up", src: "/makeup 2.jpg", alt: "Party Glam" },
    { id: 6, category: "Wigs and hairs", src: "/wig 3.jpeg", alt: "Bridal Hairstyling" },
];

export default function GalleryPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Our Portfolio</h1>
                <p className={styles.subtitle}>A showcase of elegance and style.</p>
            </header>

            <div className={styles.galleryGrid}>
                {galleryImages.map((image) => (
                    <div key={image.id} className={styles.galleryItem}>
                        <div className={styles.imagePlaceholder}>
                            <span className={styles.categoryTag}>{image.category}</span>
                        </div>
                        <div className={styles.overlay}>
                            <p className={styles.imageCaption}>{image.alt}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.instagramCta}>
                <p>Follow us on Instagram for more looks</p>
                <a href="https://instagram.com/qmbeautysalon" target="_blank" rel="noopener noreferrer" className={styles.igLink}>@QMBeautySalon</a>
            </div>
        </div>
    );
}
