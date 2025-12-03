import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Custom hook for magnetic effect on elements
 * @param {Object} options - Configuration options
 * @param {number} options.strength - Pull strength factor (0-1, default: 0.3)
 * @param {number} options.pullRadius - Radius within which the effect works (default: null for full element)
 * @param {number} options.moveDuration - Duration of the movement animation (default: 0.3)
 * @param {number} options.returnDuration - Duration of the return animation (default: 0.5)
 * @param {string} options.moveEase - GSAP ease for movement (default: 'power2.out')
 * @param {string} options.returnEase - GSAP ease for return (default: 'elastic.out(1, 0.3)')
 * @param {boolean} options.listenOnParent - Listen to mousemove on parent element (default: false)
 * @returns {Object} - Object containing ref to attach to the element
 */
const useMagneticEffect = (options = {}) => {
    const {
        strength = 0.3,
        pullRadius = null,
        moveDuration = 0.3,
        returnDuration = 0.5,
        moveEase = 'power2.out',
        returnEase = 'elastic.out(1, 0.3)',
        listenOnParent = false,
    } = options;

    const elementRef = useRef(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const handleMouseMove = (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // If pullRadius is specified, only apply effect within that radius
            if (pullRadius !== null) {
                const distance = Math.sqrt(x * x + y * y);
                if (distance >= pullRadius) return;
            }

            gsap.to(element, {
                x: x * strength,
                y: y * strength,
                duration: moveDuration,
                ease: moveEase,
            });
        };

        const handleMouseLeave = () => {
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: returnDuration,
                ease: returnEase,
            });
        };

        // Listen to events on parent element if specified, otherwise on the element itself
        const eventTarget = listenOnParent ? element.parentElement : element;

        if (eventTarget) {
            eventTarget.addEventListener('mousemove', handleMouseMove);
            element.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (eventTarget) {
                eventTarget.removeEventListener('mousemove', handleMouseMove);
                element.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, [strength, pullRadius, moveDuration, returnDuration, moveEase, returnEase, listenOnParent]);

    return { ref: elementRef };
};

export default useMagneticEffect;
