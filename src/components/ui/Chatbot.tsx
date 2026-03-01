"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./Chatbot.module.css";
import { MessageCircle, X, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface ChatOption {
    label: string;
    action: () => void;
}

interface Message {
    id: string;
    text: string;
    sender: "bot" | "user";
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", text: "Hello! Welcome to QM Beauty Salon. How can I assist your luxury experience today?", sender: "bot" }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const addMessage = (text: string, sender: "bot" | "user") => {
        setMessages((prev) => [...prev, { id: Date.now().toString(), text, sender }]);
    };

    const handleOptionClick = (option: ChatOption) => {
        addMessage(option.label, "user");
        setIsTyping(true);

        // Simulate bot thinking time
        setTimeout(() => {
            option.action();
            setIsTyping(false);
        }, 800);
    };

    // Conversation Flow Logic
    const [currentStep, setCurrentStep] = useState<string>("start");

    const getOptionsForStep = (step: string): ChatOption[] => {
        switch (step) {
            case "start":
                return [
                    {
                        label: "Shop Collections", action: () => {
                            addMessage("Excellent choice. Would you like to see our Auto gele, Wigs and hairs, Make-up, or Nails and lashes?", "bot");
                            setCurrentStep("shop_category");
                        }
                    },
                    {
                        label: "Book a Service", action: () => {
                            addMessage("We offer premium beauty services. You can book directly or reach out via our social channels.", "bot");
                            setCurrentStep("service_type");
                        }
                    },
                    {
                        label: "My Wishlist", action: () => {
                            addMessage("You can view your saved luxury items in your Wishlist. I'll take you there.", "bot");
                            setCurrentStep("wishlist_nav");
                        }
                    },
                    {
                        label: "Contact & Socials", action: () => {
                            addMessage("Connect with us! You can chat on WhatsApp, DM on Instagram, or visit our contact page.", "bot");
                            setCurrentStep("contact_options");
                        }
                    }
                ];

            case "shop_category":
                return [
                    { label: "Auto gele", action: () => handleRedirect("/shop?category=Auto+gele", "Navigating to our Auto gele collection...") },
                    { label: "Wigs and hairs", action: () => handleRedirect("/shop?category=Wigs+and+hairs", "Showcasing our luxury wigs and hairs...") },
                    { label: "Make-up", action: () => handleRedirect("/shop?category=Make-up", "Explore our make-up line...") },
                    { label: "Nails and lashes", action: () => handleRedirect("/shop?category=Nails+and+lashes", "Explore our nails and lashes line...") },
                    { label: "Back to Menu", action: () => resetChat() }
                ];

            case "service_type":
                return [
                    { label: "Bridal Services", action: () => handleRedirect("/services#gele", "View our Bridal Gele packages...") },
                    { label: "Book via WhatsApp", action: () => handleExternalLink("https://wa.me/2348001234567", "Opening WhatsApp for booking...") },
                    { label: "DM on Instagram", action: () => handleExternalLink("https://instagram.com", "Opening Instagram...") },
                    { label: "Back to Menu", action: () => resetChat() }
                ];

            case "contact_options":
                return [
                    { label: "WhatsApp Us", action: () => handleExternalLink("https://wa.me/2348001234567", "Opening WhatsApp...") },
                    { label: "Instagram", action: () => handleExternalLink("https://instagram.com", "Opening Instagram...") },
                    { label: "Go to Contact Page", action: () => handleRedirect("/contact", "Taking you to our Contact page...") },
                    { label: "Back to Menu", action: () => resetChat() }
                ];

            case "wishlist_nav":
                return [
                    { label: "Go to Wishlist", action: () => handleRedirect("/wishlist", "Redirecting to Wishlist...") },
                    { label: "No, Back to Menu", action: () => resetChat() }
                ];

            default:
                return [{ label: "Start Over", action: () => resetChat() }];
        }
    };

    const handleRedirect = (path: string, botMessage: string) => {
        addMessage(botMessage, "bot");
        setTimeout(() => {
            router.push(path);
            // Optional: Close chat on mobile after navigation
            if (window.innerWidth < 768) setIsOpen(false);
        }, 1000);
    };

    const handleExternalLink = (url: string, botMessage: string) => {
        addMessage(botMessage, "bot");
        setTimeout(() => {
            window.open(url, "_blank");
        }, 1000);
    };

    const resetChat = () => {
        addMessage("How else can I help you regarding our luxury services?", "bot");
        setCurrentStep("start");
    };

    const currentOptions = getOptionsForStep(currentStep);

    return (
        <>
            {/* Floating Toggle Button */}
            <button
                className={`${styles.toggleBtn} ${isOpen ? styles.active : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Chat"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
            </button>

            {/* Chat Window */}
            <div className={`${styles.chatWindow} ${isOpen ? styles.open : ''}`}>
                <div className={styles.header}>
                    <div className={styles.avatar}>QM</div>
                    <div className={styles.headerInfo}>
                        <h3>QM Beauty Salon Concierge</h3>
                        <p>Always here to help</p>
                    </div>
                    <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>
                        <X size={18} />
                    </button>
                </div>

                <div className={styles.messagesArea}>
                    {messages.map((msg) => (
                        <div key={msg.id} className={`${styles.message} ${styles[msg.sender]}`}>
                            {msg.text}
                        </div>
                    ))}
                    {isTyping && (
                        <div className={`${styles.message} ${styles.bot} ${styles.typing}`}>
                            <span></span><span></span><span></span>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className={styles.optionsArea}>
                    <div className={styles.optionsGrid}>
                        {currentOptions.map((option, idx) => (
                            <button
                                key={idx}
                                className={styles.optionBtn}
                                onClick={() => handleOptionClick(option)}
                                disabled={isTyping}
                            >
                                {option.label} <ChevronRight size={14} />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
