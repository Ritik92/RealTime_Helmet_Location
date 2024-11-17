import "./App.css";
import Login from "./components/Login";
import Home from "./pages/Home";
import SignUp from "./components/SignUp";
import Dashboard from "./pages/Dashboard";
import Preorder from "./pages/Preorder";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { useState } from "react";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import ProfileForm from "./pages/ProfileForm";
import Gps from "./pages/Gps";
import Navbar from "./components/Navbar";
import EmergencyContactscreate from "./pages/EmergencyContactscreate";
import EmergencyContactsupdate from "./pages/EmergencyContactsupdate";

import AboutPage from "./components/About";
import EmergencyContacts from "./pages/EmergencyContacts";
import ContactPage from "./pages/Contact";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="w-screen min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="pt-20"> {/* Added padding-top here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/profile" element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Profile />
            </PrivateRoute>
          } />
          <Route path="/edit" element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <ProfileForm />
            </PrivateRoute>
          } />
          <Route path="/emergency-contacts" element={
            <PrivateRoute>
              <EmergencyContacts />
            </PrivateRoute>
          } />
          <Route path="/gps" element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Gps />
            </PrivateRoute>
          } /> 
          <Route path="/preorder" element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Preorder />
            </PrivateRoute>
          } />
          <Route path="/contact" element={<ContactPage/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;