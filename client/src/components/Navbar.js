import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      {isAuthenticated ? (
        <>
          <Link to="/admin">Admin Dashboard</Link>
          <Link to="/user">User Dashboard</Link>
          <button onClick={handleLogout} style={{ marginLeft: "15px" }}>
            Logout
          </button>
        </>
      ) : (
        <Link to="/">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
