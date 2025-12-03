import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const cursorDotRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [cursorText, setCursorText] = useState('');
    const [cursorState, setCursorState] = useState('default'); // default, link, image, drag

    useEffect(() => {
        const cursor = cursorRef.current;
        const cursorDot = cursorDotRef.current;
        if (!cursor || !cursorDot) return;

        // Check if device has coarse pointer (touch device)
        const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
        if (isTouchDevice) {
            cursor.style.display = 'none';
            cursorDot.style.display = 'none';
            return;
        }

        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Instant dot movement
            gsap.set(cursorDot, {
                x: mouseX,
                y: mouseY,
            });

            // Smooth cursor follow
            gsap.to(cursor, {
                x: mouseX,
                y: mouseY,
                duration: 0.5,
                ease: 'power2.out',
            });
        };

        const handleMouseEnter = (e) => {
            const target = e.target;
            if (!target || !target.matches) return;

            // Check for images
            if (target.matches('img, [data-cursor="image"]')) {
                setIsHovering(true);
                setCursorState('image');
                gsap.to(cursor, {
                    scale: 2.5,
                    duration: 0.3,
                    ease: 'power2.out',
                });
                gsap.to(cursorDot, {
                    scale: 0,
                    duration: 0.3,
                });
            }
            // Check for draggable elements
            else if (target.matches('[data-cursor="drag"]')) {
                setIsHovering(true);
                setCursorState('drag');
                setCursorText('DRAG');
                gsap.to(cursor, {
                    scale: 3,
                    duration: 0.3,
                    ease: 'power2.out',
                });
                gsap.to(cursorDot, {
                    scale: 0,
                    duration: 0.3,
                });
            }
            // Check for links/buttons
            else if (target.matches('a, button, [data-cursor="pointer"]')) {
                setIsHovering(true);
                setCursorState('link');
                gsap.to(cursor, {
                    scaleX: 2.2,
                    scaleY: 1.8,
                    duration: 0.3,
                    ease: 'power2.out',
                });
                gsap.to(cursorDot, {
                    scale: 0,
                    duration: 0.3,
                });
            }

            // Check for custom text
            if (target.dataset.cursorText && !target.matches('[data-cursor="drag"]')) {
                setCursorText(target.dataset.cursorText);
                gsap.to(cursor, {
                    scale: 3,
                    duration: 0.3,
                });
            }
        };

        const handleMouseLeave = (e) => {
            const target = e.target;
            if (!target || !target.matches) return;

            if (target.matches('a, button, img, [data-cursor="pointer"], [data-cursor="drag"], [data-cursor="image"]')) {
                setIsHovering(false);
                setCursorState('default');
                setCursorText('');
                gsap.to(cursor, {
                    scale: 1,
                    scaleX: 1,
                    scaleY: 1,
                    duration: 0.3,
                    ease: 'power2.out',
                });
                gsap.to(cursorDot, {
                    scale: 1,
                    duration: 0.3,
                });
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseenter', handleMouseEnter, true);
        document.addEventListener('mouseleave', handleMouseLeave, true);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseenter', handleMouseEnter, true);
            document.removeEventListener('mouseleave', handleMouseLeave, true);
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                style={{
                    ...styles.cursor,
                    backgroundColor: isHovering ? 'var(--primary)' : 'transparent',
                    borderColor: isHovering ? 'var(--primary)' : 'var(--white)',
                    mixBlendMode: cursorState === 'image' ? 'difference' : (isHovering ? 'normal' : 'normal'),
                    borderRadius: cursorState === 'link' ? '20px' : '50%',
                }}
            >
                {cursorText && <span style={styles.cursorText}>{cursorText}</span>}
                {cursorState === 'drag' && !cursorText && (
                    <span style={styles.dragIndicator}>⇄</span>
                )}
            </div>
            <div ref={cursorDotRef} style={styles.cursorDot} />
        </>
    );
};

const styles = {
    cursor: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '1px solid var(--white)',
        pointerEvents: 'none',
        zIndex: 99999,
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.3s, border-color 0.3s',
    },
    cursorDot: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: 'var(--primary)',
        pointerEvents: 'none',
        zIndex: 99999,
        transform: 'translate(-50%, -50%)',
    },
    cursorText: {
        fontSize: '8px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: 'var(--white)',
    },
    dragIndicator: {
        fontSize: '16px',
        fontWeight: 700,
        color: 'var(--white)',
        transform: 'rotate(0deg)',
        display: 'inline-block',
    },
};

export default CustomCursor;
