import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../store/products/productSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});
