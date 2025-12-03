import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';
import img5 from '../assets/5.jpg';

gsap.registerPlugin(ScrollTrigger);

const HyperplexedCarousel = () => {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const imagesRef = useRef([]);
    const headingRef = useRef(null);

    const images = [img1, img2, img3, img4, img5];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const track = trackRef.current;
            const imageElements = imagesRef.current;

            // Heading animation
            gsap.from(headingRef.current, {
                opacity: 0,
                y: 60,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                },
            });

            // Calculate total scroll distance (track width minus viewport)
            const getScrollDistance = () => {
                return track.scrollWidth - window.innerWidth;
            };

            // Horizontal scroll animation (main container animation)
            const horizontalScroll = gsap.to(track, {
                x: () => -getScrollDistance(),
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: () => `+=${getScrollDistance()}`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                },
            });

            // Background gradient parallax
            const bgGradient = containerRef.current.querySelector('[data-bg-gradient]');
            if (bgGradient) {
                gsap.to(bgGradient, {
                    x: () => -getScrollDistance() * 0.3,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top top',
                        end: () => `+=${getScrollDistance()}`,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                });
            }

            // Enhanced parallax + clip-path reveals on images
            imageElements.forEach((img, index) => {
                if (!img) return;

                const wrapper = img.parentElement;

                // Alternating parallax speeds for depth
                const parallaxMultiplier = index % 2 === 0 ? 0.8 : 1.2;

                // Parallax effect on object position
                gsap.to(img, {
                    objectPosition: `${(100 - (100 * parallaxMultiplier))}% center`,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top top',
                        end: () => `+=${getScrollDistance()}`,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                });

                // Clip-path reveal animation synced with horizontal scroll
                gsap.fromTo(
                    wrapper,
                    {
                        clipPath: 'inset(0 100% 0 0)',
                    },
                    {
                        clipPath: 'inset(0 0% 0 0)',
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: wrapper,
                            containerAnimation: horizontalScroll,
                            start: 'left right',
                            end: 'left center',
                            scrub: 1,
                            invalidateOnRefresh: true,
                        },
                    }
                );

                // Scale effect on image during reveal
                gsap.fromTo(
                    img,
                    {
                        scale: 1.2,
                    },
                    {
                        scale: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: wrapper,
                            containerAnimation: horizontalScroll,
                            start: 'left right',
                            end: 'left center',
                            scrub: 1,
                            invalidateOnRefresh: true,
                        },
                    }
                );
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} style={styles.container}>
            {/* Background gradient */}
            <div data-bg-gradient style={styles.bgGradient} />

            {/* Section heading */}
            <div ref={headingRef} style={styles.headingWrapper}>
                <span style={styles.label}>Gallery</span>
                <h2 style={styles.heading}>
                    Moments of <span style={styles.headingAccent}>Excellence</span>
                </h2>
            </div>

            {/* Carousel track */}
            <div ref={trackRef} style={styles.track}>
                {images.map((src, index) => (
                    <div key={index} style={styles.imageWrapper}>
                        <img
                            ref={(el) => (imagesRef.current[index] = el)}
                            src={src}
                            alt={`Gallery ${index + 1}`}
                            draggable="false"
                            style={styles.image}
                        />
                        <div style={styles.imageOverlay} />
                        <span style={styles.imageNumber}>0{index + 1}</span>
                    </div>
                ))}
            </div>

            {/* Scroll instruction */}
            <div style={styles.instruction}>
                <div style={styles.scrollLine} />
                <span style={styles.scrollText}>Scroll to explore</span>
            </div>

            {/* Progress indicator */}
            <div style={styles.progressWrapper}>
                <div style={styles.progressBar}>
                    <div style={styles.progressFill} className="progress-fill" />
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        height: '100vh',
        width: '100%',
        backgroundColor: '#0a0a0a',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
    },
    bgGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(ellipse at 20% 50%, rgba(225, 82, 47, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none',
    },
    headingWrapper: {
        position: 'absolute',
        top: 'clamp(80px, 15vh, 120px)',
        left: 'clamp(1rem, 4vw, 3rem)',
        zIndex: 10,
    },
    label: {
        display: 'block',
        fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '3px',
        color: 'var(--primary)',
        marginBottom: '0.75rem',
    },
    heading: {
        fontSize: 'clamp(1.5rem, 5vw, 3.5rem)',
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '-0.02em',
        lineHeight: 1,
        margin: 0,
    },
    headingAccent: {
        color: 'var(--primary)',
    },
    track: {
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(1rem, 3vw, 2rem)',
        paddingLeft: 'clamp(1rem, 4vw, 3rem)',
        paddingRight: '50vw',
        height: '60vh',
        minHeight: '300px',
    },
    imageWrapper: {
        position: 'relative',
        width: 'clamp(250px, 40vmin, 450px)',
        height: '100%',
        flexShrink: 0,
        borderRadius: '16px',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: '100% center',
        userSelect: 'none',
        pointerEvents: 'none',
    },
    imageOverlay: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)',
        pointerEvents: 'none',
    },
    imageNumber: {
        position: 'absolute',
        bottom: 'clamp(1rem, 3vw, 1.5rem)',
        left: 'clamp(1rem, 3vw, 1.5rem)',
        fontSize: 'clamp(2rem, 6vmin, 5rem)',
        fontWeight: 900,
        color: 'rgba(255,255,255,0.1)',
        lineHeight: 1,
        letterSpacing: '-0.05em',
    },
    instruction: {
        position: 'absolute',
        bottom: 'clamp(1.5rem, 5vh, 4rem)',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        zIndex: 10,
    },
    scrollLine: {
        width: '1px',
        height: '40px',
        background: 'linear-gradient(to bottom, var(--primary), transparent)',
        animation: 'scrollPulse 2s ease-in-out infinite',
    },
    scrollText: {
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        color: 'rgba(255,255,255,0.4)',
    },
    progressWrapper: {
        position: 'absolute',
        bottom: 'clamp(1.5rem, 5vh, 4rem)',
        right: 'clamp(1rem, 4vw, 3rem)',
        width: '100px',
        zIndex: 10,
    },
    progressBar: {
        width: '100%',
        height: '2px',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: '1px',
        overflow: 'hidden',
    },
    progressFill: {
        width: '0%',
        height: '100%',
        backgroundColor: 'var(--primary)',
        transition: 'width 0.1s ease',
    },
};

export default HyperplexedCarousel;
