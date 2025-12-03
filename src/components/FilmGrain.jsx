import React from 'react';

const FilmGrain = () => {
    return (
        <>
            <style>{`
                @keyframes grainShift {
                    0%, 100% { transform: translate(0, 0); }
                    25% { transform: translate(-8px, 8px); }
                    50% { transform: translate(8px, -8px); }
                    75% { transform: translate(-8px, 8px); }
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
        opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        animation: 'grainShift 1.6s steps(4) infinite',
    },
};

export default FilmGrain;
