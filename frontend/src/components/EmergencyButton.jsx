import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle, Share2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
// import { useAuth } from './AuthContext';  // Commented as per requirements

// Toast variant configurations
const TOAST_VARIANTS = {
  loading: {
    icon: Loader2,
    message: 'Sharing Location',
    description: 'Securing your coordinates...'
  },
  error: {
    icon: AlertCircle,
    message: 'Location Error',
    description: 'Please enable location services and try again'
  },
  success: {
    icon: CheckCircle2,
    message: 'Location Shared',
    description: 'Your location has been securely transmitted'
  }
};

const CustomToast = ({ icon: Icon, message, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="flex items-center gap-3 bg-gray-900/95 border border-yellow-400/20 p-4 rounded-xl shadow-lg"
  >
    <div className="p-2 bg-yellow-400/10 rounded-lg">
      <Icon className="text-yellow-400 w-5 h-5" strokeWidth={2} /> {/* Added strokeWidth for better visibility */}
    </div>
    <div>
      <p className="font-semibold text-white">{message}</p>
      {description && (
        <p className="text-yellow-400/60 text-sm">{description}</p>
      )}
    </div>
  </motion.div>
);

// Helper function to show toast
const showToast = (variant) => {
  const config = TOAST_VARIANTS[variant];
  return toast.custom((t) => (
    <div
      className={` shadow-lg rounded-md p-4  flex items-center gap-3 ${
        t.visible ? 'animate-enter' : 'animate-leave'
      }`}
      style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
      }}
    >
      <CustomToast
        icon={config.icon}
        message={config.message}
        description={config.description}
      />
    </div>
  ));
};

export const EmergencyButton = () => {
  const [isSharing, setIsSharing] = useState(false);
  const [progress, setProgress] = useState(0);
  // const { user } = useAuth();  // Commented as per requirements

  const handleLocationError = useCallback(() => {
    showToast('error');
    setIsSharing(false);
  }, []);

  const shareLocation = async () => {
    if (!navigator.geolocation) {
      handleLocationError();
      return;
    }

    setIsSharing(true);
    

    // Progress animation
    let startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed / 5000) * 100;
      setProgress(Math.min(newProgress, 100));
      
      if (newProgress >= 100) {
        clearInterval(interval);
      }
    }, 50);

    // Function to send location update
    const sendLocationUpdate = async (position) => {
      try {
        /* 
        // Backend API call commented out as requested
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: new Date().toISOString()
        };

        await fetch(`${BASE_URL}/share-location`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user._id,
            location
          })
        });
        */

        // Simulate API delay and show success
        setTimeout(() => {
          showToast('success');
          setIsSharing(false);
          setProgress(0);
        }, 5000);

      } catch (error) {
        handleLocationError();
        clearInterval(interval);
      }
    };

    // Watch position and send updates
   sendLocationUpdate()

    // Clean up function
    return () => {
      
      clearInterval(interval);
      setIsSharing(false);
      setProgress(0);
    };
  };

  return (
    <div className="relative">
      <motion.button
        onClick={shareLocation}
        disabled={isSharing}
        className="relative overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <AnimatePresence mode="wait">
          {isSharing ? (
            <motion.div
              key="sharing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Loader2 className="w-5 h-5 animate-spin" strokeWidth={2} />
              <span>Sharing Location...</span>
            </motion.div>
          ) : (
            <motion.div
              key="share"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Share2 className="w-5 h-5" strokeWidth={2} />
              <span>Share Location</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress overlay */}
        {isSharing && (
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gray-900/20"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        )}
      </motion.button>

      {/* Pulse effect when sharing */}
      {isSharing && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-yellow-400/20"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ 
            repeat: Infinity,
            duration: 1.5,
            ease: "easeOut"
          }}
        />
      )}
    </div>
  );
};

export default EmergencyButton;