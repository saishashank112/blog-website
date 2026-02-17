import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './About.module.css';

export default function About() {
    return (
        <main className={styles.main}>
            <div className="mesh-bg"></div>
            <Navbar />

            <section className={styles.hero}>
                <div className="container">
                    <div className="animate-reveal">
                        <h1 className={styles.title}>The <span className="serif italic gradient-text">Narrative.</span></h1>
                        <p className={styles.subtitle}>
                            At the intersection of code, commerce, and human intelligence.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div className={styles.grid}>
                        <div className={styles.imageContainer}>
                            <div className={`${styles.image} animate-reveal`} style={{ backgroundImage: 'url("/profile-1.jpg")' }}></div>
                        </div>
                        <div className={`${styles.content} animate-reveal`} style={{ animationDelay: '0.2s' }}>
                            <h2>I’m a curious tech enthusiast who believes in <span className="serif italic">learning by building</span>.</h2>
                            <p>
                                Currently mastering Full-Stack, Python, and AI, I don’t just follow tutorials—I turn ideas into
                                meaningful projects that solve real-world problems.
                            </p>
                            <p className={styles.highlight}>
                                My mission is to build infrastructure that is bulletproof,
                                local-first, and privacy-preserving.
                            </p>
                            <div className={styles.stats}>
                                <div>
                                    <p>DSA</p>
                                    <h3>100+</h3>
                                </div>
                                <div>
                                    <p>Projects</p>
                                    <h3>15+</h3>
                                </div>
                                <div>
                                    <p>Curiosity</p>
                                    <h3>∞</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
