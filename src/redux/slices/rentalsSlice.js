import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authTokenData = sessionStorage.getItem('authToken');

// Async thunk to fetch rentals
export const fetchRentals = createAsyncThunk('rentals/fetchRentals', async () => {
  const response = await axios.get('/api/rentals', {
    headers: { Authorization: `Bearer ${authTokenData}` },
  });
  return response.data;
});

// Async thunk to create a rental
export const createRental = createAsyncThunk('rentals/createRental', async (rental) => {
  const response = await axios.post('/api/rentals', rental, {
    headers: { Authorization: `Bearer ${authTokenData}` },
  });
  return response.data;
});

// Async thunk to delete a rental
export const deleteRental = createAsyncThunk('rentals/deleteRental', async (id) => {
  await axios.delete(`/api/rentals/${id}`, {
    headers: { Authorization: `Bearer ${authTokenData}` },
  });
  return id;
});

// Rentals slice
const rentalsSlice = createSlice({
  name: 'rentals',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRentals.fulfilled, (state, action) => action.payload)
      .addCase(createRental.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      // eslint-disable-next-line
      .addCase(deleteRental.fulfilled, (state, action) => state.filter((rental) => rental.id !== action.payload));
  },
});

export default rentalsSlice.reducer;
