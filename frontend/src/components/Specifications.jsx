import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaBluetooth,
  FaBolt,
  FaMapMarkerAlt,
  FaAppStore,
  FaArrowRight
} from 'react-icons/fa';
import alcohol from '../assets/alcohol.jpg';
import accident from '../assets/accident.jpg';
import speeding from '../assets/speeding.jpg';



const Specifications = () => {
    const specs = [
      {
        title: "MQ3 Sensor",
        description: "Real-time CO and alcohol detection for enhanced safety.",
        image: alcohol
      },
      {
        title: "SW-420 Vibration Sensor",
        description: "Automatic collision detection and emergency response system.",
        image: accident
      },
      {
        title: "HC-05 Bluetooth Module",
        description: "Seamless connectivity for data sharing and updates.",
        image: speeding
      }
    ];
  
    return (
      <div className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center text-green-400 mb-16"
          >
            Why This Helmet Stands Out
          </motion.h2>
  
          <div className="space-y-24">
            {specs.map((spec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col lg:flex-row items-center gap-12"
              >
                <motion.div 
                  className="lg:w-1/2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={spec.image}
                    alt={spec.title}
                    className="w-full rounded-2xl shadow-2xl"
                  />
                </motion.div>
                
                <motion.div 
                  className="lg:w-1/2 p-8 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                    {spec.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {spec.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  

export default Specifications;