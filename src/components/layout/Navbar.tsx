"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import styles from "./Navbar.module.css";

import { useCart } from "@/context/CartContext";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { cartCount } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Shop", href: "/shop" },
        { name: "Services", href: "/services" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : styles.transparent}`}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <button className={styles.mobileToggle} onClick={toggleMenu} aria-label="Toggle menu">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <Link href="/" className={styles.logo} onClick={closeMenu}>
                        QM Beauty Salon<span className={styles.accent}>.</span>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className={styles.center}>
                    {navLinks.map((link) => (
                        <Link key={link.name} href={link.href} className={styles.navLink}>
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className={styles.right}>
                    <button className={styles.iconBtn} aria-label="Search">
                        <Search size={20} />
                    </button>
                    <Link href="/cart" className={styles.iconBtn} aria-label="Cart">
                        <ShoppingBag size={20} />
                        <span className={styles.cartBadge}>{cartCount}</span>
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
                <div className={styles.mobileHeader}>
                    <span className={styles.mobileLogo}>QM Beauty Salon.</span>
                    <button onClick={closeMenu}><X size={28} /></button>
                </div>
                <div className={styles.mobileLinks}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={styles.mobileLink}
                            onClick={closeMenu}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
