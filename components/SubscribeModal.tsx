'use client';
import { useState } from 'react';
import styles from './SubscribeModal.module.css';

interface SubscribeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('http://localhost:5000/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (res.ok) {
                setStatus('success');
                setTimeout(onClose, 2000);
            } else {
                setStatus('error');
            }
        } catch (e) {
            setStatus('error');
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={`${styles.modal} card`} onClick={(e) => e.stopPropagation()}>
                <button className={styles.close} onClick={onClose}>&times;</button>
                <h2 className="serif gradient-text" style={{ fontSize: '32px' }}>Join 10k Curious Builders</h2>
                <p>One high-utility idea every Sunday. No fluff, just leverage.</p>

                {status === 'success' ? (
                    <div className={styles.success}>Thanks for subscribing!</div>
                ) : (
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="your@email.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button type="submit" className="btn-primary" disabled={status === 'loading'}>
                            {status === 'loading' ? 'Joining...' : 'Subscribe Now'}
                        </button>
                        {status === 'error' && <p className={styles.error}>Connection failed. Try again?</p>}
                    </form>
                )}
            </div>
        </div>
    );
}
