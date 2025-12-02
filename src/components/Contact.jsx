import React from 'react';
import { FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
    return (
        <section id="contact" style={styles.section}>
            <div className="container" style={{ textAlign: 'center' }}>
                <h2>Ready to Adapt?</h2>
                <p style={{ maxWidth: '600px', margin: '0 auto 2rem auto' }}>
                    Whether you're training for your next triathlon or looking to improve your lifestyle,
                    let's work together to reach your goals.
                </p>

                <div style={styles.links}>
                    <a href="mailto:omar@example.com" style={styles.linkItem}>
                        <FaEnvelope size={30} />
                        <span>Email Me</span>
                    </a>
                    <a href="https://wa.me/1234567890" style={styles.linkItem}>
                        <FaWhatsapp size={30} />
                        <span>WhatsApp</span>
                    </a>
                    <a href="https://instagram.com" style={styles.linkItem}>
                        <FaInstagram size={30} />
                        <span>Instagram</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div className="container">
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                    &copy; {new Date().getFullYear()} Adaptiv / Omar Zaatiti. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

const styles = {
    section: {
        backgroundColor: 'var(--dark)',
        padding: '5rem 0',
    },
    links: {
        display: 'flex',
        justifyContent: 'center',
        gap: '3rem',
        marginTop: '2rem',
        flexWrap: 'wrap',
    },
    linkItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        color: 'var(--white)',
        fontSize: '1.1rem',
        transition: 'color 0.3s ease',
    },
    footer: {
        backgroundColor: '#111',
        padding: '2rem 0',
        textAlign: 'center',
        borderTop: '1px solid #333',
    }
};

export { Contact, Footer };
