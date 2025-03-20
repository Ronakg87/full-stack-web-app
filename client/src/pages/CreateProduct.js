// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { createProduct } from "../features/productSlice";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import Sidebar from "../components/Sidebar";

// const CreateProduct = () => {
//   const [name, setName] = useState("");
//   const [sku, setSku] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     await dispatch(createProduct({ name, sku, description, category }));
//     toast.success("Product created successfully!");
//     navigate("/products");
//   };

//   const goBack = () => {
//     navigate(-1); // Go back to the previous page
//   };

//   return (
//     <div className="dashboard-container">
//       <Sidebar />
//       <div className="content">
//       <div className="back-button">
//           <button
//               onClick={goBack}
//               className="back_btn"
//             >
//               🔙
//             </button>
//         </div>
//         <div className="form-section">
//         <h2>Create Product</h2>
//         <form onSubmit={handleSubmit}>
//           <label>Name:</label>
//           <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

//           <label>SKU:</label>
//           <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} required />

//           <label>Description:</label>
//           <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

//           <label>Category:</label>
//           <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />

//           <button type="submit">Create Product</button>
//         </form>
//       </div>
//       </div>
//     </div>
//   );
// };

// export default CreateProduct;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../features/productSlice";
import { fetchUsers } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [logo, setLogo] = useState(null);  // For image upload
  const [assignedTo, setAssignedTo] = useState([]);

  const { users, loading } = useSelector((state) => state.users);
  const currentUser = JSON.parse(localStorage.getItem("user"));  // Get current user

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
console.log(users);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!logo) {
      toast.error("Please upload a product logo.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", sku);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("logo", logo);
    formData.append("assignedTo", JSON.stringify(assignedTo));

    await dispatch(createProduct(formData));
    toast.success("Product created successfully!");
    navigate("/products");
  };

  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const goBack = () => {
    navigate(-1);
  };

  // Filter users excluding current user and admin
  const filteredUsers = users?.result?.filter(
    (user) => user._id !== currentUser._id && user.role !== "admin"
  );

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <div className="back-button">
          <button onClick={goBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px", marginRight: "10px" }}>
            🔙
          </button>
        </div>

        <div className="form-section">
          <h2>Create Product</h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

            <label>SKU:</label>
            <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} required />

            <label>Description:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

            <label>Category:</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />

            <label>Logo:</label>
            <input type="file" onChange={handleFileChange} required />

            <label>Assign To:</label>
            <select
              multiple
              value={assignedTo}
              onChange={(e) => {
                const options = Array.from(e.target.selectedOptions, (option) => option.value);
                setAssignedTo(options);
              }}
              required
            >
              {loading ? (
                <option>Loading...</option>
              ) : (
                users?.result?.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))
              )}
            </select>

            <button type="submit">Create Product</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;


