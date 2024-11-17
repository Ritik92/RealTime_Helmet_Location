import React from 'react';
import './Dashboard.css'; // Import your custom CSS
import ProfileData from '../components/ProfileData';
import Sidebar from '../components/Sidebar';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
       <ProfileData />
      </div>
    </div>
  );
}

export default Dashboard;
