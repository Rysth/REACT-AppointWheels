import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice';

const store = configureStore({
  reducer: {
    credentials: loginReducer,
  },
});

export default store;
