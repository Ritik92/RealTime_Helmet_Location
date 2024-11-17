import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaPhone, FaMapMarkerAlt, FaSignOutAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../pages/Dashboard.css';

function Sidebar() {
    const location = useLocation();
    const [hoveredItem, setHoveredItem] = useState(null);

    const sidebarVariants = {
        hidden: { x: -100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        }
    };

    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: { x: 0, opacity: 1 }
    };

    const isActive = (path) => location.pathname === path;

    return (
        <motion.div 
            className="sidebar min-h-[100%] w-64 bg-gray-900/50 backdrop-blur-sm border-r border-yellow-400/20"
            initial="hidden"
            animate="visible"
            variants={sidebarVariants}
        >
            <motion.div 
                className="p-6"
                variants={itemVariants}
            >
                <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-8">
                    Dashboard
                </h2>
                <ul className="space-y-4">
                    {[
                        { path: '/profile', icon: FaUser, label: 'My Profile' },
                        { path: '/emergency-contacts', icon: FaPhone, label: 'Emergency Contacts' },
                        { path: '/gps', icon: FaMapMarkerAlt, label: 'Live Location' },
                        { path: '/', icon: FaSignOutAlt, label: 'Log Out' }
                    ].map((item) => (
                        <motion.li 
                            key={item.path}
                            onHoverStart={() => setHoveredItem(item.path)}
                            onHoverEnd={() => setHoveredItem(null)}
                            variants={itemVariants}
                        >
                            <Link 
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                                    ${isActive(item.path) 
                                        ? 'bg-yellow-400/20 text-yellow-400' 
                                        : 'text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10'}`}
                            >
                                <motion.div
                                    animate={{
                                        scale: hoveredItem === item.path || isActive(item.path) ? 1.2 : 1
                                    }}
                                >
                                    <item.icon className="text-xl" />
                                </motion.div>
                                <span className="font-medium">{item.label}</span>
                                {isActive(item.path) && (
                                    <motion.div
                                        className="absolute left-0 w-1 h-8 bg-yellow-400 rounded-r"
                                        layoutId="activeIndicator"
                                    />
                                )}
                            </Link>
                        </motion.li>
                    ))}
                </ul>
            </motion.div>
        </motion.div>
    );
}

export default Sidebar;
