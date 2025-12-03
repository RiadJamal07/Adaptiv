import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaInstagram, FaWhatsapp, FaEnvelope, FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const contentRef = useRef(null);
    const cardsRef = useRef([]);

    const contactMethods = [
        {
            icon: <FaWhatsapp />,
            label: 'WhatsApp',
            value: '+961 79 177 371',
            href: 'https://wa.me/96179177371',
            color: '#25D366',
        },
        {
            icon: <FaInstagram />,
            label: 'Instagram',
            value: '@Omar.zaatiti',
            href: 'https://instagram.com/Omar.zaatiti',
            color: '#E4405F',
        },
        {
            icon: <FaEnvelope />,
            label: 'Email',
            value: 'Omarzaatiti14@gmail.com',
            href: 'mailto:Omarzaatiti14@gmail.com',
            color: 'var(--primary)',
        },
    ];

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

            gsap.from(contentRef.current, {
                opacity: 0,
                y: 40,
                duration: 0.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: contentRef.current,
                    start: 'top 85%',
                },
                delay: 0.1,
            });

            cardsRef.current.forEach((card, i) => {
                gsap.from(card, {
                    opacity: 0,
                    x: -30,
                    duration: 0.4,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 90%',
                    },
                    delay: i * 0.06,
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} style={styles.section}>
            {/* Background Elements */}
            <div style={styles.bgGradient} />
            <div style={styles.gridPattern} />

            <div className="container">
                <div style={styles.wrapper}>
                    {/* Left Side - Content */}
                    <div style={styles.leftColumn}>
                        <div ref={headingRef}>
                            <span style={styles.label}>Get in Touch</span>
                            <h2 style={styles.heading}>
                                Let's Start Your<br />
                                <span style={styles.headingAccent}>Journey Together</span>
                            </h2>
                        </div>

                        <div ref={contentRef}>
                            <p style={styles.description}>
                                Ready to transform your performance? Reach out through any channel
                                and let's discuss how we can help you achieve your goals.
                            </p>

                            <div style={styles.locationWrapper}>
                                <FaMapMarkerAlt style={styles.locationIcon} />
                                <span style={styles.locationText}>Lebanon</span>
                            </div>
                        </div>

                        {/* Contact Cards */}
                        <div style={styles.contactCards}>
                            {contactMethods.map((method, index) => (
                                <a
                                    key={index}
                                    href={method.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    ref={el => cardsRef.current[index] = el}
                                    style={styles.contactCard}
                                    className="contact-card"
                                >
                                    <div style={{ ...styles.iconWrapper, background: `${method.color}20` }}>
                                        {React.cloneElement(method.icon, {
                                            size: 22,
                                            style: { color: method.color }
                                        })}
                                    </div>
                                    <div style={styles.cardContent}>
                                        <span style={styles.cardLabel}>{method.label}</span>
                                        <span style={styles.cardValue}>{method.value}</span>
                                    </div>
                                    <FaArrowRight style={styles.cardArrow} className="card-arrow" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - CTA Box */}
                    <div style={styles.rightColumn}>
                        <div style={styles.ctaBox}>
                            <div style={styles.ctaContent}>
                                <span style={styles.ctaLabel}>Ready to Start?</span>
                                <h3 style={styles.ctaHeading}>Book Your Free Consultation</h3>
                                <p style={styles.ctaText}>
                                    Get a personalized assessment and learn how we can help you
                                    reach your fitness goals. No commitment required.
                                </p>
                                <a
                                    href="https://wa.me/96179177371?text=Hi%20Omar!%20I'm%20interested%20in%20learning%20more%20about%20your%20coaching%20services."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={styles.ctaButton}
                                    className="cta-button"
                                >
                                    <span>Schedule Now</span>
                                    <FaArrowRight size={14} />
                                </a>
                            </div>

                            {/* Decorative Elements */}
                            <div style={styles.ctaDecor1} />
                            <div style={styles.ctaDecor2} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer style={styles.footer}>
                <div className="container">
                    <div style={styles.footerContent}>
                        <p style={styles.copyright}>
                            © {new Date().getFullYear()} Adaptiv. All rights reserved.
                        </p>
                        <p style={styles.footerTagline}>
                            Unlock Your Full Potential
                        </p>
                    </div>
                </div>
            </footer>

            <style>{`
                .contact-card {
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
                @media (pointer: fine) {
                    .contact-card:hover {
                        transform: translateX(10px);
                        background: rgba(255,255,255,0.08);
                    }
                    .contact-card:hover .card-arrow {
                        opacity: 1;
                        transform: translateX(0);
                    }
                    .cta-button:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 10px 30px -10px rgba(255, 255, 255, 0.2);
                    }
                }
                .cta-button {
                    transition: all 0.3s ease;
                }
                @media (max-width: 768px) {
                    .contact-card {
                        padding: 1rem !important;
                    }
                }
            `}</style>
        </section>
    );
};

const styles = {
    section: {
        minHeight: '100vh',
        padding: 'clamp(5rem, 15vh, 10rem) 0 0',
        background: '#0a0a0a',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
    },
    bgGradient: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '60%',
        height: '100%',
        background: 'radial-gradient(ellipse at 100% 0%, rgba(255, 255, 255, 0.03) 0%, transparent 60%)',
        pointerEvents: 'none',
    },
    gridPattern: {
        position: 'absolute',
        inset: 0,
        backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
    },
    wrapper: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
        gap: 'clamp(2rem, 5vw, 5rem)',
        alignItems: 'start',
        position: 'relative',
        zIndex: 1,
    },
    leftColumn: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
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
    description: {
        fontSize: '1.1rem',
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 1.7,
        maxWidth: '500px',
        marginBottom: '1.5rem',
    },
    locationWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
    },
    locationIcon: {
        color: 'var(--primary)',
        fontSize: '1.2rem',
    },
    locationText: {
        fontSize: '1rem',
        color: 'rgba(255,255,255,0.8)',
        fontWeight: 500,
    },
    contactCards: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginTop: '1rem',
    },
    contactCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1.25rem',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.06)',
        textDecoration: 'none',
        color: 'inherit',
    },
    iconWrapper: {
        width: '50px',
        height: '50px',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    cardContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
    },
    cardLabel: {
        fontSize: '0.8rem',
        color: 'rgba(255,255,255,0.5)',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },
    cardValue: {
        fontSize: '1rem',
        color: 'var(--white)',
        fontWeight: 500,
    },
    cardArrow: {
        color: 'var(--primary)',
        opacity: 0,
        transform: 'translateX(-10px)',
        transition: 'all 0.3s ease',
    },
    rightColumn: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    ctaBox: {
        position: 'relative',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
        borderRadius: '20px',
        padding: 'clamp(2rem, 5vw, 3rem)',
        border: '1px solid rgba(255,255,255,0.15)',
        overflow: 'hidden',
        maxWidth: '450px',
        width: '100%',
    },
    ctaContent: {
        position: 'relative',
        zIndex: 1,
    },
    ctaLabel: {
        display: 'inline-block',
        fontSize: '0.8rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '2px',
        color: 'var(--primary)',
        marginBottom: '1rem',
    },
    ctaHeading: {
        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
        fontWeight: 700,
        marginBottom: '1rem',
        lineHeight: 1.2,
    },
    ctaText: {
        fontSize: '0.95rem',
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 1.7,
        marginBottom: '2rem',
    },
    ctaButton: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1rem 2rem',
        background: 'var(--primary)',
        color: 'white',
        borderRadius: '16px',
        fontSize: '0.95rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '1px',
        textDecoration: 'none',
    },
    ctaDecor1: {
        position: 'absolute',
        top: '-50%',
        right: '-30%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
    },
    ctaDecor2: {
        position: 'absolute',
        bottom: '-30%',
        left: '-20%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
    },
    footer: {
        marginTop: 'auto',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '2rem 0',
    },
    footerContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
    },
    copyright: {
        fontSize: '0.9rem',
        color: 'rgba(255,255,255,0.4)',
        margin: 0,
    },
    footerTagline: {
        fontSize: '0.85rem',
        color: 'var(--primary)',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '2px',
        margin: 0,
    },
};

export default Contact;
