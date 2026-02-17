import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>
                    <div className={styles.info}>
                        <div className={styles.logo}>
                            <span className="serif italic">Blog</span>Pro
                        </div>
                        <p className={styles.desc}>
                            High-utility insights at the intersection of AI, Engineering, and Design.
                            Curated for the next generation of builders.
                        </p>
                    </div>
                    <div className={styles.links}>
                        <h4>Knowledge</h4>
                        <ul>
                            <li><a href="/blog">The Archive</a></li>
                            <li><a href="/about">The Philosophy</a></li>
                            <li><a href="/admin">Control Center</a></li>
                        </ul>
                    </div>
                    <div className={styles.links}>
                        <h4>The Social</h4>
                        <ul>
                            <li><a href="https://www.linkedin.com/in/allampallysaishashank/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                            <li><a href="https://github.com/saishashank112" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                            <li><a href="#">X / Twitter</a></li>
                        </ul>
                    </div>
                    <div className={styles.subscribe}>
                        <h4>The Signal</h4>
                        <p>Join 10k+ readers receiving weekly architectural breakdowns and AI notes.</p>
                        <button className="btn-primary" style={{ padding: '12px 24px', fontSize: '12px' }}>
                            Join the Digest
                        </button>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <p>&copy; {new Date().getFullYear()} BlogPro. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
