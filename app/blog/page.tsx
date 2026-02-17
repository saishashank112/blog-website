import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { getAllPosts } from '@/lib/posts';
import styles from './blog.module.css';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BlogListing() {
    const posts = await getAllPosts();
    return (
        <main className={styles.main}>
            <div className="mesh-bg"></div>
            <Navbar />

            <section className={styles.header}>
                <div className="container">
                    <div className="animate-reveal">
                        <h1 className={styles.title}>The <span className="serif italic gradient-text">Archive.</span></h1>
                        <p className={styles.subtitle}>
                            Deep dives into AI architecture, high-performance engineering, and
                            the philosophical frameworks defining the next generation of building.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    {posts.length > 0 && (
                        <div className={styles.featuredSection}>
                            <span className={styles.featuredLabel}>Featured Now</span>
                            <BlogCard {...posts[0]} />
                        </div>
                    )}

                    <div className={styles.blogGrid}>
                        {posts.slice(1).map((post) => (
                            <BlogCard key={post.id} {...post} />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
