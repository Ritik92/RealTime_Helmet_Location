import React, { useState } from 'react';
import { Share2, Loader2 } from 'lucide-react';
import { useAuth } from './AuthContext';

// Set this to false to use real location sharing
const SIMULATE_SHARING = false;

export const EmergencyButton = () => {
  const [isSharing, setIsSharing] = useState(false);
  const {user}=useAuth()
  const handleSuccess = () => {
    setIsSharing(false);
    alert('Location shared successfully!');
  };

  const handleError = (error) => {
    setIsSharing(false);
    
  };

  const shareLocation = async () => {
    if (!navigator.geolocation) {
      handleError(new Error('Geolocation is not supported'));
      return;
    }

    setIsSharing(true);

    if (SIMULATE_SHARING) {
      // Simulation mode
      setTimeout(() => {
        handleSuccess();
      }, 2000);
      return;
    }

    // Real location sharing
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });

      // Replace this URL with your actual API endpoint
      const response = await fetch('http://localhost:4000/api/v1/share-location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId:user._id,
          location:{
            latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: new Date().toISOString()
          }
          
        })
      });
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to send location');
      }

      handleSuccess();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <button
      onClick={shareLocation}
      disabled={isSharing}
      className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 
                 text-gray-900 px-6 py-3 rounded-lg font-semibold 
                 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSharing ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Sharing...</span>
        </>
      ) : (
        <>
          <Share2 className="w-5 h-5" />
          <span>Share Location</span>
        </>
      )}
    </button>
  );
};

export default EmergencyButton;