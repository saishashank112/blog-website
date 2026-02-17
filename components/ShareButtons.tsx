'use client';
import { useEffect, useState } from 'react';
import styles from '../app/blog/[id]/Post.module.css';

interface ShareButtonsProps {
    title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
    const [url, setUrl] = useState('');

    useEffect(() => {
        setUrl(window.location.href);
    }, []);

    const shareX = () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
    };

    const shareLinkedIn = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    };

    const shareFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    };

    return (
        <div className={styles.shareBtns}>
            <button className={styles.shareBtn} onClick={shareX} title="Share on X">X</button>
            <button className={styles.shareBtn} onClick={shareLinkedIn} title="Share on LinkedIn">In</button>
            <button className={styles.shareBtn} onClick={shareFacebook} title="Share on Facebook">Fb</button>
        </div>
    );
}
