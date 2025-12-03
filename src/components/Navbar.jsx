import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/adaptiv-logo.svg';
import useMagneticEffect from '../hooks/useMagneticEffect';

const MagneticLink = ({ children, href, onClick }) => {
    const { ref: linkRef } = useMagneticEffect({
        strength: 0.3,
        moveDuration: 0.2,
        returnDuration: 0.3,
    });

    return (
        <a
            ref={linkRef}
            href={href}
            onClick={onClick}
            style={styles.link}
            className="nav-link"
        >
            <span style={styles.linkText}>{children}</span>
            <span style={styles.linkLine} className="link-line" />
        </a>
    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const navRef = useRef(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    const links = [
        { name: 'Home', path: '#home' },
        { name: 'About', path: '#about' },
        { name: 'Services', path: '#services' },
        { name: 'Packages', path: '#packages' },
        { name: 'Testimonials', path: '#testimonials' },
        { name: 'Contact', path: '#contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Calculate scroll progress
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e, path) => {
        e.preventDefault();
        const element = document.querySelector(path);
        if (element) {
            const navHeight = 80;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navHeight;

            window.scrollTo({
                top: path === '#home' ? 0 : offsetPosition,
                behavior: 'smooth'
            });
            setIsOpen(false);
        }
    };

    return (
        <motion.nav
            ref={navRef}
            style={{
                ...styles.nav,
                backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.9)' : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
            }}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="container" style={styles.container}>
                <motion.a
                    href="#home"
                    onClick={(e) => handleNavClick(e, '#home')}
                    style={styles.logoContainer}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <img src={logo} alt="Adaptiv" style={styles.logo} />
                </motion.a>

                {/* Desktop Menu */}
                <ul className="desktop-menu" style={styles.desktopMenu}>
                    {links.map((link) => (
                        <li key={link.name}>
                            <MagneticLink
                                href={link.path}
                                onClick={(e) => handleNavClick(e, link.path)}
                            >
                                {link.name}
                            </MagneticLink>
                        </li>
                    ))}
                </ul>

                {/* Mobile Hamburger */}
                <motion.div
                    className="mobile-hamburger"
                    onClick={toggleMenu}
                    style={styles.hamburger}
                    whileTap={{ scale: 0.9 }}
                >
                    {isOpen ? <FaTimes size={24} color="#fff" /> : <FaBars size={24} color="#fff" />}
                </motion.div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
                            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            style={styles.mobileMenu}
                        >
                            {links.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={link.path}
                                    onClick={(e) => handleNavClick(e, link.path)}
                                    style={styles.mobileLink}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.06, duration: 0.2 }}
                                >
                                    <span style={styles.mobileLinkNumber}>0{i + 1}</span>
                                    {link.name}
                                </motion.a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Scroll Progress Bar */}
            <div
                style={{
                    ...styles.progressBar,
                    transform: `scaleX(${scrollProgress / 100})`,
                }}
            />
        </motion.nav>
    );
};

const styles = {
    nav: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: 'var(--nav-height, 80px)',
        zIndex: 1000,
        transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        padding: '0 clamp(1rem, 4vw, 2rem)',
        maxWidth: '1400px',
        margin: '0 auto',
    },
    logoContainer: {
        height: 'clamp(35px, 6vw, 50px)',
        cursor: 'pointer',
        display: 'block',
    },
    logo: {
        height: '100%',
        objectFit: 'contain',
    },
    desktopMenu: {
        display: 'flex',
        gap: '2.5rem',
        listStyle: 'none',
    },
    link: {
        position: 'relative',
        fontWeight: 500,
        textTransform: 'uppercase',
        fontSize: '0.85rem',
        letterSpacing: '1px',
        color: '#fff',
        textDecoration: 'none',
        cursor: 'pointer',
        display: 'inline-block',
        padding: '0.5rem 0',
    },
    linkText: {
        position: 'relative',
        zIndex: 1,
    },
    linkLine: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '2px',
        backgroundColor: 'var(--primary)',
        transform: 'scaleX(0)',
        transformOrigin: 'right',
        transition: 'transform 0.3s ease',
    },
    hamburger: {
        cursor: 'pointer',
    },
    mobileMenu: {
        position: 'fixed',
        top: 'var(--nav-height, 60px)',
        left: 0,
        width: '100%',
        height: 'calc(100vh - var(--nav-height, 60px))',
        backgroundColor: 'rgba(0,0,0,0.98)',
        padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1rem, 4vw, 2rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(1rem, 3vw, 1.5rem)',
        overflowY: 'auto',
    },
    mobileLink: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        fontSize: 'clamp(1.5rem, 5vw, 2rem)',
        fontWeight: 700,
        color: '#fff',
        textDecoration: 'none',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        minHeight: '44px',
    },
    mobileLinkNumber: {
        fontSize: '0.9rem',
        color: 'var(--primary)',
        fontWeight: 400,
    },
    progressBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '2px',
        background: 'var(--primary)',
        transformOrigin: 'left',
        transition: 'transform 0.1s linear',
    },
};

// Add CSS for hover effect
if (typeof document !== 'undefined') {
    const styleId = 'navbar-styles';
    if (!document.getElementById(styleId)) {
        const styleSheet = document.createElement('style');
        styleSheet.id = styleId;
        styleSheet.textContent = `
            .nav-link:hover .link-line {
                transform: scaleX(1);
                transform-origin: left;
            }
        `;
        document.head.appendChild(styleSheet);
    }
}

export default Navbar;
