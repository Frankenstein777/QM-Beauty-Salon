"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import styles from "./Toast.module.css";

interface ToastProps {
    message: string;
    type: "success" | "info" | "error";
    onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animation
        requestAnimationFrame(() => setIsVisible(true));
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for fade out animation
    };

    const icons = {
        success: <CheckCircle2 size={20} color="var(--gold)" />,
        error: <XCircle size={20} color="#ff3333" />,
        info: <Info size={20} color="var(--black)" />
    };

    return (
        <div className={`${styles.toast} ${styles[type]} ${isVisible ? styles.visible : ""}`}>
            <span className={styles.icon}>{icons[type]}</span>
            <span className={styles.message}>{message}</span>
            <button className={styles.closeBtn} onClick={handleClose}>
                <X size={16} />
            </button>
        </div>
    );
}
