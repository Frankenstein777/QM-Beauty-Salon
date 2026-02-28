"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Mail, Lock, User } from "lucide-react";

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{isLogin ? "Welcome Back" : "Join QM Beauty Salon"}</h1>
                    <p className={styles.subtitle}>
                        {isLogin
                            ? "Sign in to access your orders and wishlist."
                            : "Create an account to enjoy exclusive benefits."}
                    </p>
                </div>

                <form className={styles.form}>
                    {!isLogin && (
                        <div className={styles.group}>
                            <label>Full Name</label>
                            <div className={styles.inputWrapper}>
                                <User size={20} />
                                <input type="text" placeholder="John Doe" className={styles.input} />
                            </div>
                        </div>
                    )}

                    <div className={styles.group}>
                        <label>Email Address</label>
                        <div className={styles.inputWrapper}>
                            <Mail size={20} />
                            <input type="email" placeholder="you@example.com" className={styles.input} />
                        </div>
                    </div>

                    <div className={styles.group}>
                        <label>Password</label>
                        <div className={styles.inputWrapper}>
                            <Lock size={20} />
                            <input type="password" placeholder="••••••••" className={styles.input} />
                        </div>
                    </div>

                    {!isLogin && (
                        <div className={styles.group}>
                            <label>Confirm Password</label>
                            <div className={styles.inputWrapper}>
                                <Lock size={20} />
                                <input type="password" placeholder="••••••••" className={styles.input} />
                            </div>
                        </div>
                    )}

                    {isLogin && (
                        <div className={styles.forgotPassword}>
                            <a href="#">Forgot Password?</a>
                        </div>
                    )}

                    <Button variant="primary" size="lg" fullWidth style={{ marginTop: "20px" }}>
                        {isLogin ? "Sign In" : "Create Account"}
                    </Button>

                    <div className={styles.divider}>
                        <span>OR</span>
                    </div>

                    <Button variant="outline" size="lg" fullWidth>
                        Continue with Google
                    </Button>
                </form>

                <div className={styles.footer}>
                    <p>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button onClick={() => setIsLogin(!isLogin)} className={styles.switchBtn}>
                            {isLogin ? "Sign Up" : "Sign In"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
