import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchUserById, deleteProduct } from "../features/productSlice";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";

const Products = () => {
  const dispatch = useDispatch();
  const { products, users, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // useEffect(() => {
  //   if (products?.result?.length) {
  //     products.result.forEach((product) => {
  //       if (product?.assignTo) {
  //         dispatch(fetchUserById(product?.assignTo));
  //       }
  //     });
  //   }
  // }, [products, dispatch, users]);

  useEffect(() => {
    if (products?.result?.length) {
      products.result.forEach((product) => {
        if (product?.assignedTo?.length) {
          product.assignedTo.forEach((userId) => {
            
            // if (users?.length !=0 && !users[userId]) {
              const response = dispatch(fetchUserById(userId));  // Fetch only if not already in state
              console.log(response);
            // }
          });
        }
      });
    }
  }, [products, dispatch, users]);

  const handleDelete = async (id) => {
    await dispatch(deleteProduct(id));
    toast.success("Product deleted successfully!");
    dispatch(fetchProducts());
  };
console.log(users);


// Helper function to get assigned user names
const getAssignedUsers = (assignedTo) => {
  if (!assignedTo?.length) return "Not assigned";

  const names = assignedTo
    .map((id) => users[id]?.name || "Loading...")  // Fetch name or show loading
    .filter((name) => name);  // Filter out undefined values

  return names.length ? names.join(", ") : "Not assigned";
};
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <h2>Products</h2>
        <Link to="/create-product" className="btn add-product-btn">Add Product</Link>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Source</th>
                {localStorage.getItem("role") === 'admin' && 
                <th>AssignTo</th>
                }
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.result?.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.sku}</td>
                  <td>{product.category}</td>
                  <td>{product.source}</td>
                  {localStorage.getItem("role") === 'admin' && 
                    <td>
                        <td>{getAssignedUsers(product.assignedTo)}</td>
                    </td>
                  }
                  <td>
                    <Link to={`/edit-product/${product._id}`}>Edit</Link>
                    <button className="delete-btn" onClick={() => handleDelete(product._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Products;
