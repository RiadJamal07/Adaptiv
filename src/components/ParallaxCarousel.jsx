import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';
import img5 from '../assets/5.jpg';

const ParallaxCarousel = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    const images = [img1, img2, img3, img4, img5];

    return (
        <section ref={targetRef} style={styles.carouselSection}>
            <div style={styles.stickyContainer}>
                <motion.div style={{ ...styles.carousel, x }}>
                    {images.map((img, index) => (
                        <div key={index} style={styles.card}>
                            <img src={img} alt={`Gallery ${index + 1}`} style={styles.image} />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const styles = {
    carouselSection: {
        height: '300vh', // Tall section for scroll space
        position: 'relative',
        backgroundColor: '#111',
    },
    stickyContainer: {
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
    },
    carousel: {
        display: 'flex',
        gap: '4rem',
        paddingLeft: '5vw',
    },
    card: {
        width: '60vw',
        height: '70vh',
        flexShrink: 0,
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    }
};

export default ParallaxCarousel;
