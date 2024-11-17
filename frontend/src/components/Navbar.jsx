import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Navbar = (props) => {
    const { isLoggedIn, setIsLoggedIn } = props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/about", label: "About" },
        { to: "/preorder", label: "Book Helmet" },
        { to: "/contact", label: "Contact" },
    ];

    const navbarVariants = {
        hidden: { y: -100 },
        visible: {
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 1
            }
        }
    };

    const menuVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 0.5
            }
        }
    };

    return (
        <motion.nav
            initial="hidden"
            animate="visible"
            variants={navbarVariants}
            className={`fixed w-full top-0 z-50 transition-all duration-300 ${
                isScrolled 
                    ? 'bg-black/90 backdrop-blur-lg shadow-lg' 
                    : 'bg-black'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link to="/">
                            <motion.p 
                                className="text-3xl font-bold bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent"
                                whileHover={{ scale: 1.05 }}
                            >
                                mindSHIELD
                            </motion.p>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <motion.ul 
                        className="hidden md:flex space-x-8 items-center"
                        variants={menuVariants}
                    >
                        {navLinks.map((link) => (
                            <motion.li 
                                key={link.to}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link to={link.to}>
                                    <div className="relative group">
                                        <span className={`text-lg font-medium transition-colors duration-300 ${
                                            location.pathname === link.to 
                                                ? 'text-yellow-400' 
                                                : 'text-white group-hover:text-yellow-400'
                                        }`}>
                                            {link.label}
                                        </span>
                                        <motion.span 
                                            className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transform origin-left"
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: location.pathname === link.to ? 1 : 0 }}
                                            whileHover={{ scaleX: 1 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                </Link>
                            </motion.li>
                        ))}
                    </motion.ul>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <AnimatePresence mode="wait">
                            {!isLoggedIn ? (
                                <>
                                    <Link to="/login">
                                        <motion.button
                                            whileHover={{ scale: 1.05, backgroundColor: "rgba(74, 222, 128, 0.1)" }}
                                            whileTap={{ scale: 0.95 }}
                                            className="relative overflow-hidden px-6 py-2.5 rounded-lg text-white font-medium border border-white/20 transition-colors duration-300"
                                        >
                                            <motion.span 
                                                className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-500/20"
                                                initial={{ x: "-100%" }}
                                                whileHover={{ x: "100%" }}
                                                transition={{ duration: 0.5 }}
                                            />
                                            <span className="relative">Login</span>
                                        </motion.button>
                                    </Link>
                                    <Link to="/signup">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-2.5 rounded-lg text-white font-medium bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 transition-all duration-300"
                                        >
                                            Signup
                                        </motion.button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-2.5 rounded-lg text-white font-medium border border-red-500/30 hover:bg-red-500/10 transition-all duration-300"
                                            onClick={() => {
                                                setIsLoggedIn(false);
                                                toast.success("Logged Out");
                                            }}
                                        >
                                            Logout
                                        </motion.button>
                                    </Link>
                                    <Link to="/dashboard">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-2.5 rounded-lg text-white font-medium bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 border border-yellow-400/30 hover:from-yellow-400/30 hover:to-yellow-500/30 transition-all duration-300"
                                        >
                                            Dashboard
                                        </motion.button>
                                    </Link>
                                </>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="md:hidden text-white p-2"
                        onClick={toggleMenu}
                    >
                        <FaBars size={24} />
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden border-t border-white/10"
                        >
                            <motion.ul 
                                className="flex flex-col space-y-4 py-6"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.1
                                        }
                                    }
                                }}
                                initial="hidden"
                                animate="visible"
                            >
                                {navLinks.map((link) => (
                                    <motion.li 
                                        key={link.to}
                                        variants={{
                                            hidden: { x: -20, opacity: 0 },
                                            visible: { x: 0, opacity: 1 }
                                        }}
                                    >
                                        <Link 
                                            to={link.to}
                                            className={`block px-4 py-2 text-lg font-medium ${
                                                location.pathname === link.to 
                                                    ? 'text-yellow-400' 
                                                    : 'text-white hover:text-yellow-400'
                                            }`}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.li>
                                ))}
                                {/* Mobile Auth Buttons */}
                                <div className="flex flex-col space-y-3 px-4 pt-4 border-t border-white/10">
                                    {!isLoggedIn ? (
                                        <>
                                            <Link to="/login">
                                                <motion.button
                                                    whileTap={{ scale: 0.95 }}
                                                    className="w-full py-2.5 rounded-lg text-white font-medium border border-white/20 hover:bg-white/5"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    Login
                                                </motion.button>
                                            </Link>
                                            <Link to="/signup">
                                                <motion.button
                                                    whileTap={{ scale: 0.95 }}
                                                    className="w-full py-2.5 rounded-lg text-white font-medium bg-gradient-to-r from-green-400 to-green-500"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    Signup
                                                </motion.button>
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link to="/dashboard">
                                                <motion.button
                                                    whileTap={{ scale: 0.95 }}
                                                    className="w-full py-2.5 rounded-lg text-white font-medium bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 border border-yellow-400/30"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    Dashboard
                                                </motion.button>
                                            </Link>
                                            <Link to="/">
                                                <motion.button
                                                    whileTap={{ scale: 0.95 }}
                                                    className="w-full py-2.5 rounded-lg text-white font-medium border border-red-500/30"
                                                    onClick={() => {
                                                        setIsLoggedIn(false);
                                                        setIsMenuOpen(false);
                                                        toast.success("Logged Out");
                                                    }}
                                                >
                                                    Logout
                                                </motion.button>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </motion.ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;