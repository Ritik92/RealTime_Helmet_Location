import React from 'react';
import './Dashboard.css'; // Import your custom CSS
import Sidebar from '../components/Sidebar';
import CreateData from '../components/CreateData';
function EmergencyContactscreate() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <CreateData />
      </div>
    </div>
  );
}

export default EmergencyContactscreate;
