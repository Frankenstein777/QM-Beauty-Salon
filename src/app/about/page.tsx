import styles from "./page.module.css";
import Button from "@/components/ui/Button";

export default function AboutPage() {
    return (
        <div className={styles.container}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>The Art of <span className={styles.gold}>QM Beauty Salon</span></h1>
                    <p className={styles.subtitle}>Where tradition meets modern luxury.</p>
                </div>
            </section>

            {/* Story Section */}
            <section className={styles.storySection}>
                <div className={styles.storyContent}>
                    <h2 className={styles.sectionTitle}>Our Story</h2>
                    <div className={styles.divider}></div>
                    <p className={styles.text}>
                        QM Beauty Salon was born from a passion for redefining African beauty standards.
                        What started as a small passion project has grown into a premier destination
                        for women who seek elegance without compromise.
                    </p>
                    <p className={styles.text}>
                        We specialize in handcrafted AutoGeles that honor our heritage while embracing
                        contemporary convenience. Our wigs are sourced from the finest donors, ensuring
                        that every strand flows with grace.
                    </p>
                </div>
                <div className={styles.storyImage} style={{ backgroundImage: "url('/makeup 2.jpg')" }}>
                </div>
            </section>

            {/* Philosophy */}
            <section className={styles.philosophySection}>
                <div className={styles.philosophyImage} style={{ backgroundImage: "url('/makeup 3.jpg')" }}>
                </div>
                <div className={styles.philosophyContent}>
                    <h2 className={styles.sectionTitle}>Our Philosophy</h2>
                    <div className={styles.divider}></div>
                    <p className={styles.text}>
                        "Beauty is not just about how you look, but how you feel."
                    </p>
                    <p className={styles.text}>
                        Every service we provide—from bridal makeup to nail artistry—is designed
                        to perform a transformation that radiates from within. We don't just sell products;
                        we curate confidence.
                    </p>
                    <Button variant="primary" href="/services">Explore Our Services</Button>
                </div>
            </section>

            {/* Team/Brand Wrapper */}
            <section className={styles.teamSection}>
                <h2 className={styles.sectionTitle}>The Face Behind the Brand</h2>
                <div className={styles.teamGrid}>
                    <div className={styles.teamMember}>
                        <div className={styles.memberImage} style={{ backgroundImage: "url('/CEO picture.jpg')" }}></div>
                        <h3 className={styles.memberName}>Queen Mary</h3>
                        <p className={styles.memberRole}>Founder & Lead Stylist</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
