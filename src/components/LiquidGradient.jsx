import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const LiquidGradient = () => {
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const blob3Ref = useRef(null);

  useEffect(() => {
    const blob1 = blob1Ref.current;
    const blob2 = blob2Ref.current;
    const blob3 = blob3Ref.current;

    // Subtle animation for blob 1 - top right area
    gsap.to(blob1, {
      x: '15vw',
      y: '10vh',
      duration: 25,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    // Subtle animation for blob 2 - center left area
    gsap.to(blob2, {
      x: '-12vw',
      y: '15vh',
      duration: 28,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 1,
    });

    // Subtle animation for blob 3 - bottom center area
    gsap.to(blob3, {
      x: '8vw',
      y: '-12vh',
      duration: 22,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 2,
    });
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Blob 1 - Top Right */}
      <div
        ref={blob1Ref}
        style={{
          position: 'absolute',
          top: '10%',
          right: '15%',
          width: '40vw',
          height: '40vw',
          background: 'radial-gradient(circle, var(--primary, #E1522F) 0%, transparent 70%)',
          filter: 'blur(90px)',
          opacity: 0.1,
          mixBlendMode: 'soft-light',
          willChange: 'transform',
        }}
      />

      {/* Blob 2 - Center Left */}
      <div
        ref={blob2Ref}
        style={{
          position: 'absolute',
          top: '45%',
          left: '10%',
          width: '45vw',
          height: '45vw',
          background: 'radial-gradient(circle, var(--primary, #E1522F) 0%, transparent 70%)',
          filter: 'blur(100px)',
          opacity: 0.08,
          mixBlendMode: 'screen',
          willChange: 'transform',
        }}
      />

      {/* Blob 3 - Bottom Center */}
      <div
        ref={blob3Ref}
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '38vw',
          height: '38vw',
          background: 'radial-gradient(circle, var(--primary, #E1522F) 0%, transparent 70%)',
          filter: 'blur(85px)',
          opacity: 0.09,
          mixBlendMode: 'soft-light',
          willChange: 'transform',
        }}
      />
    </div>
  );
};

export default LiquidGradient;
