"use client";

import styles from "./page.module.css";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";

export default function CheckoutPage() {
    const { cartItems, subtotal, clearCart } = useCart();
    const router = useRouter();
    const { showToast } = useToast();
    const total = subtotal; // Shipping calculated after

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        apartment: "",
        city: "",
        state: "",
        zip: "",
        phone: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            showToast("Your cart is empty!", "error");
            return;
        }

        if (!formData.firstName || !formData.lastName || !formData.address || !formData.phone) {
            showToast("Please fill in required shipping details (Name, Address, Phone).", "error");
            return;
        }

        const phoneNumber = "14372630869"; // Business WhatsApp Number

        let message = `*New Order from QM Beauty Salon Website* 🛍️\n\n`;
        message += `*Customer Details*\n`;
        message += `Name: ${formData.firstName} ${formData.lastName}\n`;
        message += `Phone: ${formData.phone}\n`;
        message += `Address: ${formData.address}\n`;
        if (formData.apartment) message += `Apt/Suite: ${formData.apartment}\n`;
        message += `City/State: ${formData.city}, ${formData.state} ${formData.zip}\n\n`;

        message += `*Order Items*\n`;
        cartItems.forEach(item => {
            const variantInfo = [item.color, item.size].filter(Boolean).join(" / ");
            const extra = variantInfo ? ` (${variantInfo})` : "";
            message += `- ${item.quantity}x ${item.name}${extra} ($${(item.price * item.quantity).toLocaleString()})\n`;
        });

        message += `\n*Order Summary*\n`;
        message += `Subtotal: $${subtotal.toLocaleString()}\n`;
        message += `Shipping: To be communicated\n`;
        message += `*Total (Estimate): $${total.toLocaleString()}*\n\n`;
        message += `*Total: $${total.toLocaleString()}*\n\n`;
        message += `Please confirm my order and share payment instructions.`;

        const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        window.open(waLink, "_blank");
        clearCart();
        router.push("/cart"); // Redirect back to empty cart or success page
    };

    return (
        <div className={styles.container}>
            <div className={styles.layout}>
                {/* Left: Form */}
                <div className={styles.formSection}>
                    <h2 className={styles.sectionTitle}>Shipping Address</h2>
                    <form className={styles.form} onSubmit={handleCheckout}>
                        <div className={styles.row}>
                            <div className={styles.group}>
                                <label>First Name *</label>
                                <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} className={styles.input} />
                            </div>
                            <div className={styles.group}>
                                <label>Last Name *</label>
                                <input type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} className={styles.input} />
                            </div>
                        </div>

                        <div className={styles.group}>
                            <label>Address *</label>
                            <input type="text" name="address" required value={formData.address} onChange={handleInputChange} className={styles.input} />
                        </div>

                        <div className={styles.group}>
                            <label>Apartment, suite, etc. (optional)</label>
                            <input type="text" name="apartment" value={formData.apartment} onChange={handleInputChange} className={styles.input} />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.group}>
                                <label>City</label>
                                <input type="text" name="city" value={formData.city} onChange={handleInputChange} className={styles.input} />
                            </div>
                            <div className={styles.group}>
                                <label>State</label>
                                <input type="text" name="state" value={formData.state} onChange={handleInputChange} className={styles.input} />
                            </div>
                            <div className={styles.group}>
                                <label>Zip Code</label>
                                <input type="text" name="zip" value={formData.zip} onChange={handleInputChange} className={styles.input} />
                            </div>
                        </div>

                        <div className={styles.group}>
                            <label>Phone *</label>
                            <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className={styles.input} />
                        </div>

                        <h2 className={styles.sectionTitle} style={{ marginTop: "60px" }}>Checkout Method</h2>
                        <div className={styles.paymentPlaceholder}>
                            <p>You will be redirected to WhatsApp to confirm your order directly with QM Beauty Salon.</p>
                        </div>

                        <Button type="submit" variant="primary" size="lg" fullWidth style={{ marginTop: "30px" }}>
                            Proceed to WhatsApp (Est: ${total.toLocaleString()})
                        </Button>
                    </form>
                </div>

                {/* Right: Order Summary */}
                <div className={styles.summarySection}>
                    <div className={styles.summaryCard}>
                        <h3>Your Order</h3>
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <div key={item.id} className={styles.summaryItem}>
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>${(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))
                        ) : (
                            <div className={styles.summaryItem}>
                                <span>No items in cart</span>
                            </div>
                        )}
                        <div className={styles.divider}></div>
                        <div className={styles.summaryTotal} style={{ marginBottom: "10px", fontWeight: "normal", fontSize: "1rem" }}>
                            <span>Shipping</span>
                            <span style={{ color: "var(--gray-medium)", fontSize: "0.9rem" }}>Will be communicated</span>
                        </div>
                        <div className={styles.summaryTotal}>
                            <span>Estimated Total</span>
                            <span>${total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
