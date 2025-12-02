import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const MagneticButton = ({ children, className = '', style = {}, onClick, strength = 0.5 }) => {
    const buttonRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const button = buttonRef.current;
        const text = textRef.current;
        if (!button) return;

        const handleMouseMove = (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(button, {
                x: x * strength,
                y: y * strength,
                duration: 0.4,
                ease: 'power2.out',
            });

            if (text) {
                gsap.to(text, {
                    x: x * strength * 0.5,
                    y: y * strength * 0.5,
                    duration: 0.4,
                    ease: 'power2.out',
                });
            }
        };

        const handleMouseLeave = () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: 'elastic.out(1, 0.3)',
            });

            if (text) {
                gsap.to(text, {
                    x: 0,
                    y: 0,
                    duration: 0.7,
                    ease: 'elastic.out(1, 0.3)',
                });
            }
        };

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mousemove', handleMouseMove);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength]);

    return (
        <button
            ref={buttonRef}
            className={className}
            style={{ ...styles.button, ...style }}
            onClick={onClick}
        >
            <span ref={textRef} style={styles.text}>
                {children}
            </span>
        </button>
    );
};

const styles = {
    button: {
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.2rem 2.5rem',
        fontSize: '1rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '2px',
        backgroundColor: 'var(--primary)',
        color: 'var(--white)',
        border: 'none',
        cursor: 'pointer',
        overflow: 'hidden',
    },
    text: {
        display: 'inline-block',
        position: 'relative',
        zIndex: 1,
    },
};

export default MagneticButton;
