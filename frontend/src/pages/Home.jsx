import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import heroImage from '../assets/hero-image.jpg';
import Features from '../components/Features';
import Specifications from '../components/Specifications';
import Footer from '../components/common/Footer';

const Home = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
            {/* Hero section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
                <div className="flex flex-col lg:flex-row justify-between items-center">
                    <motion.div 
                        className="lg:w-1/2 space-y-6"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h2 
                            className="text-5xl md:text-6xl font-bold text-white leading-tight"
                            variants={fadeInUp}
                        >
                            Is Your Helmet Just a Bucket... 
                            <span className="text-yellow-400">or a Lifesaver?</span>
                        </motion.h2>
                        
                        <motion.p 
                            className="text-lg text-gray-300 leading-relaxed"
                            variants={fadeInUp}
                        >
                            Standard helmets? Yesterday's tech. The MINDSHIELD helmet is the
                            revolution. Collision detection built-in, ready to react faster than
                            human reflexes when disaster strikes. A built-in emergency SOS system
                            instantly connects you to help, because seconds matter. Don't be a
                            statistic.
                        </motion.p>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link to="/preorder">
                                <button className="group flex items-center gap-2 px-8 py-4 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition-all">
                                    Pre-order Now
                                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="lg:w-1/2 mt-12 lg:mt-0 px-4"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.img
                            src={heroImage}
                            alt="Smart helmet"
                            className="w-full rounded-2xl shadow-2xl"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        />
                    </motion.div>
                </div>
            </div>

            {/* Features section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <Features />
            </motion.div>

            {/* Specifications */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <Specifications />
            </motion.div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Home;