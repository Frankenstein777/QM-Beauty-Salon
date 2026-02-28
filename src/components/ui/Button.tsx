import React from "react";
import styles from "./Button.module.css";
import Link from "next/link";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "text";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  href?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  href,
  fullWidth = false,
  icon,
  className = "",
  disabled,
  ...props
}) => {
  const buttonClass = `
    ${styles.btn} 
    ${styles[variant]} 
    ${styles[size]} 
    ${fullWidth ? styles.fullWidth : ""} 
    ${className}
  `;

  const content = (
    <>
      {isLoading && <Loader2 className={styles.spinner} size={18} />}
      {!isLoading && icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={buttonClass}>
        {content}
      </Link>
    );
  }

  return (
    <button className={buttonClass} disabled={disabled || isLoading} {...props}>
      {content}
    </button>
  );
};

export default Button;
