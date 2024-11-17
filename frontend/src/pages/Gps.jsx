import React from 'react';
import './Dashboard.css'; // Import your custom CSS

import Sidebar from '../components/Sidebar';
import GPSData from '../components/GPSData';
function Gps() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <GPSData />
      </div>
    </div>
  );
}

export default Gps;
