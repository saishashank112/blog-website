'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollReveal() {
    const pathname = usePathname();

    useEffect(() => {
        // Fast sync function
        const sync = () => {
            const elements = document.querySelectorAll('.animate-reveal:not(.reveal-active)');
            if (elements.length === 0) return;

            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                const buffer = 100; // Trigger slightly before it enters or if already in

                if (rect.top < (window.innerHeight + buffer) && rect.bottom > -buffer) {
                    el.classList.add('reveal-active');
                }
            });
        };

        // Aggressively check for first 2 seconds to catch hydration/state changes
        const interval = setInterval(sync, 100);

        // Fail-safe: Reveal everything after a delay if script fails
        const failSafe = setTimeout(() => {
            document.querySelectorAll('.animate-reveal').forEach(el => {
                el.classList.add('reveal-active');
            });
        }, 3000);

        // Standard observers
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                }
            });
        }, { threshold: 0.01 });

        document.querySelectorAll('.animate-reveal').forEach(el => observer.observe(el));

        // Listen for user interaction
        window.addEventListener('scroll', sync, { passive: true });
        window.addEventListener('resize', sync, { passive: true });

        // Mutation observer for dynamic content (like switching from Login to Dashboard)
        const mObs = new MutationObserver(() => {
            sync();
            document.querySelectorAll('.animate-reveal:not(.reveal-active)').forEach(el => observer.observe(el));
        });

        mObs.observe(document.body, { childList: true, subtree: true });

        return () => {
            clearInterval(interval);
            clearTimeout(failSafe);
            observer.disconnect();
            mObs.disconnect();
            window.removeEventListener('scroll', sync);
            window.removeEventListener('resize', sync);
        };
    }, [pathname]);

    return null;
}
