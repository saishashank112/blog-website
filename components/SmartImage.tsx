'use client';
import { useState } from 'react';

interface SmartImageProps {
    src: string;
    alt: string;
    className?: string;
    fallback?: string;
}

export default function SmartImage({
    src,
    alt,
    className,
    fallback = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200'
}: SmartImageProps) {
    const [imgSrc, setImgSrc] = useState(src || fallback);

    return (
        <img
            src={imgSrc}
            alt={alt}
            className={className}
            onError={() => setImgSrc(fallback)}
        />
    );
}
