import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaBell, FaPhoneAlt, FaClock } from 'react-icons/fa';
import hamlet from '../assets/hero-image.jpg';

const Preorder = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    const features = [
        {
            icon: FaShieldAlt,
            title: "Collision Detection",
            description: "Advanced AI-powered instant collision detection system"
        },
        {
            icon: FaBell,
            title: "Emergency Contact",
            description: "Automatic alerts to your emergency contacts"
        },
        {
            icon: FaPhoneAlt,
            title: "24/7 Support",
            description: "Round-the-clock emergency response team"
        },
        {
            icon: FaClock,
            title: "Quick Response",
            description: "Emergency response within 3-5 seconds"
        }
    ];

    const loadRazorpay = () => {
        const options = {
            key: 'rzp_test_qzGirRI0BIcMGt',
            amount: 649900,
            currency: 'INR',
            name: 'MINDSHIELD',
            description: 'Pre-order Payment',
            handler: function (response) {
                window.location.href = '/dashboard';
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen bg-gray-900 p-6 md:p-8 lg:p-12"
        >
            <div className="max-w-7xl mx-auto">
                <motion.div 
                    className="text-center mb-12"
                    variants={itemVariants}
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent mb-4">
                        MINDSHIELD
                    </h1>
                    <p className="text-yellow-400/60 text-lg md:text-xl">
                        Your Safety, Our Priority
                    </p>
                </motion.div>

                <motion.div 
                    className="grid lg:grid-cols-2 gap-8 items-center"
                    variants={containerVariants}
                >
                    {/* Product Image */}
                    <motion.div
                        className="relative"
                        variants={itemVariants}
                    >
                        <div className="relative group">
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-2xl"
                                whileHover={{ opacity: 0.8 }}
                            />
                            <img
                                src={hamlet}
                                alt="MINDSHIELD Device"
                                className="w-full rounded-2xl shadow-2xl shadow-black/20 border border-yellow-400/20"
                            />
                            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                                <motion.div
                                    className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-bold shadow-lg"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Premium Quality
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Product Details */}
                    <motion.div 
                        className="space-y-8"
                        variants={itemVariants}
                    >
                        <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-yellow-400/20">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-white mb-4">
                                    Pre-order Now
                                </h2>
                                <div className="flex items-baseline gap-2 mb-6">
                                    <span className="text-4xl font-bold text-yellow-400">₹6,499</span>
                                    <span className="text-yellow-400/60">inclusive of all taxes</span>
                                </div>
                                <motion.button
                                    onClick={loadRazorpay}
                                    className="w-full bg-yellow-400 text-gray-900 py-4 rounded-xl font-bold text-lg shadow-lg shadow-yellow-400/20 hover:bg-yellow-300 transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Pre-order Now
                                </motion.button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        className="bg-gray-900/30 rounded-xl p-4 border border-yellow-400/10"
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-yellow-400/10 rounded-lg">
                                                <feature.icon className="text-yellow-400 text-xl" />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold mb-1">{feature.title}</h3>
                                                <p className="text-yellow-400/60 text-sm">{feature.description}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <motion.div 
                            className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-yellow-400/20"
                            variants={itemVariants}
                        >
                            <p className="text-yellow-400/60 text-sm text-center">
                                30-day money-back guarantee • Free shipping • 1-year warranty
                            </p>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Preorder;