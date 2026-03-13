import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaChild, FaHeartbeat, FaRunning, FaArrowRight } from 'react-icons/fa';
import TiltCard from './TiltCard';


const Services = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const cardsRef = useRef([]);
    const iconRefs = useRef([]);

    const services = [
        {
            icon: <FaChild />,
            number: '01',
            title: 'Adaptive',
            description: 'Special needs 1-on-1 private sessions tailored to each individual\'s abilities and goals.',
            features: [
                'Developmental delays & ADHD / Autism spectrum',
                'Learning disabilities & coordination disorders',
                'Physical disabilities (cerebral palsy, amputations)',
                'Intellectual disabilities & sensory impairments',
                'Chronic conditions (obesity, diabetes, cardiovascular)',
                'Neurological disorders (e.g., Parkinson\'s)',
            ],
        },
        {
            icon: <FaHeartbeat />,
            number: '02',
            title: 'Athletic & Fitness Training',
            description: 'Improving your lifestyle through training and building strength plans for athletes.',
            features: [
                'Enhancing fitness through personalized training programs built around your schedule',
                'Strength training plans for athletes',
            ],
        },
        {
            icon: <FaRunning />,
            number: '03',
            title: 'Adaptive x Profit',
            profitLink: true,
            description: 'Structured endurance sport programs to elevate your competitive performance.',
            features: [
                'Private & Group sessions',
                'Running & Cycling programs',
                'Duathlon & Triathlon programs',
            ],
        },
    ];

    const scrollToContact = () => {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading animation
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
                        duration: 0.6,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                        },
                        delay: i * 0.09,
                    }
                );
            });


            // Icon hover animations
            iconRefs.current.forEach((icon) => {
                if (!icon) return;

                const onMouseEnter = () => {
                    gsap.to(icon, {
                        scale: 1.15,
                        rotation: 8,
                        duration: 0.4,
                        ease: 'elastic.out(1, 0.5)',
                        filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))',
                    });
                };

                const onMouseLeave = () => {
                    gsap.to(icon, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.4,
                        ease: 'elastic.out(1, 0.5)',
                        filter: 'drop-shadow(0 0 0px rgba(255, 255, 255, 0))',
                    });
                };

                icon.addEventListener('mouseenter', onMouseEnter);
                icon.addEventListener('mouseleave', onMouseLeave);
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} style={styles.section}>
            {/* Gradient Mesh Background */}
            <div style={styles.gradientMesh}>
                <div style={styles.blob1}></div>
                <div style={styles.blob2}></div>
                <div style={styles.blob3}></div>
            </div>

            <div className="container">
                {/* Section Header */}
                <div ref={headingRef} style={styles.header}>
                    <span style={styles.label}>What I Offer</span>
                    <h2 style={styles.heading}>
                        Coaching <span style={styles.headingAccent}>Services</span>
                    </h2>
                    <p style={styles.subheading}>
                        Training adapted to your goals, abilities, and lifestyle
                    </p>
                </div>

                {/* Services Grid */}
                <div style={styles.grid}>
                    {services.map((service, index) => (
                        <TiltCard
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                            style={styles.card}
                            className="service-card"
                        >
                            {/* Card Header */}
                            <div style={styles.cardHeader}>
                                <span style={styles.number}>{service.number}</span>
                                <div
                                    ref={el => iconRefs.current[index] = el}
                                    style={styles.iconWrapper}
                                >
                                    {React.cloneElement(service.icon, { size: 24 })}
                                </div>
                            </div>

                            {/* Card Content */}
                            <h3 style={styles.cardTitle}>
                                {service.profitLink ? (
                                    <>Adaptive x <a href="https://www.instagram.com/profit_lb/" target="_blank" rel="noopener noreferrer" className="profit-link">Profit</a></>
                                ) : service.title}
                            </h3>
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
                            <div style={styles.cardFooter} onClick={scrollToContact}>
                                <span style={styles.learnMore}>Book a Consultation</span>
                                <FaArrowRight style={styles.arrow} />
                            </div>

                            {/* Hover Border */}
                            <div style={styles.hoverBorder} className="hover-border" />
                        </TiltCard>
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
                        box-shadow: 0 30px 60px -20px rgba(255, 255, 255, 0.1);
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
                .profit-link {
                    color: var(--primary);
                    text-decoration: none;
                    font-weight: inherit;
                    border-bottom: 1px solid transparent;
                    transition: border-color 0.3s ease;
                }
                .profit-link:hover {
                    border-bottom-color: var(--primary);
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
        lineHeight: 1.7,
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
        gap: 'clamp(1rem, 3vw, 2rem)',
        position: 'relative',
        zIndex: 1,
    },
    card: {
        position: 'relative',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        borderRadius: '20px',
        padding: 'clamp(2rem, 4vw, 3rem)',
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
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
        lineHeight: 1.1,
        letterSpacing: '-0.05em',
    },
    iconWrapper: {
        width: '56px',
        height: '56px',
        borderRadius: '16px',
        background: 'rgba(255,255,255,0.1)',
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
        color: 'rgba(255,255,255,0.85)',
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
        flex: 1,
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
        backgroundColor: 'rgba(255,255,255,0.5)',
        flexShrink: 0,
    },
    cardFooter: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        paddingTop: '1.5rem',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        cursor: 'pointer',
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
        border: '2px solid rgba(255,255,255,0.3)',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
    },
    gradientMesh: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
    },
    blob1: {
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
        filter: 'blur(60px)',
        opacity: 0.7,
    },
    blob2: {
        position: 'absolute',
        top: '60%',
        right: '10%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, transparent 70%)',
        filter: 'blur(50px)',
        opacity: 0.6,
    },
    blob3: {
        position: 'absolute',
        bottom: '10%',
        left: '30%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, transparent 70%)',
        filter: 'blur(40px)',
        opacity: 0.5,
    },
};

export default Services;
