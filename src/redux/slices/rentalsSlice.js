import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

const authTokenData = sessionStorage.getItem('authToken');
const user = JSON.parse(sessionStorage.getItem('userCredentials'));

// Async thunk to fetch rentals
export const fetchRentals = createAsyncThunk('rentals/fetchRentals', async () => {
  const response = await axios.get(`http://localhost:3001/api/v1/users/${user.id}/rentals`, {
    headers: { Authorization: authTokenData },
    withCredentials: true,
  });
  return response.data;
});

export const createRental = createAsyncThunk('rentals/createRental', async (rental) => {
  try {
    const response = await axios.post(`http://localhost:3001/api/v1/users/${user.id}/rentals`, rental, {
      headers: { Authorization: authTokenData },
    });
    NotificationManager.success('Rented!', 'Success', 1250);
    return response.data;
  } catch (error) {
    NotificationManager.error('Rent failed', 'Fail', 1250);
    throw new Error('Error Creating Rental');
  }
});

// Async thunk to delete a rental
export const deleteRental = createAsyncThunk('rentals/deleteRental', async (id) => {
  await axios.delete(`http://localhost:3001/api/v1/users/${user.id}/rentals/${id}`, {
    headers: { Authorization: authTokenData },
    withCredentials: true,
  });
  return id;
});

const initialState = {
  rentalArray: [],
  loading: true,
};

// Rentals slice
const rentalsSlice = createSlice({
  name: 'rentals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRentals.fulfilled, (state, action) => {
        state.rentalArray = action.payload;
        state.loading = false;
      })
      .addCase(createRental.fulfilled, (state, action) => {
        state.rentalArray.push(action.payload);
      })
      .addCase(deleteRental.fulfilled, (state, action) => {
        state.rentalArray.filter((rental) => rental.id !== action.payload);
      });
  },
});

export default rentalsSlice.reducer;
