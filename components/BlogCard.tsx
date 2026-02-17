import Link from 'next/link';
import styles from './BlogCard.module.css';
import SmartImage from './SmartImage';

interface BlogCardProps {
    id: string;
    slug?: string;
    title: string;
    excerpt: string;
    date: string;
    image: string;
    category: string;
}

export default function BlogCard({ id, slug, title, excerpt, date, image, category }: BlogCardProps) {
    const routeId = slug || id;
    return (
        <Link href={`/blog/${routeId}`} className={`${styles.card} animate-reveal`}>
            <div className={styles.imageWrapper}>
                <SmartImage src={image} alt={title} className={styles.image} />
                <span className={styles.category}>{category}</span>
            </div>
            <div className={styles.content}>
                <span className={styles.date}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    {date}
                </span>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.excerpt}>{excerpt}</p>
                <div className={styles.readMore}>
                    Read Article
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                </div>
            </div>
        </Link>
    );
}
