import React from 'react';
import { motion } from 'framer-motion';
import aboutImg from '../assets/about.jpg';

const About = () => {
    return (
        <section id="about" style={styles.section}>
            <div className="container" style={styles.container}>
                <motion.div
                    style={styles.imageContainer}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <img src={aboutImg} alt="Omar Coaching" style={styles.image} />
                </motion.div>

                <motion.div
                    style={styles.content}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Meet Omar Zaatiti</h2>
                    <p>
                        I’m a duathlete and performance coach dedicated to helping athletes unlock their full potential.
                        With over seven years in the sport—competing, learning, and coaching—I’ve built my approach on
                        <strong> science-based training</strong>, attention to detail, and a deep understanding of how athletes move, think, and grow.
                    </p>
                    <p>
                        I hold a university degree in <strong>Adapted Physical Activity</strong>, which gave me the opportunity to work closely with kids with special needs.
                        This experience taught me how to tailor sessions to any level of understanding and physical ability.
                    </p>
                    <p>
                        Alongside coaching, I train 16+ hours a week as a competitive duathlete, constantly refining my own craft so I can guide others with experience, not just theory.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

const styles = {
    section: {
        backgroundColor: 'var(--dark-lighter)',
    },
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '4rem',
        alignItems: 'center',
    },
    imageContainer: {
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
    },
    image: {
        width: '100%',
        height: 'auto',
        display: 'block',
    },
    content: {
        textAlign: 'left',
    }
};

export default About;
