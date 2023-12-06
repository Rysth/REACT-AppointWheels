import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice';
import carsReducer from './slices/carsSlice';
import rentalsReducer from './slices/rentalsSlice';

const store = configureStore({
  reducer: {
    credentials: loginReducer,
    carsStore: carsReducer,
    rentalsStore: rentalsReducer,
  },
});

export default store;
