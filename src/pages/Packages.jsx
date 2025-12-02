import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaCheck, FaArrowRight } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Packages = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const cardsRef = useRef([]);

    const plans = [
        {
            name: 'Starter',
            description: 'Perfect for beginners starting their fitness journey',
            price: '99',
            period: 'month',
            features: [
                'Personalized Training Plan',
                'Monthly Progress Review',
                'Email Support',
                'Training App Access',
            ],
            cta: 'Get Started',
        },
        {
            name: 'Pro',
            description: 'For dedicated athletes seeking serious results',
            price: '199',
            period: 'month',
            popular: true,
            features: [
                'Everything in Starter',
                'Weekly Check-ins',
                'Advanced Data Analysis',
                'Nutrition Guidelines',
                'Video Call Support',
                'Race Day Strategy',
            ],
            cta: 'Go Pro',
        },
        {
            name: 'Elite',
            description: 'Maximum results with premium 1-on-1 attention',
            price: '299',
            period: 'month',
            features: [
                'Everything in Pro',
                'Daily Feedback',
                'Video Analysis',
                '24/7 Priority Support',
                'Custom Nutrition Plan',
                'Monthly In-Person Session',
            ],
            cta: 'Go Elite',
        },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(headingRef.current, {
                opacity: 0,
                y: 60,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: 'top 85%',
                },
            });

            cardsRef.current.forEach((card, i) => {
                gsap.from(card, {
                    opacity: 0,
                    y: 100,
                    scale: 0.95,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                    },
                    delay: i * 0.1,
                });
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
                    <span style={styles.label}>Pricing</span>
                    <h2 style={styles.heading}>
                        Choose Your <span style={styles.headingAccent}>Plan</span>
                    </h2>
                    <p style={styles.subheading}>
                        Invest in yourself. All plans include a 7-day money-back guarantee.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div style={styles.grid}>
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                            style={{
                                ...styles.card,
                                ...(plan.popular ? styles.popularCard : {}),
                            }}
                            className="pricing-card"
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div style={styles.badge}>
                                    <span>Most Popular</span>
                                </div>
                            )}

                            {/* Plan Header */}
                            <div style={styles.planHeader}>
                                <h3 style={styles.planName}>{plan.name}</h3>
                                <p style={styles.planDescription}>{plan.description}</p>
                            </div>

                            {/* Price */}
                            <div style={styles.priceWrapper}>
                                <span style={styles.currency}>$</span>
                                <span style={styles.price}>{plan.price}</span>
                                <span style={styles.period}>/{plan.period}</span>
                            </div>

                            {/* Features */}
                            <ul style={styles.features}>
                                {plan.features.map((feature, i) => (
                                    <li key={i} style={styles.feature}>
                                        <div style={styles.checkWrapper}>
                                            <FaCheck size={10} />
                                        </div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <button
                                style={{
                                    ...styles.button,
                                    ...(plan.popular ? styles.popularButton : {}),
                                }}
                                className="pricing-btn"
                            >
                                <span>{plan.cta}</span>
                                <FaArrowRight size={12} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Bottom Note */}
                <p style={styles.note}>
                    Need a custom plan? <a href="#contact" style={styles.link}>Contact us</a> for enterprise pricing.
                </p>
            </div>

            <style>{`
                .pricing-card {
                    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                                box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                @media (pointer: fine) {
                    .pricing-card:hover {
                        transform: translateY(-8px);
                    }
                    .pricing-btn:hover {
                        gap: 1rem;
                    }
                }
                .pricing-btn {
                    transition: all 0.3s ease;
                }
                @media (max-width: 768px) {
                    .pricing-card {
                        padding: 1.5rem !important;
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
        background: 'radial-gradient(circle, rgba(225, 82, 47, 0.08) 0%, transparent 70%)',
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
        lineHeight: 1,
        marginBottom: '1.5rem',
    },
    headingAccent: {
        color: 'var(--primary)',
    },
    subheading: {
        fontSize: '1.1rem',
        color: 'rgba(255,255,255,0.6)',
        maxWidth: '500px',
        margin: '0 auto',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
        gap: 'clamp(1rem, 3vw, 1.5rem)',
        alignItems: 'stretch',
        position: 'relative',
        zIndex: 1,
    },
    card: {
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '24px',
        padding: 'clamp(2rem, 4vw, 2.5rem)',
        border: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
    },
    popularCard: {
        background: 'linear-gradient(135deg, rgba(225, 82, 47, 0.1) 0%, rgba(255,255,255,0.05) 100%)',
        border: '1px solid rgba(225, 82, 47, 0.3)',
        boxShadow: '0 0 60px -20px rgba(225, 82, 47, 0.4)',
    },
    badge: {
        position: 'absolute',
        top: '-1px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'linear-gradient(135deg, var(--primary) 0%, #ff6b4a 100%)',
        padding: '0.5rem 1.5rem',
        borderRadius: '0 0 12px 12px',
        fontSize: '0.75rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: 'white',
    },
    planHeader: {
        marginBottom: '1.5rem',
        paddingTop: '0.5rem',
    },
    planName: {
        fontSize: '1.5rem',
        fontWeight: 700,
        marginBottom: '0.5rem',
        color: 'var(--white)',
    },
    planDescription: {
        fontSize: '0.9rem',
        color: 'rgba(255,255,255,0.5)',
        lineHeight: 1.5,
        margin: 0,
    },
    priceWrapper: {
        display: 'flex',
        alignItems: 'baseline',
        marginBottom: '2rem',
        gap: '0.25rem',
    },
    currency: {
        fontSize: '1.5rem',
        fontWeight: 700,
        color: 'var(--primary)',
        alignSelf: 'flex-start',
        marginTop: '0.5rem',
    },
    price: {
        fontSize: 'clamp(3rem, 8vw, 4rem)',
        fontWeight: 900,
        color: 'var(--white)',
        lineHeight: 1,
        letterSpacing: '-0.03em',
    },
    period: {
        fontSize: '1rem',
        color: 'rgba(255,255,255,0.4)',
        fontWeight: 500,
    },
    features: {
        listStyle: 'none',
        padding: 0,
        margin: '0 0 2rem 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        flex: 1,
    },
    feature: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '0.95rem',
        color: 'rgba(255,255,255,0.8)',
    },
    checkWrapper: {
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: 'rgba(225, 82, 47, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--primary)',
        flexShrink: 0,
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        padding: '1rem 2rem',
        fontSize: '0.9rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '1px',
        background: 'transparent',
        color: 'var(--white)',
        border: '2px solid rgba(255,255,255,0.2)',
        borderRadius: '12px',
        cursor: 'pointer',
        marginTop: 'auto',
    },
    popularButton: {
        background: 'linear-gradient(135deg, var(--primary) 0%, #ff6b4a 100%)',
        border: 'none',
    },
    note: {
        textAlign: 'center',
        marginTop: '3rem',
        fontSize: '0.95rem',
        color: 'rgba(255,255,255,0.5)',
    },
    link: {
        color: 'var(--primary)',
        textDecoration: 'underline',
        fontWeight: 600,
    },
};

export default Packages;
