import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice';
import carsReducer from './slices/carsSlice';

const store = configureStore({
  reducer: {
    credentials: loginReducer,
    carsStore: carsReducer,
  },
});

export default store;
