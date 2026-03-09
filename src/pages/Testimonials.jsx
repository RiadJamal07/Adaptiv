import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
    const reviews = [
        {
            name: "Samer",
            role: "Duathlete",
            text: "Over the past year, training with Omar has been truly transformative. Starting from zero fitness and no running experience, I progressed to running half marathons, cycling 100km, and competing in duathlons — goals I once thought were impossible.\n\nBeyond structured training plans, Omar stands out for his constant support, smart motivation, and ability to push at the right moments without crossing limits. His strong focus on injury prevention allows for consistent, safe progress. He adapts training to real-life demands, explains fitness metrics clearly, and shows exceptional professionalism, detail, and long-term commitment to athlete development."
        },
        {
            name: "Michel",
            role: "Runner & Cyclist",
            text: "I started working out with coach Omar with the goal of improving my running and cycling performance, and the progress since then has been very noticeable.\n\nMy fitness has steadily increased, the training program balances cycling and running workouts without causing burnout or injury. Since starting, I've seen real progress in my running pace and cycling power, and I feel much stronger and more efficient during longer efforts.\n\nOmar is always available for support and fast response whenever adjustments or advice are needed. His expertise and dedication to the long-term growth of athletes make him an exceptional coach."
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={styles.wrapper}
        >
            <div className="container">
                <h1 style={styles.sectionTitle}>Success Stories</h1>

                <div style={styles.grid}>
                    {reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
                            style={styles.card}
                        >
                            <span style={styles.quoteSymbol}>"</span>
                            <p style={styles.text}>
                                {review.text.split('\n\n').map((paragraph, i) => (
                                    <span key={i}>
                                        {i > 0 && <><br /><br /></>}
                                        {paragraph}
                                    </span>
                                ))}
                            </p>
                            <div style={styles.author}>
                                <h4 style={styles.authorName}>{review.name}</h4>
                                <span style={styles.role}>{review.role}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const styles = {
    wrapper: {
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(3rem, 8vh, 6rem) 0',
    },
    sectionTitle: {
        textAlign: 'center',
        marginBottom: 'clamp(2rem, 5vh, 4rem)',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
        gap: 'clamp(1.5rem, 3vw, 2rem)',
        maxWidth: '1000px',
        margin: '0 auto',
    },
    card: {
        position: 'relative',
        background: 'rgba(20, 20, 20, 0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: 'clamp(1.5rem, 3vw, 2.5rem)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    quoteSymbol: {
        position: 'absolute',
        top: '0.5rem',
        left: '0.75rem',
        fontSize: '3rem',
        fontFamily: 'Georgia, serif',
        color: 'var(--primary)',
        opacity: 0.25,
        lineHeight: 1.1,
        pointerEvents: 'none',
        fontWeight: 'bold',
    },
    text: {
        fontStyle: 'italic',
        fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
        lineHeight: '1.7',
        marginBottom: '1.5rem',
        color: 'rgba(255,255,255,0.85)',
    },
    author: {
        borderTop: '1px solid rgba(255,255,255,0.1)',
        paddingTop: '1rem',
    },
    authorName: {
        margin: 0,
        marginBottom: '0.25rem',
    },
    role: {
        color: 'var(--primary)',
        fontSize: '0.9rem',
        fontWeight: 'bold',
    },
};

export default Testimonials;
