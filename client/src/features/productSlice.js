import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Fetch All Products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/all-products`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch products");
    }
  }
);

// Create Product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/add-product`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Product created successfully!");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to create product");
      return rejectWithValue(error.response?.data || "Failed to create product");
    }
  }
);

// Update Product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${API_URL}/product/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Product updated successfully!");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data || "Failed to update product");
      return rejectWithValue(error.response?.data || "Failed to update product");
    }
  }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({productId, source}, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/product/${productId}/${source}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Product deleted successfully!");
      return productId;
    } catch (error) {
      toast.error(error.response?.data || "Failed to delete product");
      return rejectWithValue(error.response?.data || "Failed to delete product");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Create Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        if (!Array.isArray(state.users)) {
          state.users = []; // Reinitialize as an array
        }
        state?.users?.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload?.id || action.payload; 

        if (Array.isArray(state.products)) {
          state.products = state.products.filter(
          (product) => product._id !== deletedId
        );
    }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
