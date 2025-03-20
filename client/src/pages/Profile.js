import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Profile.css";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState(user?.role || "");

  return (
    <div className="profile-container">
      <h2>Profile</h2>

      <form>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          disabled
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          disabled
        />

        <label>Role:</label>
        <input
          type="text"
          value={role}
          disabled
        />
      </form>
    </div>
  );
};

export default Profile;
