import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import { getAllPosts, getPostData } from '@/lib/posts';
import styles from './Post.module.css';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';
import SmartImage from '@/components/SmartImage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post) => ({
        id: post.id,
    }));
}

export default async function BlogPost({ params }: { params: { id: string } }) {
    const { id } = await params;
    const post = await getPostData(id).catch(() => null);

    if (!post) {
        notFound();
    }

    return (
        <main className={styles.main}>
            <div className="mesh-bg"></div>
            <ReadingProgressBar />
            <Navbar />

            <article>
                <header className={styles.header}>
                    <div className="container">
                        <div className={styles.backContainer}>
                            <Link href="/blog" className={styles.backBtn}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                                Back to Archive
                            </Link>
                        </div>

                        <div className={styles.meta}>
                            <span className={styles.category}>{post.category}</span>
                            <span className={styles.date}>{post.date}</span>
                        </div>
                        <h1 className={styles.title}>{post.title}</h1>

                        <div className={styles.author}>
                            <div className={styles.authorImg} style={{ backgroundImage: 'url("/profile-1.jpg")', backgroundSize: 'cover' }}></div>
                            <div className={styles.authorInfo}>
                                <h4>Sai Shashank</h4>
                                <p>Full-Stack Developer & AI Enthusiast</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className={styles.heroImageWrapper}>
                    <div className="container">
                        <SmartImage
                            src={post.image}
                            alt={post.title}
                            className={styles.heroImage}
                        />
                    </div>
                </div>

                <div className="container">
                    <div className={styles.articleLayout}>
                        <div className={styles.content}>
                            <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
                        </div>

                        <aside className={styles.aside}>
                            <div className={`${styles.share} card`}>
                                <h4>Share the Signal</h4>
                                <ShareButtons title={post.title} />
                            </div>

                            <div className="card" style={{ marginTop: '24px', padding: '32px' }}>
                                <h4>The Digest</h4>
                                <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: '12px 0 20px' }}>
                                    Get my latest thoughts on AI and Engineering every Sunday.
                                </p>
                                <button className="btn-primary" style={{ width: '100%', fontSize: '14px' }}>
                                    Subscribe
                                </button>
                            </div>
                        </aside>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
}
