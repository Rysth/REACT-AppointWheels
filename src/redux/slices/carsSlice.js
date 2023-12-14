import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NotificationManager } from 'react-notifications';
import axios from 'axios';

// GET cars#index
export const fetchCars = createAsyncThunk('cars/index',
  async () => {
    const authTokenData = sessionStorage.getItem('authToken');
    try {
      const response = await axios.get(
        'https://rails-appointmentwheels.onrender.com/api/v1/cars',
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

// POST cars#create
export const addCar = createAsyncThunk('cars/addCar', async (car) => {
  const authTokenData = sessionStorage.getItem('authToken');
  try {
    const response = await axios.post(
      'https://rails-appointmentwheels.onrender.com/api/v1/cars',
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
// DELETE cars#destroy
export const removeCar = createAsyncThunk('cars/removeCar', async (carId) => {
  const authTokenData = sessionStorage.getItem('authToken');
  try {
    const response = await axios.delete(
      `https://rails-appointmentwheels.onrender.com/api/v1/cars/${carId}`,
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
  length: 0,
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
      state.length = state.carsArray.length;
    });
    builder.addCase(removeCar.fulfilled, (state) => {
      state.length -= 1;
    });
  },
});

export default carsSlice.reducer;
