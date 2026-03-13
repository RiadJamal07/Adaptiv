import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaTimes } from 'react-icons/fa';
import img3 from '../assets/3.jpg';

const About = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const textRefs = useRef([]);
    const imageRef = useRef(null);
    const imageRevealRef = useRef(null);
    const [showPreview, setShowPreview] = useState(false);
    const credentialsRef = useRef(null);

    useEffect(() => {
        if (showPreview) {
            document.body.style.overflow = 'hidden';
            const onKey = (e) => { if (e.key === 'Escape') setShowPreview(false); };
            document.addEventListener('keydown', onKey);
            return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey); };
        }
    }, [showPreview]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading animation - character by character
            const heading = headingRef.current;
            const chars = heading.innerText.split('');
            heading.innerHTML = chars.map(char =>
                char === ' ' ? ' ' : `<span class="char">${char}</span>`
            ).join('');

            gsap.from(heading.querySelectorAll('.char'), {
                opacity: 0,
                y: 50,
                rotateX: -90,
                stagger: 0.02,
                duration: 0.5,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: heading,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            });

            // Text paragraphs animation with clip-path reveal
            textRefs.current.forEach((text, i) => {
                if (!text) return;
                gsap.fromTo(text,
                    {
                        clipPath: 'inset(0 0 100% 0)',
                        opacity: 0,
                    },
                    {
                        clipPath: 'inset(0 0 0% 0)',
                        opacity: 1,
                        duration: 0.6,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: text,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                        delay: i * 0.07,
                    }
                );
            });

            // Credentials animation
            if (credentialsRef.current) {
                gsap.fromTo(credentialsRef.current,
                    { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
                    {
                        clipPath: 'inset(0 0 0% 0)',
                        opacity: 1,
                        duration: 0.6,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: credentialsRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }

            // Image reveal with clip-path
            gsap.set(imageRevealRef.current, {
                clipPath: 'inset(0 100% 0 0)',
            });

            gsap.to(imageRevealRef.current, {
                clipPath: 'inset(0 0% 0 0)',
                duration: 0.7,
                ease: 'power4.inOut',
                scrollTrigger: {
                    trigger: imageRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                },
            });

            // Parallax on image
            gsap.to(imageRef.current.querySelector('img'), {
                yPercent: -15,
                ease: 'none',
                scrollTrigger: {
                    trigger: imageRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const credentials = [
        'BA in Adapted Physical Activity & Motricity Training',
        'Certified Cycling Coach — SSISA Academy',
        'Certified Cycling Coach — UESCA Academy',
        'Certified Running Coach — UESCA Academy',
        'Certified World Triathlon Coach Level 1',
        'Certified Track & Field Coach — Performance First',
    ];

    return (
        <div ref={sectionRef} style={styles.container}>
            <div className="container" style={styles.content}>
                <div style={styles.row}>
                    <div style={styles.textColumn}>
                        <h2 ref={headingRef} style={styles.heading}>About Omar</h2>

                        <p ref={el => textRefs.current[0] = el} style={styles.text}>
                            I'm Omar Zaatiti, a duathlete and performance coach. I started training
                            at 16 and began coaching at 20 at <a href="https://www.instagram.com/profit_lb/" target="_blank" rel="noopener noreferrer" className="profit-link">Profit Academy</a>, and since then I've
                            dedicated myself to understanding how people move, learn, and grow through sport.
                        </p>

                        <p ref={el => textRefs.current[1] = el} style={styles.text}>
                            Today, I train over 16 hours a week as a multi-sport athlete and coach
                            kids, youth, and adults at Profit. I also hold a degree in Adapted
                            Physical Activity, where I worked with children and individuals with special
                            needs—an experience that shaped how I tailor training to each person's level
                            and abilities.
                        </p>

                        <p ref={el => textRefs.current[2] = el} style={styles.text}>
                            My coaching philosophy is simple: I've always believed that performance
                            comes from adaptation—not perfection—and that every athlete deserves a
                            training approach that meets them where they are and builds them into who
                            they can become.
                        </p>

                        <p ref={el => textRefs.current[3] = el} style={styles.text}>
                            That belief is at the heart of Adaptiv. Sport has been my language since
                            I was young. Coaching is where I translate that language into real change
                            for others.
                        </p>

                        <p ref={el => textRefs.current[4] = el} style={styles.text}>
                            Welcome to Adaptiv—where performance begins with understanding.
                        </p>

                        <div ref={credentialsRef} style={styles.credentials}>
                            <h3 style={styles.credentialsTitle}>Credentials</h3>
                            <ul style={styles.credentialsList}>
                                {credentials.map((cred, i) => (
                                    <li key={i} style={styles.credentialItem}>{cred}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div ref={imageRef} style={styles.imageColumn}>
                        <div ref={imageRevealRef} style={styles.imageWrapper} onClick={() => setShowPreview(true)} className="about-image-wrap">
                            <img
                                src={img3}
                                alt="Omar Zaatiti"
                                style={styles.image}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showPreview && (
                    <motion.div
                        style={styles.lightbox}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => setShowPreview(false)}
                    >
                        <button
                            style={styles.closeBtn}
                            className="lb-close"
                            onClick={() => setShowPreview(false)}
                            aria-label="Close"
                        >
                            <FaTimes size={18} />
                        </button>
                        <motion.img
                            src={img3}
                            alt="Omar Zaatiti"
                            style={styles.lightboxImage}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            draggable="false"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .about-image-wrap {
                    cursor: pointer;
                }
                .lb-close {
                    transition: background 0.2s ease;
                }
                .lb-close:hover {
                    background: rgba(255,255,255,0.2) !important;
                }
                .profit-link {
                    color: var(--primary);
                    text-decoration: none;
                    font-weight: 600;
                    border-bottom: 1px solid transparent;
                    transition: border-color 0.3s ease;
                }
                .profit-link:hover {
                    border-bottom-color: var(--primary);
                }
            `}</style>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        paddingTop: 'clamp(80px, 15vh, 120px)',
        paddingBottom: 'clamp(2rem, 5vh, 4rem)',
        overflow: 'hidden',
    },
    content: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 clamp(1rem, 4vw, 2rem)',
    },
    row: {
        display: 'flex',
        gap: 'clamp(2rem, 5vw, 4rem)',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    textColumn: {
        flex: '1 1 min(100%, 450px)',
    },
    imageColumn: {
        flex: '1 1 min(100%, 350px)',
        overflow: 'hidden',
    },
    heading: {
        marginBottom: '2rem',
        color: 'var(--primary)',
        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '-0.02em',
    },
    text: {
        fontSize: '1.1rem',
        lineHeight: '1.8',
        marginBottom: '1.5rem',
        color: 'rgba(255,255,255,0.8)',
    },
    credentials: {
        marginTop: '2rem',
    },
    credentialsTitle: {
        fontSize: '1.3rem',
        fontWeight: 700,
        color: 'var(--primary)',
        marginBottom: '1rem',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },
    credentialsList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem',
    },
    credentialItem: {
        fontSize: '0.95rem',
        color: 'rgba(255,255,255,0.85)',
        padding: '0.6rem 1rem',
        borderLeft: '3px solid var(--primary)',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '0 8px 8px 0',
    },
    imageWrapper: {
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '20px',
    },
    image: {
        width: '100%',
        height: 'auto',
        display: 'block',
        transform: 'scale(1.2)',
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
};

export default About;
