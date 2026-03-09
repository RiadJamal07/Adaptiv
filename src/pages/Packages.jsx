import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaWhatsapp, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Packages = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(headingRef.current, {
                opacity: 0,
                y: 60,
                duration: 0.6,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: 'top 85%',
                },
            });

            gsap.from(cardRef.current, {
                opacity: 0,
                y: 80,
                duration: 0.6,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: 'top 85%',
                },
                delay: 0.15,
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} style={styles.section}>
            {/* Background Elements */}
            <div style={styles.bgGlow} />

            <div className="container">
                {/* Header */}
                <div ref={headingRef} style={styles.header}>
                    <span style={styles.label}>Get Started</span>
                    <h2 style={styles.heading}>
                        Ready to <span style={styles.headingAccent}>Start</span>?
                    </h2>
                    <p style={styles.subheading}>
                        Every journey begins with a conversation. Let's find the right plan for you.
                    </p>
                </div>

                {/* CTA Card */}
                <div ref={cardRef} style={styles.ctaCard}>
                    <h3 style={styles.ctaTitle}>Book Your Free Consultation</h3>
                    <p style={styles.ctaDescription}>
                        Tell me about your goals and fitness level, and together we'll build a
                        training plan that works for you.
                    </p>

                    <a
                        href="https://wa.me/96179177371"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.whatsappButton}
                        className="cta-whatsapp-btn"
                    >
                        <FaWhatsapp size={22} />
                        <span>Chat on WhatsApp</span>
                    </a>

                    <div style={styles.altContact}>
                        <span style={styles.altContactLabel}>Or reach out via</span>
                        <div style={styles.altLinks}>
                            <a
                                href="https://www.instagram.com/adaptiv.lb"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={styles.altLink}
                                className="alt-contact-link"
                            >
                                <FaInstagram size={18} />
                                <span>Instagram</span>
                            </a>
                            <a
                                href="mailto:omar@adaptiv.lb"
                                style={styles.altLink}
                                className="alt-contact-link"
                            >
                                <FaEnvelope size={16} />
                                <span>Email</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .cta-whatsapp-btn {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                @media (pointer: fine) {
                    .cta-whatsapp-btn:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 12px 30px -8px rgba(37, 211, 102, 0.4);
                    }
                    .alt-contact-link:hover {
                        color: var(--primary) !important;
                        border-color: var(--primary) !important;
                    }
                }
            `}</style>
        </section>
    );
};

const styles = {
    section: {
        padding: 'clamp(5rem, 15vh, 10rem) 0',
        background: '#0a0a0a',
        position: 'relative',
        overflow: 'hidden',
    },
    bgGlow: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
    },
    header: {
        textAlign: 'center',
        marginBottom: 'clamp(3rem, 8vh, 5rem)',
        position: 'relative',
        zIndex: 1,
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
        marginBottom: '1.5rem',
    },
    headingAccent: {
        color: 'var(--primary)',
    },
    subheading: {
        fontSize: '1.1rem',
        color: 'rgba(255,255,255,0.85)',
        maxWidth: '500px',
        margin: '0 auto',
    },
    ctaCard: {
        maxWidth: '560px',
        margin: '0 auto',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
        borderRadius: '24px',
        padding: 'clamp(2rem, 5vw, 3.5rem)',
        border: '1px solid rgba(255,255,255,0.12)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
    },
    ctaTitle: {
        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
        fontWeight: 700,
        marginBottom: '1rem',
        color: 'var(--white)',
    },
    ctaDescription: {
        fontSize: '1.05rem',
        color: 'rgba(255,255,255,0.7)',
        lineHeight: 1.7,
        marginBottom: '2rem',
    },
    whatsappButton: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1rem 2.5rem',
        fontSize: '1rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '1px',
        backgroundColor: '#25D366',
        color: '#fff',
        border: 'none',
        borderRadius: '16px',
        cursor: 'pointer',
        textDecoration: 'none',
    },
    altContact: {
        marginTop: '2rem',
        paddingTop: '1.5rem',
        borderTop: '1px solid rgba(255,255,255,0.08)',
    },
    altContactLabel: {
        fontSize: '0.85rem',
        color: 'rgba(255,255,255,0.4)',
        display: 'block',
        marginBottom: '1rem',
    },
    altLinks: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
    },
    altLink: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.6rem 1.2rem',
        fontSize: '0.9rem',
        color: 'rgba(255,255,255,0.6)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '12px',
        textDecoration: 'none',
        transition: 'color 0.3s ease, border-color 0.3s ease',
    },
};

export default Packages;
