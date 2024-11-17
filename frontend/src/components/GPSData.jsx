import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../pages/Dashboard.css';

// Import leaflet icon fix for React (because the default icon path will break)
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';

function GPSData() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        },
        (error) => {
          setLocation((prev) => ({ ...prev, error: error.message }));
        }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setLocation((prev) => ({ ...prev, error: 'Geolocation is not supported by this browser.' }));
    }
  }, []);

  return (
    <div className="header">
      <div className="breadcrumb">Home / Dashboard / My Live Location</div>
      <h1>My Live Location</h1>
      <div className="location">
        {location.error ? (
          <p>Error: {location.error}</p>
        ) : (
          <>
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
          </>
        )}
      </div>
      
      {/* Map Rendering */}
      {location.latitude && location.longitude && (
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={13}
          style={{ height: '400px', width: '100%', marginTop: '20px' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          <Marker 
            position={[location.latitude, location.longitude]} 
            icon={new L.Icon({
              iconUrl: markerIconPng,
              iconSize: [25, 41],
              iconAnchor: [12.5, 41]
            })}
          >
            <Popup>You are here</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}

export default GPSData;
