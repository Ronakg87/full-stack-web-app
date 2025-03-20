import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/authSlice";
import { fetchUsers } from "../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector((state) => state.users);


  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);


  if (error === 'Access denied') {
      dispatch(logoutUser());
      navigate("/");
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <h2>Users</h2>
        <Link to="/create-user" className="btn btn-primary">Create User</Link>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users?.result?.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Users;
