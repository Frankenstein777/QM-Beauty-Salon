import ServiceCard from "@/components/ui/ServiceCard";
import styles from "./FeaturedServices.module.css";
import { Sparkles, Scissors, Palette, Crown } from "lucide-react";

const services = [
    {
        title: "AutoGele",
        description: "Perfectly styled, ready-to-wear AutoGele for your special occasions. Traditional elegance made easy.",
        icon: <Crown size={24} />,
        href: "/services#gele"
    },
    {
        title: "Professional Makeup",
        description: "Flawless makeup application for weddings, shoots, and parties. Highlight your natural beauty.",
        icon: <Palette size={24} />,
        href: "/services#makeup"
    },
    {
        title: "Hair Styling & Wigs",
        description: "Custom wigs, installation, and bridal hairstyling. Look stunning from head to toe.",
        icon: <Scissors size={24} />,
        href: "/services#hair"
    },
    {
        title: "Nails & Lashes",
        description: "Premium manicure, pedicure, and lash extensions to complete your glam look.",
        icon: <Sparkles size={24} />,
        href: "/services#nails"
    }
];

const FeaturedServices = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.heading}>Our Premium Services</h2>
                    <div className={styles.divider}></div>
                    <p className={styles.subheading}>Discover the art of beauty with our signature treatments.</p>
                </div>

                <div className={styles.grid}>
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            title={service.title}
                            description={service.description}
                            icon={service.icon}
                            href={service.href}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedServices;
