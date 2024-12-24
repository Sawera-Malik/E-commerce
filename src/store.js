import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './Reducer/cartSlice'
const store = configureStore({
    reducer:{
        cart:cartReducer
    }
})
export default store;