import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

// Async thunk to fetch rentals
export const fetchRentals = createAsyncThunk('rentals/fetchRentals', async () => {
  const user = JSON.parse(sessionStorage.getItem('userCredentials'));
  const authTokenData = sessionStorage.getItem('authToken');
  try {
    const response = await axios.get(`http://localhost:3001/api/v1/users/${user.id}/rentals`, {
      headers: { Authorization: authTokenData },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    NotificationManager.error('fetch failed', 'Fail', 1250);
    throw new Error('Error Fetching Rentals');
  }
});

export const createRental = createAsyncThunk('rentals/createRental', async (rental) => {
  const user = JSON.parse(sessionStorage.getItem('userCredentials'));
  const authTokenData = sessionStorage.getItem('authToken');
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
export const cancelRental = createAsyncThunk('rentals/deleteRental', async (id) => {
  const user = JSON.parse(sessionStorage.getItem('userCredentials'));
  const authTokenData = sessionStorage.getItem('authToken');
  try {
    await axios.delete(`http://localhost:3001/api/v1/users/${user.id}/rentals/${id}`, {
      headers: { Authorization: authTokenData },
      withCredentials: true,
    });
    NotificationManager.success('Rent Canceled', 'Success', 1250);
    return id;
  } catch (error) {
    NotificationManager.error('Rent not Cancelled', 'Fail', 1250);
    throw new Error('Error Canceling Rental');
  }
});

const initialState = {
  rentalArray: [],
  loading: true,
  length: 0,
};

// Rentals slice
const rentalsSlice = createSlice({
  name: 'rentals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRentals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRentals.fulfilled, (state, action) => {
        state.rentalArray = action.payload;
        state.loading = false;
        state.length = state.rentalArray.length;
      })
      .addCase(createRental.fulfilled, (state, action) => {
        state.rentalArray.push(action.payload);
        state.loading = true;
      })
      .addCase(cancelRental.fulfilled, (state, action) => {
        state.rentalArray = state.rentalArray.filter((rental) => rental.id !== action.payload);
        state.length -= 1;
      });
  },
});

export default rentalsSlice.reducer;
