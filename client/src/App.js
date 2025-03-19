// import logo from './logo.svg';
// import './App.css';
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
// import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

function App() {
  const isAuthenticated = localStorage.getItem("token");
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/admin"
          element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/user"
          element={isAuthenticated ? <UserDashboard /> : <Navigate to="/" />}
        />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;
