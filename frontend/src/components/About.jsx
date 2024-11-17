import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const features = [
        {
            title: "Real-Time Tracking",
            description: "Stay connected with real-time location tracking, giving loved ones peace of mind while ensuring user safety with instant updates."
        },
        {
            title: "Collision Detection",
            description: "Equipped with sensors to detect impacts, instantly notifying emergency contacts and accelerating help when every second counts."
        },
        {
            title: "User Management",
            description: "Simplified user management to control access, monitor usage, and manage contacts, all from one convenient platform."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white py-20 px-4 sm:px-6 lg:px-8">
            <motion.div 
                className="max-w-6xl mx-auto space-y-16"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
            >
                {/* Header Section */}
                <motion.div
                    variants={fadeInUp}
                    className="text-center space-y-6"
                >
                    <motion.h1 
                        className="text-4xl md:text-6xl lg:text-7xl font-bold"
                        whileHover={{ scale: 1.05 }}
                    >
                        About <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">mindSHIELD</span>
                    </motion.h1>
                    <motion.p 
                        className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                        variants={fadeInUp}
                    >
                        mindSHIELD is engineered to elevate helmet safety by merging technology with intuitive design. With features like real-time tracking, 
                        collision detection, and user management, it provides a seamless, connected experience to ensure safety, convenience, and peace of mind.
                    </motion.p>
                </motion.div>

                {/* Vision Section */}
                <motion.div
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 p-12 rounded-3xl backdrop-blur-lg border border-blue-500/10 shadow-xl"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-6 text-center">Our Vision</h2>
                    <p className="text-xl text-gray-300 leading-relaxed text-center">
                        To create a safer riding experience for everyone by integrating smart technology with user-centered design, offering immediate 
                        assistance in emergencies and empowering riders with reliable protection.
                    </p>
                </motion.div>

                {/* Feature Section */}
                <motion.div 
                    className="grid md:grid-cols-3 gap-8"
                    variants={staggerContainer}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            whileHover={{ scale: 1.05, y: -10 }}
                            className="bg-gradient-to-br from-white to-gray-100 p-8 rounded-3xl shadow-xl"
                        >
                            <div className="text-center space-y-4">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                    {feature.title}
                                </h2>
                                <p className="text-gray-700">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Innovation Section */}
                <motion.div
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 p-12 rounded-3xl backdrop-blur-lg border border-blue-500/10 shadow-xl"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-6 text-center">Innovation and Technology</h2>
                    <p className="text-xl text-gray-300 leading-relaxed text-center">
                        mindSHIELD uses advanced IoT and sensor technologies for an intelligent, responsive experience. Regular updates and 
                        improvements ensure that users have the latest features to stay safe on every journey.
                    </p>
                </motion.div>

                {/* Closing Section */}
                <motion.div 
                    variants={fadeInUp}
                    className="text-center space-y-6 pt-10"
                >
                    <motion.p 
                        className="text-2xl text-gray-300"
                        whileHover={{ scale: 1.05 }}
                    >
                        Join us in making every journey safer and secure.
                    </motion.p>
                    <motion.p 
                        className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
                        whileHover={{ scale: 1.05 }}
                    >
                        With mindSHIELD, protect what matters.
                    </motion.p>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default AboutPage;