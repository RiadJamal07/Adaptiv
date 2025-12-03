import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Custom hook for 3D tilt effect on elements
 * @param {Object} options - Configuration options
 * @param {number} options.maxTilt - Maximum tilt angle in degrees (default: 15)
 * @param {number} options.perspective - Perspective value (default: 1000)
 * @param {number} options.moveDuration - Duration of the tilt animation (default: 0.5)
 * @param {number} options.returnDuration - Duration of the return animation (default: 0.6)
 * @param {string} options.moveEase - GSAP ease for movement (default: 'power2.out')
 * @param {string} options.returnEase - GSAP ease for return (default: 'elastic.out(1, 0.3)')
 * @returns {Object} - Object containing ref to attach to the element
 */
const useTiltEffect = (options = {}) => {
    const {
        maxTilt = 15,
        perspective = 1000,
        moveDuration = 0.5,
        returnDuration = 0.6,
        moveEase = 'power2.out',
        returnEase = 'elastic.out(1, 0.3)',
    } = options;

    const elementRef = useRef(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const handleMouseMove = (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -maxTilt;
            const rotateY = ((x - centerX) / centerX) * maxTilt;

            gsap.to(element, {
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: perspective,
                duration: moveDuration,
                ease: moveEase,
            });
        };

        const handleMouseLeave = () => {
            gsap.to(element, {
                rotateX: 0,
                rotateY: 0,
                duration: returnDuration,
                ease: returnEase,
            });
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [maxTilt, perspective, moveDuration, returnDuration, moveEase, returnEase]);

    return { ref: elementRef };
};

export default useTiltEffect;
