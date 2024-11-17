import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SignupForm from './SignupForm';
import LogInForm from './LogInForm';
import { FcGoogle } from 'react-icons/fc';

const Template = ({ title, desc1, desc2, image, formtype, setIsLoggedIn }) => {
    const [isLoading, setIsLoading] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    const handleGoogleSignIn = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    };

    return (
        <motion.div 
            className="flex flex-col md:flex-row w-11/12 mx-auto py-12 gap-y-8 md:gap-y-0 md:gap-x-8 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Left section */}
            <motion.div 
                className="flex-1 text-center md:text-left"
                variants={itemVariants}
            >
                <motion.h1 
                    className="text-white font-semibold text-2xl md:text-3xl leading-8"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    {title}
                </motion.h1>

                <motion.p 
                    className="text-lg md:text-xl leading-6 mt-4"
                    variants={itemVariants}
                >
                    <span className="text-white">{desc1}</span>
                    <br />
                    <motion.span 
                        className="italic text-yellow-400"
                        whileHover={{ color: "#ffd700" }}
                    >
                        {desc2}
                    </motion.span>
                </motion.p>

                <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                    className="mt-6"
                >
                    {formtype === "signup" ? (
                        <SignupForm setIsLoggedIn={setIsLoggedIn} />
                    ) : (
                        <LogInForm setIsLoggedIn={setIsLoggedIn} />
                    )}
                </motion.div>

                <motion.div 
                    className="flex items-center my-4 gap-x-2"
                    variants={itemVariants}
                >
                    <hr className="flex-1 h-px opacity-40 bg-white" />
                    <p className="text-white font-medium">OR</p>
                    <hr className="flex-1 h-px opacity-40 bg-white" />
                </motion.div>

                <motion.button
                    className="w-full flex justify-center items-center rounded-lg font-medium text-white border border-yellow-200 px-4 py-3 gap-x-2 mt-6
                             hover:bg-yellow-400/10 disabled:opacity-50 disabled:cursor-not-allowed"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                    ) : (
                        <FcGoogle className="text-2xl" />
                    )}
                    <p>Sign in with Google</p>
                </motion.button>
            </motion.div>

            {/* Right section with image */}
            <motion.div 
                className="flex-1 flex justify-center md:justify-start mt-8 md:mt-0"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative"
                >
                    <motion.div 
                        className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg blur opacity-25"
                        animate={{ 
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.img
                        src={image}
                        width={558}
                        height={490}
                        className="rounded-lg md:rounded-2xl relative z-10"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        drag
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        dragElastic={0.1}
                    />
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Template;