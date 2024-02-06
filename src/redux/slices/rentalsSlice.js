import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

// GET rentals#index
export const fetchRentals = createAsyncThunk('rentals/fetchRentals', async () => {
  const user = JSON.parse(sessionStorage.getItem('userCredentials'));
  const authTokenData = sessionStorage.getItem('authToken');
  try {
    const response = await axios.get(`https://rails-appointmentwheels.onrender.com/api/v1/users/${user.id}/rentals`, {
      headers: { Authorization: authTokenData },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    NotificationManager.error('fetch failed', 'Fail', 1250);
    throw new Error('Error Fetching Rentals');
  }
});

// GET rentals#create
export const createRental = createAsyncThunk('rentals/createRental', async (rental) => {
  const user = JSON.parse(sessionStorage.getItem('userCredentials'));
  const authTokenData = sessionStorage.getItem('authToken');
  try {
    const response = await axios.post(`https://rails-appointmentwheels.onrender.com/api/v1/users/${user.id}/rentals`, rental, {
      headers: { Authorization: authTokenData },
    });
    if (response.data.total_price && response.data.total_price >= 0) {
      NotificationManager.success('Rented!', 'Success', 1250);
      return response.data;
    }
    throw new Error('Invalid total price');
  } catch (error) {
    NotificationManager.error('Rent failed', 'Fail', 1250);
    throw new Error('Error Creating Rental');
  }
});

// GET rentals#destroy
export const cancelRental = createAsyncThunk('rentals/deleteRental', async (id) => {
  const user = JSON.parse(sessionStorage.getItem('userCredentials'));
  const authTokenData = sessionStorage.getItem('authToken');
  try {
    await axios.delete(`https://rails-appointmentwheels.onrender.com/api/v1/users/${user.id}/rentals/${id}`, {
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
