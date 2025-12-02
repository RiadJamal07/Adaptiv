import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroVideo from '../assets/hero-video.mp4';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const containerRef = useRef(null);
    const headlineRef = useRef(null);
    const subtitleRef = useRef(null);
    const ctaRef = useRef(null);
    const videoRef = useRef(null);
    const [videoLoaded, setVideoLoaded] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Split text animation for headline
            const headline = headlineRef.current;
            const words = headline.querySelectorAll('.word');

            gsap.set(words, {
                y: 120,
                opacity: 0,
                rotateX: -90,
            });

            gsap.to(words, {
                y: 0,
                opacity: 1,
                rotateX: 0,
                duration: 1.2,
                stagger: 0.08,
                ease: 'power4.out',
                delay: 0.5,
            });

            // Subtitle animation
            gsap.from(subtitleRef.current, {
                y: 40,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 1.2,
            });

            // CTA button animation
            gsap.from(ctaRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                delay: 1.5,
            });

            // Parallax on scroll
            gsap.to(videoRef.current, {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const headlineText = "Unlock Your Full Potential";
    const words = headlineText.split(' ');

    const scrollToContact = () => {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section ref={containerRef} style={styles.hero}>
            {/* Video Background */}
            <div ref={videoRef} style={styles.videoContainer}>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                        ...styles.video,
                        opacity: videoLoaded ? 1 : 0,
                    }}
                    onLoadedData={() => setVideoLoaded(true)}
                >
                    <source src={heroVideo} type="video/mp4" />
                </video>
                <div style={styles.videoOverlay} />
            </div>

            {/* Content */}
            <div className="container" style={styles.content}>
                <h1 ref={headlineRef} style={styles.headline}>
                    {words.map((word, i) => (
                        <span key={i} style={styles.wordWrapper}>
                            <span
                                className="word"
                                style={{
                                    ...styles.word,
                                    color: i >= 2 ? 'var(--primary)' : 'var(--white)',
                                }}
                            >
                                {word}
                            </span>
                        </span>
                    ))}
                </h1>

                <p ref={subtitleRef} style={styles.subtitle}>
                    Science-based training tailored to your lifestyle.<br />
                    Duathlon & Performance Coaching by Omar Zaatiti.
                </p>

                <button
                    ref={ctaRef}
                    style={styles.cta}
                    className="magnetic-btn"
                    onClick={scrollToContact}
                >
                    <span style={styles.ctaText}>Start Training</span>
                    <span style={styles.ctaArrow}>→</span>
                </button>
            </div>

            {/* Scroll indicator */}
            <div style={styles.scrollIndicator}>
                <div style={styles.scrollLine} />
                <span style={styles.scrollText}>Scroll</span>
            </div>
        </section>
    );
};

const styles = {
    hero: {
        height: '100vh',
        minHeight: '600px',
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
    },
    videoContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
    },
    video: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'opacity 0.5s ease',
    },
    videoOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%)',
    },
    content: {
        position: 'relative',
        zIndex: 2,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 clamp(1.5rem, 4vw, 3rem)',
    },
    headline: {
        fontSize: 'clamp(2.5rem, 10vw, 7rem)',
        fontWeight: 800,
        lineHeight: 1.1,
        marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
        textTransform: 'uppercase',
        letterSpacing: '-0.02em',
        perspective: '1000px',
    },
    wordWrapper: {
        display: 'inline-block',
        overflow: 'hidden',
        marginRight: '0.3em',
        verticalAlign: 'top',
    },
    word: {
        display: 'inline-block',
        transformOrigin: 'center bottom',
    },
    subtitle: {
        fontSize: 'clamp(0.95rem, 2vw, 1.3rem)',
        color: 'rgba(255,255,255,0.8)',
        maxWidth: '600px',
        marginBottom: 'clamp(2rem, 4vw, 2.5rem)',
        lineHeight: 1.6,
    },
    cta: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: 'clamp(1rem, 2vw, 1.2rem) clamp(1.5rem, 3vw, 2.5rem)',
        fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '2px',
        backgroundColor: 'var(--primary)',
        color: 'var(--white)',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
        borderRadius: '4px',
    },
    ctaText: {
        position: 'relative',
        zIndex: 1,
    },
    ctaArrow: {
        position: 'relative',
        zIndex: 1,
        transition: 'transform 0.3s ease',
    },
    scrollIndicator: {
        position: 'absolute',
        bottom: 'clamp(1.5rem, 4vh, 3rem)',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        zIndex: 2,
    },
    scrollLine: {
        width: '1px',
        height: 'clamp(40px, 8vh, 60px)',
        background: 'linear-gradient(to bottom, var(--primary), transparent)',
        animation: 'scrollPulse 2s ease-in-out infinite',
    },
    scrollText: {
        fontSize: '0.7rem',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        color: 'rgba(255,255,255,0.5)',
    },
};

export default Hero;
