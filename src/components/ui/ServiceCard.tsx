import React from "react";
import styles from "./ServiceCard.module.css";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ServiceCardProps {
    title: string;
    description: string;
    price?: string;
    icon?: React.ReactNode;
    href: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, price, icon, href }) => {
    return (
        <div className={styles.card}>
            <div className={styles.iconWrapper}>
                {icon}
            </div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
            {price && <p className={styles.price}>{price}</p>}
            <Link href={href} className={styles.link}>
                Learn More <ArrowRight size={16} />
            </Link>
        </div>
    );
};

export default ServiceCard;
