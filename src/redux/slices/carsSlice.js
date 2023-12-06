import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authTokenData = sessionStorage.getItem('authToken');

export const fetchCars = createAsyncThunk('cars/index',
  async () => {
    try {
      const response = await axios.get(
        'http://localhost:3001/api/v1/cars',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authTokenData}`,
          },
          withCredentials: true,
        },
      );
      const data = await response.data;
      return data;
    } catch (error) {
      throw new Error(error);
    }
  });

const initialState = {
  carsArray: [],
  loading: true,
};

export const carsSlice = createSlice({
  name: 'cars array',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCars.pending, (state) => {
      console.log('aaaaaaaaaaaaaaaaaaaaa');
      console.log('pending');
      console.log(state);
      state.loading = true;
    });
    builder.addCase(fetchCars.fulfilled, (state, action) => {
      console.log('fulfilled');
      console.log(state);
      state.loading = false;
      state.carsArray = action.payload;
      console.log(state.carsArray);
    });
  },
});

export default carsSlice.reducer;
