import React from 'react';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';

const Testimonials = () => {
    const reviews = [
        { name: "Sarah J.", text: "Omar's training plan helped me shave 20 minutes off my marathon time!", role: "Marathoner" },
        { name: "Mike T.", text: "The cycling coaching is top notch. I've never felt stronger on the bike.", role: "Triathlete" },
        { name: "Emily R.", text: "Adapted physical activity sessions changed my son's life. Highly recommended.", role: "Parent" },
        { name: "David K.", text: "Professional, science-based, and incredibly supportive.", role: "Duathlete" }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
            <div className="container">
                <h1 style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vh, 4rem)' }}>Success Stories</h1>
            </div>

            <Marquee gradient={false} speed={40} pauseOnHover>
                {reviews.map((review, index) => (
                    <div key={index} style={styles.card}>
                        <p style={styles.text}>"{review.text}"</p>
                        <div style={styles.author}>
                            <h4>{review.name}</h4>
                            <span style={styles.role}>{review.role}</span>
                        </div>
                    </div>
                ))}
            </Marquee>

            <div style={{ height: '4rem' }}></div>

            <Marquee gradient={false} speed={30} direction="right" pauseOnHover>
                {reviews.map((review, index) => (
                    <div key={index} style={styles.card}>
                        <p style={styles.text}>"{review.text}"</p>
                        <div style={styles.author}>
                            <h4>{review.name}</h4>
                            <span style={styles.role}>{review.role}</span>
                        </div>
                    </div>
                ))}
            </Marquee>
        </motion.div>
    );
};

const styles = {
    card: {
        backgroundColor: 'var(--dark-lighter)',
        padding: 'clamp(1.25rem, 3vw, 2rem)',
        borderRadius: '15px',
        border: '1px solid rgba(255,255,255,0.1)',
        width: 'clamp(280px, 80vw, 350px)',
        margin: '0 clamp(0.75rem, 2vw, 1.5rem)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 'clamp(180px, 25vw, 200px)',
    },
    text: {
        fontStyle: 'italic',
        fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
        lineHeight: '1.5',
        marginBottom: '1.5rem',
    },
    author: {
        borderTop: '1px solid rgba(255,255,255,0.1)',
        paddingTop: '1rem',
    },
    role: {
        color: 'var(--primary)',
        fontSize: '0.9rem',
        fontWeight: 'bold',
    }
};

export default Testimonials;
