import React from 'react';
import { motion } from 'framer-motion';
import aboutImg from '../assets/about.jpg';
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';

const SplitScreenAbout = () => {
    return (
        <section style={styles.section}>
            <div className="container" style={styles.container}>
                {/* Left: Sticky Content */}
                <div style={styles.leftCol}>
                    <div style={styles.stickyContent}>
                        <motion.h2
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            style={styles.heading}
                        >
                            About Omar
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <p style={styles.text}>
                                Omar Zaatiti is a dedicated endurance coach and athlete with a passion for unlocking human potential.
                            </p>
                            <p style={styles.text}>
                                With a background in Adapted Physical Activity and certifications from world-class academies, Omar combines science-based training with a deep understanding of individual needs.
                            </p>
                            <p style={styles.text}>
                                Whether you are a triathlete aiming for the podium or someone looking to reclaim their health, Omar's philosophy is simple: <strong>Adapt and Overcome.</strong>
                            </p>
                        </motion.div>

                        {/* Timeline */}
                        <div style={styles.timeline}>
                            <div style={styles.timelineItem}>
                                <div style={styles.dot}></div>
                                <span>BA Adapted Physical Activity</span>
                            </div>
                            <div style={styles.timelineItem}>
                                <div style={styles.dot}></div>
                                <span>SSISA & UESCA Certified</span>
                            </div>
                            <div style={styles.timelineItem}>
                                <div style={styles.dot}></div>
                                <span>World Triathlon Level 1</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Scrolling Images */}
                <div style={styles.rightCol}>
                    <img src={aboutImg} alt="Omar Portrait" style={styles.image} />
                    <img src={img1} alt="Training" style={styles.image} />
                    <img src={img2} alt="Cycling" style={styles.image} />
                    <img src={img3} alt="Running" style={styles.image} />
                </div>
            </div>
        </section>
    );
};

const styles = {
    section: {
        padding: '4rem 0',
        backgroundColor: '#222',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        gap: '4rem',
        position: 'relative',
    },
    leftCol: {
        flex: 1,
        position: 'relative',
    },
    stickyContent: {
        position: 'sticky',
        top: '120px', // Below navbar
        paddingBottom: '4rem',
    },
    rightCol: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
    },
    heading: {
        fontSize: '3rem',
        marginBottom: '2rem',
        color: 'var(--primary)',
    },
    text: {
        marginBottom: '1.5rem',
        fontSize: '1.1rem',
        lineHeight: '1.6',
        color: '#ccc',
    },
    image: {
        width: '100%',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    },
    timeline: {
        marginTop: '3rem',
        borderLeft: '2px solid var(--primary)',
        paddingLeft: '1.5rem',
    },
    timelineItem: {
        marginBottom: '1.5rem',
        position: 'relative',
        fontWeight: 'bold',
        color: '#fff',
    },
    dot: {
        position: 'absolute',
        left: '-1.9rem',
        top: '0.2rem',
        width: '12px',
        height: '12px',
        backgroundColor: 'var(--primary)',
        borderRadius: '50%',
    }
};

export default SplitScreenAbout;
