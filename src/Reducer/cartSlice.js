import { createSlice } from "@reduxjs/toolkit";

const getInitialItems = () => {
  try {
    const products = JSON.parse(localStorage.getItem('products'));
    if (Array.isArray(products)) {
      return products;
    }
    console.warn("Invalid cart data in localStorage, resetting to empty array.");
    return [];
  } catch (error) {
    console.error("Error parsing products from localStorage:", error);
    return [];
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    item: getInitialItems(),
    loading: false,
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.item.find((product) => product.title === action.payload.title);
      if (existingProduct) {
        existingProduct.count += 1;
      } else {
        state.item.push({ ...action.payload, count: 1 });
      }

      try {
        localStorage.setItem('products', JSON.stringify(state.item));
      } catch (error) {
        console.error("Error setting products in localStorage:", error);
        state.error = "Failed to update cart in localStorage";
      }
    },
    setCart: (state, action) => {
      state.item = action.payload;
      try {
        localStorage.setItem('products', JSON.stringify(state.item));
      } catch (error) {
        console.error("Error setting products in localStorage:", error);
        state.error = "Failed to set cart in localStorage";
      }
    },
    updatedCart: (state, action) => {
      const { index, count } = action.payload;
      if (index >= 0 && index < state.item.length) {
        const item = state.item[index];
        if (item) {
          item.count = count;
        }
      } else {
        console.error("Invalid index for cart update");
      }

      try {
        localStorage.setItem('products', JSON.stringify(state.item));
      } catch (error) {
        console.error("Error updating products in localStorage:", error);
        state.error = "Failed to update cart in localStorage";
      }
    }
  },
});

export const { addToCart, setCart, updatedCart } = cartSlice.actions;
export default cartSlice.reducer;
