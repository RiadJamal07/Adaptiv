import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaRunning, FaHeartbeat, FaChild, FaArrowRight } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const cardsRef = useRef([]);

    const services = [
        {
            icon: <FaRunning />,
            number: '01',
            title: 'Performance Coaching',
            description: 'Customized training plans for Triathlon, Duathlon, Running, and Cycling. Built on science and data.',
            features: ['Personalized Plans', 'Data Analysis', 'Race Strategy'],
        },
        {
            icon: <FaHeartbeat />,
            number: '02',
            title: 'Lifestyle & Fitness',
            description: 'Improve your lifestyle through fitness and gym programs. Weight loss, better health, and stronger routines.',
            features: ['Nutrition Guidance', 'Gym Programs', 'Habit Building'],
        },
        {
            icon: <FaChild />,
            number: '03',
            title: 'Youth & Adapted',
            description: 'Specialized coaching for kids and youth, including adapted physical activity for special needs.',
            features: ['Age-Appropriate', 'Fun & Engaging', 'Inclusive Programs'],
        },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading animation
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

            // Cards stagger animation with clip-path reveal
            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                gsap.fromTo(card,
                    {
                        clipPath: 'inset(0 0 100% 0)',
                        opacity: 0,
                        y: 40,
                    },
                    {
                        clipPath: 'inset(0 0 0% 0)',
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                        },
                        delay: i * 0.15,
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} style={styles.section}>
            <div className="container">
                {/* Section Header */}
                <div ref={headingRef} style={styles.header}>
                    <span style={styles.label}>What We Offer</span>
                    <h2 style={styles.heading}>
                        Coaching <span style={styles.headingAccent}>Services</span>
                    </h2>
                    <p style={styles.subheading}>
                        Transform your performance with personalized coaching tailored to your goals
                    </p>
                </div>

                {/* Services Grid */}
                <div style={styles.grid}>
                    {services.map((service, index) => (
                        <div
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                            style={styles.card}
                            className="service-card"
                        >
                            {/* Card Header */}
                            <div style={styles.cardHeader}>
                                <span style={styles.number}>{service.number}</span>
                                <div style={styles.iconWrapper}>
                                    {React.cloneElement(service.icon, { size: 24 })}
                                </div>
                            </div>

                            {/* Card Content */}
                            <h3 style={styles.cardTitle}>{service.title}</h3>
                            <p style={styles.cardDescription}>{service.description}</p>

                            {/* Features */}
                            <ul style={styles.features}>
                                {service.features.map((feature, i) => (
                                    <li key={i} style={styles.feature}>
                                        <span style={styles.featureDot} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* Card Footer */}
                            <div style={styles.cardFooter}>
                                <span style={styles.learnMore}>Learn More</span>
                                <FaArrowRight style={styles.arrow} />
                            </div>

                            {/* Hover Border */}
                            <div style={styles.hoverBorder} className="hover-border" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Add hover styles */}
            <style>{`
                .service-card {
                    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                                box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                @media (pointer: fine) {
                    .service-card:hover {
                        transform: translateY(-10px);
                        box-shadow: 0 30px 60px -20px rgba(225, 82, 47, 0.3);
                    }
                    .service-card:hover .hover-border {
                        opacity: 1;
                    }
                    .service-card:hover .arrow {
                        transform: translateX(5px);
                    }
                }
                @media (max-width: 768px) {
                    .service-card {
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
        background: 'linear-gradient(180deg, var(--bg-color) 0%, #0f0f0f 100%)',
        position: 'relative',
        overflow: 'hidden',
    },
    header: {
        textAlign: 'center',
        marginBottom: 'clamp(3rem, 8vh, 5rem)',
        maxWidth: '700px',
        margin: '0 auto clamp(3rem, 8vh, 5rem)',
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
        lineHeight: 1.7,
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
        gap: 'clamp(1rem, 3vw, 2rem)',
    },
    card: {
        position: 'relative',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        borderRadius: '20px',
        padding: 'clamp(2rem, 4vw, 3rem)',
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
        cursor: 'pointer',
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '2rem',
    },
    number: {
        fontSize: '4rem',
        fontWeight: 900,
        color: 'rgba(255,255,255,0.03)',
        lineHeight: 1,
        letterSpacing: '-0.05em',
    },
    iconWrapper: {
        width: '56px',
        height: '56px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, var(--primary) 0%, #ff6b4a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
    },
    cardTitle: {
        fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)',
        fontWeight: 700,
        marginBottom: '1rem',
        color: 'var(--white)',
    },
    cardDescription: {
        fontSize: '0.95rem',
        color: 'rgba(255,255,255,0.6)',
        lineHeight: 1.7,
        marginBottom: '1.5rem',
    },
    features: {
        listStyle: 'none',
        padding: 0,
        margin: '0 0 2rem 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
    },
    feature: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '0.9rem',
        color: 'rgba(255,255,255,0.8)',
    },
    featureDot: {
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: 'var(--primary)',
        flexShrink: 0,
    },
    cardFooter: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        paddingTop: '1.5rem',
        borderTop: '1px solid rgba(255,255,255,0.08)',
    },
    learnMore: {
        fontSize: '0.9rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: 'var(--primary)',
    },
    arrow: {
        color: 'var(--primary)',
        fontSize: '0.8rem',
        transition: 'transform 0.3s ease',
    },
    hoverBorder: {
        position: 'absolute',
        inset: 0,
        borderRadius: '20px',
        border: '2px solid var(--primary)',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
    },
};

export default Services;
