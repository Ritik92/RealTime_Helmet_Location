import React from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useAuth } from './AuthContext';

const ProfileData = () => {
    const { user } = useAuth();

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

    const hoverVariants = {
        hover: {
            scale: 1.02,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 25
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="p-8 max-w-6xl mx-auto"
        >    
            <motion.div 
                className="mb-8 space-y-2"
                variants={itemVariants}
            >
                <div className="text-yellow-400/60 text-sm font-medium flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-yellow-400/60" />
                    Dashboard
                    <span className="w-1 h-1 rounded-full bg-yellow-400/60" />
                    Profile
                </div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                    My Profile
                </h1>
            </motion.div>

            <motion.div 
                className="grid gap-8 lg:grid-cols-3"
                variants={itemVariants}
            >
                {/* Profile Card */}
                <motion.div 
                    className="lg:col-span-1"
                    variants={hoverVariants}
                    whileHover="hover"
                >
                    <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-yellow-400/20 hover:border-yellow-400/40 transition-colors shadow-lg shadow-black/10">
                        <div className="flex flex-col items-center text-center">
                            <motion.div
                                className="relative mb-6"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <img 
                                    src="/pfp.jpg" 
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full border-4 border-yellow-400/30 shadow-lg"
                                />

                                <motion.button
                                    className="absolute bottom-0 right-0 p-2 bg-yellow-400 rounded-full text-gray-900 hover:bg-yellow-300 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FaEdit size={16} />
                                </motion.button>
                            </motion.div>
                            <h2 className="text-3xl font-bold text-white mb-2">
                                {user.firstName} {user.lastName}
                            </h2>
                            <p className="text-yellow-400/60 font-medium">Premium Member</p>
                        </div>
                    </div>
                </motion.div>

                {/* Info Cards */}
                <div className="lg:col-span-2 space-y-8">
                    <motion.div 
                        className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-yellow-400/20 hover:border-yellow-400/40 transition-colors shadow-lg shadow-black/10"
                        variants={hoverVariants}
                        whileHover="hover"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-bold text-white">Personal Information</h3>
                            <motion.button
                                className="px-4 py-2 bg-yellow-400/10 text-yellow-400 rounded-lg hover:bg-yellow-400/20 transition-colors flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaEdit size={14} />
                                <span>Edit</span>
                            </motion.button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                { icon: FaEnvelope, label: "Email", value: user.email },
                                { icon: FaPhone, label: "Phone", value: "+91 12345 67890" },
                                { icon: FaMapMarkerAlt, label: "Location", value: "Mumbai, India" }
                            ].map((item, index) => (
                                <motion.div 
                                    key={index}
                                    className="bg-gray-900/30 rounded-xl p-6 border border-yellow-400/10"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-yellow-400/10 rounded-lg">
                                            <item.icon className="text-yellow-400 text-xl" />
                                        </div>
                                        <div>
                                            <p className="text-yellow-400/60 text-sm font-medium mb-1">{item.label}</p>
                                            <p className="text-white font-medium">{item.value}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProfileData;