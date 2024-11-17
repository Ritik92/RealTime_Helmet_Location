import React from 'react';
import './Dashboard.css'; // Import your custom CSS
import Sidebar from '../components/Sidebar';
import ProfileData from '../components/ProfileData';

function Profile() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <ProfileData />
      </div>
    </div>
  );
}

export default Profile;
