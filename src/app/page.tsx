import styles from "./page.module.css";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/ui/ProductCard";
import { ArrowRight } from "lucide-react";

import { products } from "@/lib/data";

function getDailyFeaturedProducts() {
  // Use today's date string as a stable daily seed
  const today = new Date().toDateString();
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = today.charCodeAt(i) + ((hash << 5) - hash);
  }

  const shuffled = [...products].sort((a, b) => {
    const seedA = (hash * parseInt(a.id || "1")) % 100;
    const seedB = (hash * parseInt(b.id || "1")) % 100;
    return seedA - seedB;
  });

  return shuffled.slice(0, 4);
}

export default function Home() {
  const featuredProducts = getDailyFeaturedProducts();

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
            <Button variant="primary" size="lg" href="/services">
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

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>What Our Queens Say</h2>
        </div>
        <div className={styles.testimonialGrid}>
          {[
            { id: 1, name: "Jessica T.", text: "The most beautiful auto-gele I've ever worn. I felt like royalty on my wedding day!" },
            { id: 2, name: "Sarah B.", text: "QM Beauty Salon's custom wig service is unmatched. The luxury bone straight wig is pure perfection." },
            { id: 3, name: "Aisha M.", text: "Outstanding makeup artistry. They perfectly enhanced my natural features for my photoshoot." }
          ].map(review => (
            <div key={review.id} className={styles.testimonialCard}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.reviewText}>"{review.text}"</p>
              <h4 className={styles.reviewerName}>- {review.name}</h4>
            </div>
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
