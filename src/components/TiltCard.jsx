import React, { forwardRef } from 'react';
import useTiltEffect from '../hooks/useTiltEffect';

/**
 * A wrapper component that applies 3D tilt effect to its children
 */
const TiltCard = forwardRef(({ children, className, style, ...props }, forwardedRef) => {
    const { ref: tiltRef } = useTiltEffect({
        maxTilt: 15,
        perspective: 1000,
        moveDuration: 0.3,
        returnDuration: 0.4,
    });

    // Combine refs using callback ref
    const setRefs = (element) => {
        tiltRef.current = element;
        if (forwardedRef) {
            if (typeof forwardedRef === 'function') {
                forwardedRef(element);
            } else {
                forwardedRef.current = element;
            }
        }
    };

    return (
        <div ref={setRefs} className={className} style={style} {...props}>
            {children}
        </div>
    );
});

TiltCard.displayName = 'TiltCard';

export default TiltCard;
