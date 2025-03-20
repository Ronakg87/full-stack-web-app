import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../features/productSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(createProduct({ name, sku, description, category }));
    toast.success("Product created successfully!");
    navigate("/products");
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <h2>Create Product</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

          <label>SKU:</label>
          <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} required />

          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

          <label>Category:</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />

          <button type="submit">Create Product</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
