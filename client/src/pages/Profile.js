import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { userInfo } from "../features/authSlice";
import { updateUser } from "../features/userSlice";
import { toast } from "react-toastify";
// import "./Profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(userInfo());
  }, [dispatch]);

  const [name, setName] = useState(user?.user?.name || "");
  const [email, setEmail] = useState(user?.user?.email || "");

  const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!name && !email) {
        toast.error("Please fill the form fileds.");
        return;
      }
      
      const userId = user?.user?._id;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);

     
  
      await dispatch(updateUser({ userId, formData }));
      toast.success("Product created successfully!");
      navigate("/products");
    };

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="profile-container">
      <Sidebar />
      <div className="content">
        <div className="back-button">
          <button
            onClick={goBack}
            className="back_btn"
          >
            🔙
          </button>
        </div>
      <div className="form-section">
        <h2>Profile</h2>

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* <label>Role:</label>
        <input
          type="text"
          value={role}
          disabled
        /> */}

      <button type="submit" className="submit-btn">Update</button>
      </form>
      </div>
      </div>
    </div>
  );
};

export default Profile;
