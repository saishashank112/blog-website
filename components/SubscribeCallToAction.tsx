'use client';
import { useState } from 'react';
import SubscribeModal from './SubscribeModal';

export default function SubscribeCallToAction() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <section className="section-padding">
                <div className="container">
                    <div className="card" style={{
                        padding: '120px 60px',
                        maxWidth: '1000px',
                        margin: '0 auto',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Background light effect */}
                        <div style={{
                            position: 'absolute',
                            top: '-50%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '400px',
                            height: '400px',
                            background: 'radial-gradient(circle, var(--accent-glow), transparent 70%)',
                            zIndex: 0,
                            pointerEvents: 'none'
                        }}></div>

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h2 style={{ fontSize: 'clamp(40px, 6vw, 64px)', marginBottom: '24px', letterSpacing: '-0.05em' }}>
                                Join 10k <span className="serif italic gradient-text">Curious Builders.</span>
                            </h2>
                            <p style={{ fontSize: '22px', color: 'var(--text-muted)', marginBottom: '48px', maxWidth: '640px', margin: '0 auto 48px' }}>
                                Receive one high-utility breakdown on AI architecture & engineering
                                every Sunday. <span className="serif italic">No fluff, just leverage.</span>
                            </p>
                            <button
                                className="btn-primary"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Get the Signal
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <SubscribeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
