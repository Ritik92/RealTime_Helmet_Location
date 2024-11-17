import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./components/AuthContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
       <BrowserRouter>
      <App />
      <Toaster/>
  </BrowserRouter>
  </AuthProvider>
 
);
