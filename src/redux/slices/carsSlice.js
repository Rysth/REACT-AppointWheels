import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NotificationManager } from 'react-notifications';
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
            Authorization: authTokenData,
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

export const addCar = createAsyncThunk('cars/addCar', async (car) => {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/cars',
      car,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: authTokenData,
        },
        withCredentials: true,
      },
    );

    if (!response.status === 200) {
      NotificationManager.error('Something went wrong!', 'Fail', 1250);
      throw new Error('Error creating a new car');
    }

    NotificationManager.success('New Car Added!', 'Success', 1250);
    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error(error);
  }
});

export const removeCar = createAsyncThunk('cars/removeCar', async (carId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/api/v1/cars/${carId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: authTokenData,
        },
        withCredentials: true,
      },
    );

    if (!response.status === 200) {
      NotificationManager.error('Something went wrong!', 'Fail', 1250);
      throw new Error('Error deleting the car');
    }

    NotificationManager.success('Car Deleted!', 'Success', 1250);
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
      state.loading = true;
    });
    builder.addCase(fetchCars.fulfilled, (state, action) => {
      state.loading = false;
      state.carsArray = action.payload;
    });
  },
});

export default carsSlice.reducer;
