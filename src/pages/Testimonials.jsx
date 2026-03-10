import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const AUTO_INTERVAL = 4000;
const GAP = 24;

const reviews = [
    {
        name: "Samer",
        role: "Duathlete",
        text: "Over the past year, training with Omar has been truly transformative. Starting from zero fitness and no running experience, I progressed to running half marathons, cycling 100km, and competing in duathlons — goals I once thought were impossible.\n\nBeyond structured training plans, Omar stands out for his constant support, smart motivation, and ability to push at the right moments without crossing limits. His strong focus on injury prevention allows for consistent, safe progress. He adapts training to real-life demands, explains fitness metrics clearly, and shows exceptional professionalism, detail, and long-term commitment to athlete development."
    },
    {
        name: "Michel",
        role: "Duathlete",
        text: "I started working out with coach Omar with the goal of improving my running and cycling performance, and the progress since then has been very noticeable.\n\nMy fitness has steadily increased, the training program balances cycling and running workouts without causing burnout or injury. Since starting, I've seen real progress in my running pace and cycling power, and I feel much stronger and more efficient during longer efforts.\n\nOmar is always available for support and fast response whenever adjustments or advice are needed. His expertise and dedication to the long-term growth of athletes make him an exceptional coach."
    },
    {
        name: "Mohamad Nourelddine",
        role: "Duathlete",
        text: "I just wrapped up the 2025–2026 season and I've been training with coach Omar since 2023. I couldn't be more grateful — under his guidance in cycling and running, I achieved over 10 podium finishes and set a new PB of 17:09 in the 5K!\n\nHe was always by my side, constantly pushing me and providing the perfect balance of motivation and technical guidance. Without a doubt, he's one of the best coaches I've ever had.\n\nI deeply appreciate his hard work and dedication and I'm so excited to see what we can accomplish in the upcoming season."
    },
    {
        name: "Afif Ayoubi",
        role: "Football Athlete",
        text: "I started training with Coach Omar to improve my running speed and endurance, as I always felt those were my weak points while playing football. Since then, both have improved a lot. He also helped me significantly improve my change-of-direction skills on the field.\n\nMy muscles feel stronger and more efficient, and I've finally built the physique I always wanted. His training truly works. I'm in the best shape that I've always dreamed of."
    },
    {
        name: "Sahar Saidi",
        role: "Parent",
        text: "I came to Lebanon for a summer vacation and was recommended to have my beloved son, Tarek, train with Coach Omar. Tarek has ADHD, and I'm truly grateful for the patience, understanding, and care Coach Omar showed during their sessions. It was a wonderful experience for my son, and I look forward to meeting him again when we visit Lebanon next year."
    }
];

const TOTAL = reviews.length;

// Build tripled array: [clone-set] [real-set] [clone-set]
// This lets us seamlessly loop in both directions
const tripled = [...reviews, ...reviews, ...reviews];

