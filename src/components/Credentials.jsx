import React from 'react';
import Marquee from 'react-fast-marquee';
import { FaCertificate, FaGraduationCap } from 'react-icons/fa';

const Credentials = () => {
    const credentials = [
        "BA Adapted Physical Activity & Motricity",
        "Certified Cycling Coach (SSISA Academy)",
        "Certified Cycling Coach (UESCA Academy)",
        "Certified Running Coach (UESCA Academy)",
        "Certified World Triathlon Coach Level 1",
        "Certified Track & Field Coach (Performance First)"
    ];

    return (
        <section id="credentials" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)', padding: '4rem 0' }}>
            <div className="container" style={{ marginBottom: '2rem' }}>
                <h2 style={{ color: 'var(--white)', textAlign: 'center', margin: 0 }}>
                    Credentials & Certifications
                </h2>
            </div>

            <div style={styles.marqueeContainer}>
                <Marquee gradient={false} speed={50}>
                    {credentials.map((cred, index) => (
                        <div key={index} style={styles.item}>
                            <div style={styles.icon}>
                                {cred.includes('BA') ? <FaGraduationCap /> : <FaCertificate />}
                            </div>
                            <span>{cred}</span>
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    );
};

const styles = {
    marqueeContainer: {
        display: 'flex',
        alignItems: 'center',
        padding: '1rem 0',
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        margin: '0 2rem',
        fontWeight: '600',
        fontSize: '1.2rem',
        whiteSpace: 'nowrap',
    },
    icon: {
        fontSize: '1.5rem',
        opacity: 0.8,
    }
};

export default Credentials;
