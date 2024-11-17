import React from 'react';
import './footer.css'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div 
              className="col-span-2"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-4xl font-bold text-yellow-400 mb-4">mindSHIELD</h3>
              <p className="text-gray-300 leading-relaxed">
                Standard helmets? Yesterday's tech. The mindSHIELD helmet is the revolution.
                Collision detection built-in, ready to react faster than human reflexes when disaster strikes.
              </p>
            </motion.div>
  
            <div className="space-y-8">
              <motion.div whileHover={{ scale: 1.05 }}>
                <h5 className="text-xl font-bold text-green-400 mb-4">Quick Links</h5>
                <ul className="space-y-2">
                  <li>
                    <Link to="/" className="text-gray-300 hover:text-yellow-400 transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/preorder" className="text-gray-300 hover:text-yellow-400 transition-colors">
                      Book Helmet
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </motion.div>
  
              <motion.div whileHover={{ scale: 1.05 }}>
                <h5 className="text-xl font-bold text-green-400 mb-4">Contact Us</h5>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span>+91 7206016422</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>supportteam@mindshield.in</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>Punjab</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </footer>
    );
  };
export default Footer;
