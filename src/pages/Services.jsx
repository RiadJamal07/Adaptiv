import React from 'react';
import ServicesComponent from '../components/Services';
import { motion } from 'framer-motion';

const Services = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ paddingTop: '80px' }}
        >
            <ServicesComponent />
            {/* Expanded content will go here */}
            <div className="container" style={{ padding: '4rem 0' }}>
                <h2>Detailed Programs</h2>
                <p>Coming soon: Detailed breakdown of Duathlon, Cycling, Running, and S&C programs.</p>
            </div>
        </motion.div>
    );
};

export default Services;
