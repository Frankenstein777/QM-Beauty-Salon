import styles from "./page.module.css";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/ui/ProductCard";
import { ArrowRight } from "lucide-react";

const featuredProducts = [
  {
    id: "1",
    name: "Royal AutoGele - Gold Series",
    price: "₦15,000",
    category: "Auto gele",
    slug: "royal-autogele-gold",
    image: "/Autogele 1.png" // Realistic asset
  },
  {
    id: "2",
    name: "Luxury Bone Straight Wig",
    price: "₦150,000",
    category: "Wigs and hairs",
    slug: "luxury-bone-straight",
    image: "/wig 1.jpeg"
  },
  {
    id: "3",
    name: "Bridal Glam Package",
    price: "₦80,000",
    category: "Nails and lashes",
    slug: "bridal-glam-package",
    image: "/lashes 1.jpg"
  },
  {
    id: "4",
    name: "Velvet Matte Lip Kit",
    price: "₦12,000",
    category: "Make-up",
    slug: "velvet-matte-lip",
    image: "/makeup 1.jpg"
  }
];

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero} style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/hero image.jpg')" }}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Elegance <span className={styles.italic}>Redefined</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Luxury Hair, AutoGele & Professional Beauty Services for the modern queen.
          </p>
          <div className={styles.heroButtons}>
            <Button variant="primary" size="lg" href="/shop">
              Shop Collections
            </Button>
            <Button variant="outline" size="lg" href="/services">
              Book Appointment
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Collections</h2>
          <Button variant="text" href="/shop" icon={<ArrowRight size={16} />}>View All</Button>
        </div>
        <div className={styles.grid}>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {/* About Teaser */}
      <section className={styles.aboutTeaser}>
        <div className={styles.teaserContent}>
          <h2 className={styles.sectionTitle}>The QM Beauty Salon Experience</h2>
          <p>
            We believe beauty is an art form. From our handcrafted AutoGeles to our
            precision wig installations, every detail is curated to enhance your natural radiance.
          </p>
          <Button variant="text" href="/about">Read Our Story</Button>
        </div>
        <div className={styles.teaserImage} style={{ backgroundImage: "url('/Qm beauty saalon experience.png')" }}></div>
      </section>
    </div>
  );
}
