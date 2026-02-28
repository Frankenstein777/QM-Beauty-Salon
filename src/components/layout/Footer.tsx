import Link from "next/link";
import { Instagram, Phone, Mail, MapPin, Facebook, Twitter } from "lucide-react";
import styles from "./Footer.module.css";
import Button from "../ui/Button";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.topSection}>
                    <div className={styles.brandColumn}>
                        <h2 className={styles.logo}>QM Beauty Salon<span className={styles.accent}>.</span></h2>
                        <p className={styles.tagline}>
                            Redefining luxury beauty with premium AutoGeles, wigs, and professional styling services.
                        </p>
                        <div className={styles.socials}>
                            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                        </div>
                    </div>

                    <div className={styles.linkColumn}>
                        <h3 className={styles.heading}>Shop</h3>
                        <ul className={styles.linkList}>
                            <li><Link href="/shop">All Products</Link></li>
                            <li><Link href="/shop?category=Auto+gele">Auto gele</Link></li>
                            <li><Link href="/shop?category=Wigs+and+hairs">Wigs and hairs</Link></li>
                            <li><Link href="/shop?category=Make-up">Make-up</Link></li>
                            <li><Link href="/shop?category=Nails+and+lashes">Nails and lashes</Link></li>
                        </ul>
                    </div>

                    <div className={styles.linkColumn}>
                        <h3 className={styles.heading}>Company</h3>
                        <ul className={styles.linkList}>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/services">Services</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                            <li><Link href="/gallery">Portfolio</Link></li>
                        </ul>
                    </div>

                    <div className={styles.newsletterColumn}>
                        <h3 className={styles.heading}>Stay in Style</h3>
                        <p className={styles.newsletterText}>Subscribe for exclusive offers and new arrivals.</p>
                        <form className={styles.form}>
                            <input
                                type="email"
                                placeholder="Your email address"
                                className={styles.input}
                                aria-label="Email for newsletter"
                            />
                            <Button variant="primary" size="md" className={styles.submitBtn}>
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>

                <div className={styles.bottomSection}>
                    <p className={styles.copyright}>&copy; {currentYear} QM Beauty Salon. All rights reserved.</p>
                    <div className={styles.legalLinks}>
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/terms">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
