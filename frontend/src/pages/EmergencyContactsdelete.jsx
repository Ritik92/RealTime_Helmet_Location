import React from 'react';
import './Dashboard.css'; // Import your custom CSS
import Sidebar from '../components/Sidebar';
import DeleteData from '../components/DeleteData';
function EmergencyContactsdelete() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <DeleteData />
      </div>
    </div>
  );
}

export default EmergencyContactsdelete;
