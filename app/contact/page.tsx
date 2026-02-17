'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './Contact.module.css';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const res = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                // Hide popup after 5 seconds
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <main className={styles.main}>
            <Navbar />

            {/* Success Popup */}
            {status === 'success' && (
                <div className={styles.popup}>
                    <div className={styles.popupContent}>
                        <div className={styles.popupIcon}>✓</div>
                        <h3>Message Sent</h3>
                        <p>Your message has been delivered. I’ll get back to you shortly at {formData.email}.</p>
                        <button onClick={() => setStatus('idle')} className="btn-primary">Dismiss</button>
                    </div>
                </div>
            )}

            <section className={styles.hero}>
                <div className="container">
                    <div className="animate-reveal">
                        <h1 className={styles.title}>The <span className="serif italic gradient-text">Interface.</span></h1>
                        <p className={styles.subtitle}>
                            Have a specific inquiry or looking to scale a project?
                            Reach out through the secure channel below.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div className={`${styles.contactCard} card animate-reveal`}>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.row}>
                                <div className={styles.group}>
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className={styles.group}>
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className={styles.group}>
                                <label>Subject</label>
                                <input
                                    type="text"
                                    placeholder="Project Inquiry"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.group}>
                                <label>Message</label>
                                <textarea
                                    rows={6}
                                    placeholder="How can I help you?"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="btn-primary"
                                style={{ width: '100%', justifyContent: 'center' }}
                                disabled={status === 'sending'}
                            >
                                {status === 'sending' ? 'Transmitting...' : 'Send Message'}
                            </button>
                            {status === 'error' && <p className={styles.error}>Something went wrong. Please try again.</p>}
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
