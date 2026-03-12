import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';
import img5 from '../assets/5.jpg';

const images = [img1, img2, img3, img4, img5];

const HyperplexedCarousel = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(headingRef.current, {
                opacity: 0, y: 60, duration: 0.6, ease: 'power3.out',
                scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    // Lightbox keyboard nav + body lock
    useEffect(() => {
        if (selectedIndex !== null) {
            document.body.style.overflow = 'hidden';
            const onKey = (e) => {
                if (e.key === 'Escape') setSelectedIndex(null);
                if (e.key === 'ArrowRight') setSelectedIndex(i => (i + 1) % images.length);
                if (e.key === 'ArrowLeft') setSelectedIndex(i => (i - 1 + images.length) % images.length);
            };
            document.addEventListener('keydown', onKey);
            return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey); };
        }
    }, [selectedIndex]);

    return (
        <section ref={sectionRef} style={styles.section}>
            <div className="container">
                <div ref={headingRef} style={styles.header}>
                    <span style={styles.label}>Gallery</span>
                    <h2 style={styles.heading}>
                        Moments of <span style={styles.headingAccent}>Excellence</span>
                    </h2>
                </div>
            </div>

            {/* Horizontal scroll strip */}
            <div className="gallery-strip">
                {images.map((src, i) => (
                    <div
                        key={i}
                        className="gallery-item"
                        onClick={() => setSelectedIndex(i)}
                    >
                        <img src={src} alt={`Gallery ${i + 1}`} draggable="false" />
                        <div className="gallery-overlay" />
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        style={styles.lightbox}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => setSelectedIndex(null)}
                    >
                        <button
                            style={styles.closeBtn}
                            className="lb-btn"
                            onClick={() => setSelectedIndex(null)}
                            aria-label="Close"
                        >
                            <FaTimes size={18} />
                        </button>

                        <button
                            style={{ ...styles.navBtn, left: 'clamp(0.5rem, 2vw, 1.5rem)' }}
                            className="lb-btn"
                            onClick={(e) => { e.stopPropagation(); setSelectedIndex(i => (i - 1 + images.length) % images.length); }}
                            aria-label="Previous"
                        >
                            <FaChevronLeft size={20} />
                        </button>

                        <motion.img
                            key={selectedIndex}
                            src={images[selectedIndex]}
                            alt={`Gallery ${selectedIndex + 1}`}
                            style={styles.lightboxImage}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            draggable="false"
                        />

                        <button
                            style={{ ...styles.navBtn, right: 'clamp(0.5rem, 2vw, 1.5rem)' }}
                            className="lb-btn"
                            onClick={(e) => { e.stopPropagation(); setSelectedIndex(i => (i + 1) % images.length); }}
                            aria-label="Next"
                        >
                            <FaChevronRight size={20} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .gallery-strip {
                    display: flex;
                    gap: clamp(0.5rem, 1.5vw, 1rem);
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                    scroll-snap-type: x proximity;
                    scrollbar-width: none;
                    padding: 0 clamp(1rem, 4vw, 3rem);
                }
                .gallery-strip::-webkit-scrollbar {
                    display: none;
                }
                .gallery-item {
                    flex: 0 0 clamp(280px, 40vw, 450px);
                    aspect-ratio: 4 / 3;
                    border-radius: 12px;
                    overflow: hidden;
                    cursor: pointer;
                    position: relative;
                    scroll-snap-align: start;
                }
                .gallery-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                    transition: transform 0.4s ease;
                    user-select: none;
                }
                .gallery-overlay {
                    position: absolute;
                    inset: 0;
                    background: rgba(0,0,0,0.3);
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                @media (pointer: fine) {
                    .gallery-item:hover .gallery-overlay {
                        opacity: 1;
                    }
                    .gallery-item:hover img {
                        transform: scale(1.05);
                    }
                }
                .lb-btn {
                    transition: background 0.2s ease;
                }
                .lb-btn:hover {
                    background: rgba(255,255,255,0.2) !important;
                }
            `}</style>
        </section>
    );
};

const styles = {
    section: {
        padding: 'clamp(5rem, 15vh, 10rem) 0',
        overflow: 'hidden',
    },
    header: {
        textAlign: 'center',
        marginBottom: 'clamp(2rem, 5vh, 3rem)',
    },
    label: {
        display: 'inline-block',
        fontSize: '0.85rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '3px',
        color: 'var(--primary)',
        marginBottom: '1rem',
    },
    heading: {
        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '-0.02em',
        lineHeight: 1.1,
    },
    headingAccent: {
        color: 'var(--primary)',
    },
    lightbox: {
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.9)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
    },
    lightboxImage: {
        maxWidth: '90vw',
        maxHeight: '85vh',
        objectFit: 'contain',
        borderRadius: '8px',
        userSelect: 'none',
    },
    closeBtn: {
        position: 'absolute',
        top: 'clamp(1rem, 3vw, 2rem)',
        right: 'clamp(1rem, 3vw, 2rem)',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.2)',
        background: 'rgba(255,255,255,0.1)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 10,
    },
    navBtn: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.2)',
        background: 'rgba(255,255,255,0.1)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 10,
    },
};

export default HyperplexedCarousel;
