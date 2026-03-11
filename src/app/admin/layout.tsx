import Link from "next/link";
import styles from "./layout.module.css";
import { LayoutDashboard, Package, Plus, Settings } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.container}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h2>QM Admin<span className={styles.accent}>.</span></h2>
                </div>

                <nav className={styles.nav}>
                    <Link href="/admin" className={styles.navItem}>
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>
                    <Link href="/admin/products" className={styles.navItem}>
                        <Package size={20} />
                        <span>Products</span>
                    </Link>
                    <Link href="/admin/products/new" className={styles.navItem}>
                        <Plus size={20} />
                        <span>Add Product</span>
                    </Link>
                    <Link href="/admin/settings" className={styles.navItem}>
                        <Settings size={20} />
                        <span>Settings</span>
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
}
