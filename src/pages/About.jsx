import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import img3 from '../assets/3.jpg';

const About = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const textRefs = useRef([]);
    const imageRef = useRef(null);
    const imageRevealRef = useRef(null);
    const statRefs = useRef([]);

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

            // Animated stat counters
            statRefs.current.forEach((stat) => {
                if (!stat) return;
                const target = parseInt(stat.dataset.value);
                const suffix = stat.dataset.suffix || '';

                gsap.fromTo(stat,
                    { innerText: 0 },
                    {
                        innerText: target,
                        duration: 1.2,
                        ease: 'power2.out',
                        snap: { innerText: 1 },
                        scrollTrigger: {
                            trigger: stat,
                            start: 'top 85%',
                        },
                        onUpdate: function() {
                            stat.innerText = Math.round(this.targets()[0].innerText) + suffix;
                        }
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} style={styles.container}>
            <div className="container" style={styles.content}>
                <div style={styles.row}>
                    <div style={styles.textColumn}>
                        <h2 ref={headingRef} style={styles.heading}>About Omar</h2>

                        <p ref={el => textRefs.current[0] = el} style={styles.text}>
                            With over a decade of experience in endurance sports, Omar Zaatiti
                            has transformed hundreds of athletes through personalized coaching
                            and data-driven training methodologies.
                        </p>

                        <p ref={el => textRefs.current[1] = el} style={styles.text}>
                            His approach combines cutting-edge sports science with practical,
                            sustainable training plans that fit into your lifestyle.
                        </p>

                        <p ref={el => textRefs.current[2] = el} style={styles.text}>
                            Whether you're a beginner looking to complete your first race or an
                            experienced athlete chasing personal records, Omar's coaching adapts
                            to your unique goals and circumstances.
                        </p>

                        <div ref={el => textRefs.current[3] = el} style={styles.stats}>
                            <div style={styles.stat}>
                                <span
                                    ref={el => statRefs.current[0] = el}
                                    data-value="10"
                                    data-suffix="+"
                                    style={styles.statNumber}
                                >0+</span>
                                <span style={styles.statLabel}>Years Experience</span>
                            </div>
                            <div style={styles.stat}>
                                <span
                                    ref={el => statRefs.current[1] = el}
                                    data-value="500"
                                    data-suffix="+"
                                    style={styles.statNumber}
                                >0+</span>
                                <span style={styles.statLabel}>Athletes Coached</span>
                            </div>
                            <div style={styles.stat}>
                                <span
                                    ref={el => statRefs.current[2] = el}
                                    data-value="50"
                                    data-suffix="+"
                                    style={styles.statNumber}
                                >0+</span>
                                <span style={styles.statLabel}>Race Wins</span>
                            </div>
                        </div>
                    </div>

                    <div ref={imageRef} style={styles.imageColumn}>
                        <div ref={imageRevealRef} style={styles.imageWrapper}>
                            <img
                                src={img3}
                                alt="Omar Zaatiti"
                                style={styles.image}
                            />
                        </div>
                    </div>
                </div>
            </div>
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
    stats: {
        display: 'flex',
        gap: '2rem',
        marginTop: '2rem',
        flexWrap: 'wrap',
    },
    stat: {
        display: 'flex',
        flexDirection: 'column',
    },
    statNumber: {
        fontSize: '3rem',
        fontWeight: 800,
        color: 'var(--primary)',
        lineHeight: 1.1,
    },
    statLabel: {
        fontSize: '0.9rem',
        color: 'rgba(255,255,255,0.85)',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        marginTop: '0.5rem',
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
};

export default About;
