"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Button from "@/components/ui/Button";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
    const { cartItems, updateQuantity, removeFromCart, subtotal } = useCart();

    const shipping = 2500;
    const total = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div className={styles.emptyContainer}>
                <h2>Your Bag is Empty</h2>
                <p>Looks like you haven't added any luxury items yet.</p>
                <Button variant="primary" href="/shop">Start Shopping</Button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Your Bag</h1>

            <div className={styles.layout}>
                {/* Cart Items */}
                <div className={styles.itemsColumn}>
                    <div className={styles.tableHeader}>
                        <span>Product</span>
                        <span>Quantity</span>
                        <span>Total</span>
                    </div>

                    <div className={styles.itemsList}>
                        {cartItems.map((item) => (
                            <div key={item.id} className={styles.itemRow}>
                                <div className={styles.productInfo}>
                                    <div className={styles.thumbnail} style={{ backgroundImage: `url(${item.image})` }}></div>
                                    <div className={styles.details}>
                                        <h3>{item.name}</h3>
                                        <p className={styles.variant}>{item.color} / {item.size}</p>
                                        <p className={styles.unitPrice}>₦{item.price.toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className={styles.quantityControl}>
                                    <button onClick={() => updateQuantity(item.id, -1)}><Minus size={16} /></button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)}><Plus size={16} /></button>
                                </div>

                                <div className={styles.itemTotal}>
                                    <p>₦{(item.price * item.quantity).toLocaleString()}</p>
                                    <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Link href="/shop" className={styles.continueLink}>
                        <ArrowLeft size={16} /> Continue Shopping
                    </Link>
                </div>

                {/* Summary */}
                <div className={styles.summaryColumn}>
                    <div className={styles.summaryCard}>
                        <h2 className={styles.summaryTitle}>Order Summary</h2>
                        <div className={styles.summaryRow}>
                            <span>Subtotal</span>
                            <span>₦{subtotal.toLocaleString()}</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span>Shipping (Est.)</span>
                            <span>₦{shipping.toLocaleString()}</span>
                        </div>
                        <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                            <span>Total</span>
                            <span>₦{total.toLocaleString()}</span>
                        </div>
                        <Button variant="primary" size="lg" fullWidth href="/checkout">
                            Proceed to Checkout
                        </Button>
                        <div className={styles.secureBadge}>
                            🔒 Secure Checkout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
