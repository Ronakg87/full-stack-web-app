import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../features/productSlice";
import { fetchUserById } from "../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";


const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.products);
  const { userDetails } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // const userIds = [...new Set(products?.result?.map((p) => p.assignedTo).flat())];
  const userIds = useMemo(() => {
    return [...new Set(products?.result?.map((p) => p.assignedTo).flat())];
  }, [products]);

  useEffect(() => {
    dispatch(fetchUserById(userIds));
  }, [dispatch, userIds]);

  const handleDelete = async (id) => {
    await dispatch(deleteProduct(id));
    toast.success("Product deleted successfully!");
    dispatch(fetchProducts());
  };


  // Helper function to get assigned user names
  const getAssignedUsers = (assignedTo) => {
    if (!assignedTo?.length) return "Not assigned";

    const names = assignedTo
      .map((id) => {
        const user = userDetails?.data?.find((u) => u._id === id);
        return user ? user.name : "Loading...";
      })
      .filter((name) => name !== "Loading...");  // Filter out any "Loading..." values if users are not yet loaded

    return names.length ? names.join(", ") : "Not assigned";
  };

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };
  
  return (
    <div className="dashboard-container">
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
                      <td>{getAssignedUsers(product.assignedTo)}</td>
                    }
                    <td>
                      {/* <Link to={`/edit-product/${product._id}`} className="edit-product-btn">Edit</Link> */}
                      <button className="edit-btn" onClick={() => navigate(`/edit-product/${product._id}`)}>Edit</button>
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
    </div>
  );
};

export default Products;
