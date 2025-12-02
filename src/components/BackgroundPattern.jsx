import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const BackgroundPattern = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const x = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <div ref={containerRef} style={styles.container}>
            <motion.div style={{ ...styles.pattern, x, y }}>
                {[...Array(20)].map((_, i) => (
                    <div key={i} style={styles.row}>
                        {[...Array(10)].map((_, j) => (
                            <svg
                                key={j}
                                width="200"
                                height="80"
                                viewBox="0 0 200 80"
                                style={styles.slash}
                            >
                                <path
                                    d="M 40,10 L 100,10 L 160,70 L 100,70 Z"
                                    fill="var(--primary)"
                                    opacity="0.15"
                                />
                            </svg>
                        ))}
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

const styles = {
    container: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
    },
    pattern: {
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        display: 'flex',
        flexDirection: 'column',
        transform: 'rotate(-25deg)',
    },
    row: {
        display: 'flex',
        gap: '4rem',
        marginBottom: '3rem',
    },
    slash: {
        flexShrink: 0,
    }
};

export default BackgroundPattern;
