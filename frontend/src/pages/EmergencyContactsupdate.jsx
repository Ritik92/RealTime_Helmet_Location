import React from 'react';
import './Dashboard.css'; // Import your custom CSS
import Sidebar from '../components/Sidebar';
import UpdateData from '../components/UpdateData';
function EmergencyContactsupdate() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <UpdateData />
      </div>
    </div>
  );
}

export default EmergencyContactsupdate;
