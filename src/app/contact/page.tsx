import styles from "./page.module.css";
import { Phone, Mail, Instagram, MapPin, MessageCircle, Video } from "lucide-react";

const links = [
    {
        title: "Chat on WhatsApp",
        subtitle: "+1 (437) 263-0869",
        icon: <MessageCircle size={24} />,
        url: "https://wa.me/14372630869",
        color: "#25D366"
    },
    {
        title: "Follow on Instagram",
        subtitle: "@qmbeautysalon",
        icon: <Instagram size={24} />,
        url: "https://www.instagram.com/qmbeautysalon",
        color: "#E1306C"
    },
    {
        title: "Follow on TikTok",
        subtitle: "@qmmakeover",
        icon: <Video size={24} />,
        url: "https://www.tiktok.com/@qmmakeover",
        color: "#000000"
    },
    {
        title: "Send an Email",
        subtitle: "Qmbeautysalon@gmail.com",
        icon: <Mail size={24} />,
        url: "mailto:Qmbeautysalon@gmail.com",
        color: "#D4AF37"
    }
];

export default function ContactPage() {
    return (
        <div className={styles.container}>
            <div className={styles.profileSection}>
                <div className={styles.avatar} style={{ backgroundImage: "url('/CEO picture.jpg')" }}></div>
                <h1 className={styles.title}>QM Beauty Salon</h1>
                <p className={styles.subtitle}>Let's connect! Choose how you'd like to reach out.</p>
                <div className={styles.locationBadge}>
                    <MapPin size={14} /> Based in Canada
                </div>
            </div>

            <div className={styles.linksContainer}>
                {links.map((link, index) => (
                    <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkCard}
                    >
                        <div className={styles.linkIcon} style={{ color: link.color }}>
                            {link.icon}
                        </div>
                        <div className={styles.linkContent}>
                            <span className={styles.linkTitle}>{link.title}</span>
                            <span className={styles.linkSubtitle}>{link.subtitle}</span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
