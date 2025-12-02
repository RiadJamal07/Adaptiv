import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const QuoteInterstitial = ({ text, highlightWords = [] }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.05, 0.8]);

    const words = text.split(' ');

    return (
        <section ref={containerRef} style={styles.section}>
            <motion.div
                style={{
                    ...styles.content,
                    y,
                    opacity,
                    scale
                }}
            >
                <h1 style={styles.quote}>
                    {words.map((word, i) => {
                        const isHighlight = highlightWords.includes(word.toLowerCase().replace(/[.,!?]/g, ''));
                        return (
                            <motion.span
                                key={i}
                                style={{
                                    ...styles.word,
                                    color: isHighlight ? 'var(--primary)' : 'var(--white)',
                                    WebkitTextStroke: isHighlight ? '0' : '1px rgba(255,255,255,0.3)',
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.8 }}
                                transition={{
                                    duration: 0.8,
                                    delay: i * 0.05,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                            >
                                {word}{' '}
                            </motion.span>
                        );
                    })}
                </h1>
            </motion.div>
        </section>
    );
};

const styles = {
    section: {
        minHeight: 'clamp(50vh, 70vh, 80vh)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        overflow: 'hidden',
        position: 'relative',
        padding: 'clamp(2rem, 5vh, 4rem) clamp(1rem, 5vw, 8rem)',
    },
    content: {
        textAlign: 'center',
        maxWidth: '1400px',
        width: '100%',
    },
    quote: {
        fontSize: 'clamp(1.75rem, 6vw, 8rem)',
        fontWeight: '800',
        lineHeight: '1.15',
        textTransform: 'uppercase',
        fontFamily: "'Montserrat', sans-serif",
        fontStyle: 'normal',
        letterSpacing: '-0.02em',
    },
    word: {
        display: 'inline-block',
        marginRight: '0.3em',
    }
};

export default QuoteInterstitial;
