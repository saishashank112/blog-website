import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { getAllPosts } from '@/lib/posts';
import styles from './page.module.css';
import SubscribeCallToAction from '@/components/SubscribeCallToAction';

export default async function Home() {
  const allPosts = await getAllPosts();
  const featuredPosts = allPosts.slice(0, 3);

  return (
    <main className={styles.main}>
      <div className="mesh-bg"></div>
      <Navbar />

      {/* 1. HOOK: Cinematic Hero */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={`${styles.eyebrow} animate-reveal`}>
              <div className={styles.statusDot}></div>
              <span className={styles.currentlyBuilding}>Design. Intelligence. Performance.</span>
            </div>

            <h1 className={`${styles.title} animate-reveal`} style={{ transitionDelay: '0.1s' }}>
              Building the Future <br />
              <span className="serif italic gradient-text">of Signal.</span>
            </h1>

            <p className={`${styles.subtitle} animate-reveal`} style={{ transitionDelay: '0.2s' }}>
              Deep dives into AI architecture, high-performance engineering,
              and the frameworks defining the next generation of the web.
            </p>

            <div className={`${styles.ctaGroup} animate-reveal`} style={{ transitionDelay: '0.3s' }}>
              <a href="/blog" className="btn-primary">
                Explore the Archive
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
              </a>
              <a href="/about" className="btn-secondary">The Philosophy</a>
            </div>

            {featuredPosts[0] && (
              <div className={`${styles.featuredStrip} animate-reveal`} style={{ transitionDelay: '0.5s' }}>
                <span className={styles.featuredLabel}>Featured Now</span>
                <div className={styles.featuredContent}>
                  <a href={`/blog/${featuredPosts[0].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3>{featuredPosts[0].title}</h3>
                    <p style={{ fontSize: '14px' }}>{featuredPosts[0].excerpt.substring(0, 100)}...</p>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. CREDIBILITY: Authority Section */}
      <section className={`${styles.storySection} section-padding`}>
        <div className="container">
          <div className={styles.authoritySection}>
            <div className={styles.narrativeGrid}>
              <div>
                <h2 className="serif" style={{ fontSize: '48px', color: 'var(--accent-start)', marginBottom: '24px' }}>
                  The Narrative.
                </h2>
                <p style={{ fontSize: '20px', lineHeight: '1.6', opacity: 0.9, marginBottom: '40px' }}>
                  I’m a curious tech enthusiast who believes in <span className="serif italic">learning by building</span>.
                  Currently mastering Full-Stack, Python, and AI, I don’t just follow tutorials—I turn ideas into
                  meaningful projects that solve real-world problems.
                </p>
                <div className={styles.statsGrid}>
                  <div className={styles.statItem}>
                    <h3>100+</h3>
                    <p>DSA Solved</p>
                  </div>
                  <div className={styles.statItem}>
                    <h3>15+</h3>
                    <p>Live Projects</p>
                  </div>
                  <div className={styles.statItem}>
                    <h3>∞</h3>
                    <p>Curiosity</p>
                  </div>
                </div>
              </div>

              <div className={styles.timeline}>
                <div className={styles.timelineItem}>
                  <span className={styles.year}>2023</span>
                  <p className={styles.event}>Committed to learning by building real-world projects.</p>
                </div>
                <div className={styles.timelineItem}>
                  <span className={styles.year}>2024</span>
                  <p className={styles.event}>Mastered Python and started building AI-powered tools.</p>
                </div>
                <div className={styles.timelineItem}>
                  <span className={styles.year}>2025</span>
                  <p className={styles.event}>Full-stack mastering and solving high-level DSA challenges.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT I THINK: The Lab */}
      <section className="section-padding">
        <div className="container">
          <div style={{ marginBottom: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(40px, 6vw, 64px)', marginBottom: '16px' }}>The <span className="serif italic gradient-text">Lab Archive.</span></h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '20px', maxWidth: '600px' }}>
                Weekly architectural breakdowns, AI implementation notes, and high-leverage frameworks.
              </p>
            </div>
            <a href="/blog" className="pixel-hover" style={{ fontWeight: '800', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              View the Full Archive
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
            </a>
          </div>

          <div className={styles.obsessionGrid}>
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. OBSESSIONS: Narratives Section */}
      <section className="section-padding" style={{ background: 'var(--primary)', color: 'white', borderRadius: '48px', margin: '0 24px' }}>
        <div className="container">
          <h2 className="serif italic animate-reveal" style={{ fontSize: 'clamp(32px, 5vw, 56px)', textAlign: 'center', marginBottom: '80px', color: 'white' }}>
            What I&apos;m <span className="italic">Obsessed</span> With Right Now
          </h2>
          <div className={styles.obsessionGrid}>
            <div className={`${styles.obsessionCard} animate-reveal`} style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)' }}>
              <h4 style={{ color: 'white' }}>Autonomous Agents</h4>
              <p style={{ opacity: 0.7, color: 'white' }}>How LLMs are transitioning from passive chat interfaces to active decision makers.</p>
            </div>
            <div className={`${styles.obsessionCard} animate-reveal`} style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)', transitionDelay: '0.1s' }}>
              <h4 style={{ color: 'white' }}>Sovereign Systems</h4>
              <p style={{ opacity: 0.7, color: 'white' }}>Building infrastructure that is bulletproof, local-first, and privacy-preserving.</p>
            </div>
            <div className={`${styles.obsessionCard} animate-reveal`} style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)', transitionDelay: '0.2s' }}>
              <h4 style={{ color: 'white' }}>The Future of Work</h4>
              <p style={{ opacity: 0.7, color: 'white' }}>Redefining the "Founder-Engineer" role in an age where AI writes the boilerplate.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION: Branded Subscribe */}
      <SubscribeCallToAction />

      <Footer />
    </main>
  );
}
