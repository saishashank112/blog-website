'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import SubscribeModal from './SubscribeModal';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''} ${isMenuOpen ? styles.menuOpen : ''}`}>
            <div className={`${styles.container} container`}>
                <Link href="/" className={styles.logo}>
                    <span className="serif italic">Blog</span>Pro
                </Link>

                <div className={`${styles.links} ${isMenuOpen ? styles.show : ''}`}>
                    <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link href="/blog" onClick={() => setIsMenuOpen(false)}>Blog</Link>
                    <Link href="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
                    <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                    <Link href="/admin" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--accent-start)', fontWeight: 'bold' }}>Admin</Link>
                    <div className={styles.navActions}>
                        <ThemeToggle />
                        <button
                            className="btn-primary"
                            style={{ padding: '8px 20px', fontSize: '14px' }}
                            onClick={() => {
                                setIsModalOpen(true);
                                setIsMenuOpen(false);
                            }}
                        >
                            Subscribe
                        </button>
                    </div>
                </div>

                <button
                    className={`${styles.mobileToggle} ${isMenuOpen ? styles.active : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            <SubscribeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </nav>
    );
}
