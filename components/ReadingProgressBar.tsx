'use client';
import { useEffect, useState } from 'react';

export default function ReadingProgressBar() {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollProgress = (totalScroll / windowHeight) * 100;
            setWidth(scrollProgress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
            width: `${width}%`,
            zIndex: 2000,
            transition: 'width 0.1s ease-out'
        }} />
    );
}