const Testimonials = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const trackRef = useRef(null);
    const autoTimer = useRef(null);
    const resumeTimer = useRef(null);
    const isPaused = useRef(false);
    const touchStartX = useRef(null);
    const isTransitioning = useRef(false);

    // pos tracks the index within the tripled array; starts at TOTAL (beginning of real set)
    const [pos, setPos] = useState(TOTAL);
    const [animate, setAnimate] = useState(true);
    const [cardWidth, setCardWidth] = useState(0);

    // Measure a single card width from the DOM
    const measureCard = useCallback(() => {
        const track = trackRef.current;
        if (!track) return;
        const firstCard = track.querySelector('.tcard');
        if (firstCard) setCardWidth(firstCard.offsetWidth);
    }, []);

    useEffect(() => {
        measureCard();
        window.addEventListener('resize', measureCard);
        return () => window.removeEventListener('resize', measureCard);
    }, [measureCard]);

    // Compute translateX for current pos
    const getTranslateX = useCallback(() => {
        if (!cardWidth) return 0;
        return -(pos * (cardWidth + GAP));
    }, [pos, cardWidth]);

    // After a transition ends, silently snap to the real set if we've drifted into clones
    const handleTransitionEnd = useCallback(() => {
        isTransitioning.current = false;
        const realIndex = ((pos % TOTAL) + TOTAL) % TOTAL;
        if (pos < TOTAL || pos >= TOTAL * 2) {
            setAnimate(false);
            setPos(TOTAL + realIndex);
        }
    }, [pos]);

    // Re-enable animation after a no-animation snap
    useEffect(() => {
        if (!animate) {
            // Force a reflow then re-enable
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setAnimate(true);
                });
            });
        }
    }, [animate]);

    const advance = useCallback((dir) => {
        if (isTransitioning.current) return;
        isTransitioning.current = true;
        setAnimate(true);
        setPos(p => p + dir);
    }, []);

    // GSAP heading
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(headingRef.current, {
                opacity: 0, y: 60, duration: 0.6, ease: 'power3.out',
                scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    // Auto-advance
    useEffect(() => {
        autoTimer.current = setInterval(() => {
            if (!isPaused.current) advance(1);
        }, AUTO_INTERVAL);
        return () => {
            clearInterval(autoTimer.current);
            if (resumeTimer.current) clearTimeout(resumeTimer.current);
        };
    }, [advance]);

    const pause = useCallback(() => {
        isPaused.current = true;
        if (resumeTimer.current) clearTimeout(resumeTimer.current);
    }, []);

    const resumeAfter = useCallback((ms) => {
        if (resumeTimer.current) clearTimeout(resumeTimer.current);
        resumeTimer.current = setTimeout(() => { isPaused.current = false; }, ms);
    }, []);

    // Touch swipe (mobile)
    const onTouchStart = useCallback((e) => {
        touchStartX.current = e.touches[0].clientX;
        pause();
    }, [pause]);

    const onTouchEnd = useCallback((e) => {
        if (touchStartX.current === null) return;
        const diff = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(diff) > 50) advance(diff < 0 ? 1 : -1);
        touchStartX.current = null;
        resumeAfter(5000);
    }, [advance, resumeAfter]);

    return (
        <section ref={sectionRef} style={styles.section}>
            <div className="container">
                <div ref={headingRef} style={styles.header}>
                    <span style={styles.label}>Success Stories</span>
                    <h2 style={styles.heading}>
                        Trusted by <span style={styles.headingAccent}>Competitive Athletes</span>
                    </h2>
                </div>
            </div>

            {/* Carousel */}
            <div
                style={styles.carouselOuter}
                onMouseEnter={pause}
                onMouseLeave={() => resumeAfter(2000)}
            >
                {/* Left arrow */}
                <button
                    style={{ ...styles.arrowBtn, ...styles.arrowLeft }}
                    className="testimonial-arrow"
                    onClick={() => { advance(-1); pause(); resumeAfter(3000); }}
                    aria-label="Previous testimonial"
                >
                    <FaChevronLeft size={16} />
                </button>

                {/* Track viewport */}
                <div
                    style={styles.viewport}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    <div
                        ref={trackRef}
                        className="testimonial-track"
                        style={{
                            ...styles.track,
                            transform: `translateX(${getTranslateX()}px)`,
                            transition: animate ? 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
                        }}
                        onTransitionEnd={handleTransitionEnd}
                    >
                        {tripled.map((review, i) => (
                            <div key={i} className="tcard" style={styles.card}>
                                <span style={styles.quoteMark}>&ldquo;</span>
                                <div style={styles.cardBody}>
                                    {review.text.split('\n\n').map((p, pi) => (
                                        <p key={pi} style={styles.cardText}>{p}</p>
                                    ))}
                                </div>
                                <div style={styles.cardFooter}>
                                    <h4 style={styles.cardName}>{review.name}</h4>
                                    <span style={styles.cardRole}>{review.role}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right arrow */}
                <button
                    style={{ ...styles.arrowBtn, ...styles.arrowRight }}
                    className="testimonial-arrow"
                    onClick={() => { advance(1); pause(); resumeAfter(3000); }}
                    aria-label="Next testimonial"
                >
                    <FaChevronRight size={16} />
                </button>
            </div>


            <style>{`
                .tcard {
                    flex: 0 0 calc((100% - ${GAP * 2}px) / 2.5);
                }
                @media (max-width: 1024px) {
                    .tcard {
                        flex: 0 0 calc((100% - ${GAP}px) / 1.8);
                    }
                }
                @media (max-width: 640px) {
                    .tcard {
                        flex: 0 0 85%;
                    }
                }
                .testimonial-arrow {
                    transition: background 0.2s ease, transform 0.2s ease;
                }
                .testimonial-arrow:hover {
                    background: rgba(255,255,255,0.15) !important;
                    transform: translateY(-50%) scale(1.1);
                }
                @media (max-width: 640px) {
                    .testimonial-arrow {
                        display: none !important;
                    }
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
    },
    headingAccent: {
        color: 'var(--primary)',
    },
    carouselOuter: {
        position: 'relative',
        padding: '0 clamp(2.5rem, 4vw, 4rem)',
    },
    viewport: {
        overflow: 'hidden',
    },
    track: {
        display: 'flex',
        gap: `${GAP}px`,
        alignItems: 'stretch',
    },
    card: {
        background: 'rgba(20, 20, 20, 0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: 'clamp(1.5rem, 3vw, 2rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        overflow: 'visible',
    },
    quoteMark: {
        fontSize: '2.5rem',
        fontFamily: 'Georgia, serif',
        color: 'var(--primary)',
        opacity: 0.4,
        lineHeight: 1,
        fontWeight: 'bold',
        flexShrink: 0,
    },
    cardBody: {
        flex: '1 1 auto',
    },
    cardText: {
        fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
        lineHeight: 1.75,
        color: 'rgba(255,255,255,0.85)',
        fontStyle: 'italic',
        margin: 0,
        marginBottom: '0.75rem',
    },
    cardFooter: {
        borderTop: '1px solid rgba(255,255,255,0.1)',
        paddingTop: '1rem',
        marginTop: 'auto',
        flexShrink: 0,
    },
    cardName: {
        margin: 0,
        marginBottom: '0.2rem',
        fontSize: '1rem',
        fontWeight: 700,
        color: 'var(--white)',
        whiteSpace: 'normal',
        overflow: 'visible',
    },
    cardRole: {
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: 'var(--primary)',
    },
    arrowBtn: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10,
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.15)',
        background: 'rgba(20, 20, 20, 0.8)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    arrowLeft: {
        left: '0',
    },
    arrowRight: {
        right: '0',
    },
};

export default Testimonials;
