import React from "react";
import bluetooth from "../assets/bluetooth.jpg"
import sensor from "../assets/Sensors.jpg"
import gps from "../assets/GPS (1).jpg"
import app from "../assets/app.jpg"
import { FaBluetooth } from "react-icons/fa";
import { FaBolt } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaAppStore } from "react-icons/fa";
import { motion } from 'framer-motion';
const Features = () => {
    const features = [
      {
        icon: <FaBluetooth />,
        title: "Bluetooth Connectivity",
        description: "Connect your smart helmet to your smartphone for seamless integration.",
        image: bluetooth
      },
      {
        icon: <FaBolt />,
        title: "Impact Sensors",
        description: "Advanced impact sensors detect sudden collisions and alert emergency contacts.",
        image: sensor
      },
      {
        icon: <FaMapMarkerAlt />,
        title: "Built-in GPS",
        description: "Integrated GPS provides live location tracking for emergency situations.",
        image: gps
      },
      {
        icon: <FaAppStore />,
        title: "App Integration",
        description: "Personalized app for location sharing and speed monitoring.",
        image: app
      }
    ];
  
    return (
      <div className="py-20 bg-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.h2 
            className="text-4xl font-bold text-center text-green-400 mb-16"
            whileHover={{ scale: 1.05 }}
          >
            Smarter Than Ever: Features Designed for Your Ride
          </motion.h2>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-yellow-400/20 hover:border-yellow-400/50 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-green-400 text-2xl">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                </div>
                <p className="text-gray-300 mb-6">{feature.description}</p>
                <motion.img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  };

export default Features;
