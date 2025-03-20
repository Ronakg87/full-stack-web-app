import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productSlice";
import { fetchUsers } from "../features/userSlice";
import Sidebar from "../components/Sidebar";
// import { Link } from "react-router-dom";
// import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="main-container">
      <Sidebar />
      <div className="content-container">
        
        <div className="header">
          <h2>{user?.role === "admin" ? "Admin Dashboard" : "User Dashboard"}</h2>
        </div>
        <div className="stats">
        {user?.role === "admin" ? 
          <div className="card">
            <h3>Total Users</h3>
            <p>{users?.result?.length}</p>
          </div> 
        : ""}
          
            

            <div className="card">
              <h3>Total Products</h3>
              <p>{products?.result?.length}</p>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
