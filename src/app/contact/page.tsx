import styles from "./page.module.css";
import Button from "@/components/ui/Button";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Get in Touch</h1>
                <p className={styles.subtitle}>We'd love to hear from you.</p>
            </header>

            <div className={styles.content}>
                <div className={styles.infoColumn}>
                    <div className={styles.infoItem}>
                        <div className={styles.iconWrapper}><Phone size={24} /></div>
                        <div>
                            <h3>Phone</h3>
                            <p>+1 (437) 263-0869</p>
                        </div>
                    </div>
                    <div className={styles.infoItem}>
                        <div className={styles.iconWrapper}><Mail size={24} /></div>
                        <div>
                            <h3>Email</h3>
                            <p>Qmbeautysalon@gmail.com</p>
                        </div>
                    </div>
                    <div className={styles.infoItem}>
                        <div className={styles.iconWrapper}><MapPin size={24} /></div>
                        <div>
                            <h3>Studio</h3>
                            <p>123 Luxury Lane, Lekki Phase 1, Lagos</p>
                        </div>
                    </div>
                    <div className={styles.socialRow}>
                        <h3>Connect with us</h3>
                        <div className={styles.socialIcons}>
                            <a href="https://www.instagram.com/qmbeautysalon" target="_blank" rel="noopener noreferrer">Instagram</a>
                            <a href="https://www.tiktok.com/@qmmakeover" target="_blank" rel="noopener noreferrer">TikTok</a>
                            <a href="https://facebook.com/queencyjones.eze" target="_blank" rel="noopener noreferrer">Facebook</a>
                        </div>
                    </div>

                    <div className={styles.mapContainer} style={{ backgroundImage: "url('/placeholder-11.jpg')", backgroundSize: 'cover' }}>
                    </div>
                </div>

                <div className={styles.formColumn}>
                    <form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label>Name</label>
                            <input type="text" placeholder="Your Name" className={styles.input} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Email</label>
                            <input type="email" placeholder="Your Email" className={styles.input} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Subject</label>
                            <select className={styles.select}>
                                <option>General Inquiry</option>
                                <option>Booking Request</option>
                                <option>Custom Order</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Message</label>
                            <textarea placeholder="How can we help you?" className={styles.textarea} rows={6}></textarea>
                        </div>
                        <Button variant="primary" size="lg" fullWidth>Send Message</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
