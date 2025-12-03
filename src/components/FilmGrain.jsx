import React from 'react';

const FilmGrain = () => {
    return (
        <>
            <style>{`
                @keyframes grainShift {
                    0%, 100% { transform: translate(0, 0); }
                    10% { transform: translate(-5px, 10px); }
                    20% { transform: translate(10px, 5px); }
                    30% { transform: translate(-10px, -5px); }
                    40% { transform: translate(5px, -10px); }
                    50% { transform: translate(-15px, 15px); }
                    60% { transform: translate(15px, -15px); }
                    70% { transform: translate(-5px, 5px); }
                    80% { transform: translate(10px, -10px); }
                    90% { transform: translate(-10px, 10px); }
                }
            `}</style>
            <div style={styles.grain} aria-hidden="true" />
        </>
    );
};

const styles = {
    grain: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0.035,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        animation: 'grainShift 0.8s steps(10) infinite',
        willChange: 'transform',
    },
};

export default FilmGrain;
