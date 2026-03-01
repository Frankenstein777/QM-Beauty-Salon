import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Poppins } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/ui/Chatbot";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "QM Beauty Salon | Premium Beauty Services",
  description: "Book your appointment for Nails, Lashes, Wigs, Hairstyling, and AutoGele.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable} ${poppins.variable}`}>
      <body>
        <ToastProvider>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Chatbot />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
