import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCog, FaPalette } from 'react-icons/fa';

const themes = [
    { name: 'Volcano', primary: '#E1522F', bg: '#222222', text: '#ffffff' },
    { name: 'Neon', primary: '#CCFF00', bg: '#0a0a0a', text: '#ffffff' },
    { name: 'Ocean', primary: '#00F0FF', bg: '#051a24', text: '#ffffff' },
    { name: 'Crimson', primary: '#FF003C', bg: '#1a0505', text: '#ffffff' },
];

const ThemeSwitcher = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTheme, setActiveTheme] = useState(themes[0]);

    useEffect(() => {
        document.documentElement.style.setProperty('--primary', activeTheme.primary);
        document.documentElement.style.setProperty('--bg-color', activeTheme.bg);
        document.documentElement.style.setProperty('--text-color', activeTheme.text);

        // Update derived colors
        document.documentElement.style.setProperty('--primary-dim', `${activeTheme.primary}40`);
    }, [activeTheme]);

    return (
        <div style={styles.container}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        style={styles.panel}
                    >
                        <h4 style={styles.title}>Theme</h4>
                        <div style={styles.grid}>
                            {themes.map((theme) => (
                                <button
                                    key={theme.name}
                                    onClick={() => setActiveTheme(theme)}
                                    style={{
                                        ...styles.btn,
                                        backgroundColor: theme.primary,
                                        border: activeTheme.name === theme.name ? '2px solid white' : 'none'
                                    }}
                                    title={theme.name}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button onClick={() => setIsOpen(!isOpen)} style={styles.toggle}>
                <FaPalette size={20} color="#fff" />
            </button>
        </div>
    );
};

const styles = {
    container: {
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
        gap: '1rem',
    },
    toggle: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: 'var(--primary)',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
        transition: 'transform 0.2s',
    },
    panel: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(10px)',
        padding: '1rem',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.1)',
        marginBottom: '0.5rem',
    },
    title: {
        margin: '0 0 0.5rem 0',
        fontSize: '0.8rem',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: '#ccc',
    },
    grid: {
        display: 'flex',
        gap: '0.5rem',
    },
    btn: {
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        cursor: 'pointer',
    }
};

export default ThemeSwitcher;
