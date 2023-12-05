import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const userCredentialsData = JSON.parse(
  sessionStorage.getItem('userCredentials'),
);
const authTokenData = sessionStorage.getItem('authToken');

const initialState = {
  userCredentials: userCredentialsData || {},
  loading: false,
  active: userCredentialsData !== null,
  authToken: authTokenData || '',
};

// POST users#create
export const createSession = createAsyncThunk(
  'credentials/createSession',
  async (customerData) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/login',
        customerData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );

      if (!response.status === 200) {
        NotificationManager.error('Email/Password Incorrect', 'Fail', 1250);
        throw new Error('Error creating customer');
      }

      NotificationManager.success('Login Successfully!', 'Success', 1250);
      return { ...response.data, ...response.headers };
    } catch (error) {
      NotificationManager.error('Email/Password Incorrect', 'Fail', 1250);
      throw new Error('Error creating session');
    }
  },
);

// DELETE users#destroy
export const destroySession = createAsyncThunk(
  'credentials/destroySession',
  async (authorizationToken) => {
    try {
      const response = await axios.delete('http://localhost:3001/logout', {
        headers: {
          Authorization: authorizationToken,
        },
        withCredentials: true,
      });

      if (!response.status === 200) {
        throw new Error('Error logging out');
      }

      NotificationManager.success('Thank you!', 'Exito', 1250);
    } catch (error) {
      NotificationManager.error('Incorrect Logout', 'Fail', 1250);
      throw new Error('Error logging out');
    }
  },
);

export const loginSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createSession.fulfilled, (state, action) => {
      const { user } = action.payload.status.data;
      const { authorization } = action.payload;

      state.userCredentials = user;
      state.loading = false;
      state.active = true;
      state.authToken = authorization;

      sessionStorage.setItem(
        'userCredentials',
        JSON.stringify(state.userCredentials),
      );
      sessionStorage.setItem('authToken', state.authToken);
    });
    builder.addCase(destroySession.fulfilled, (state) => {
      state.userCredentials = {};
      state.loading = false;
      state.active = false;
      sessionStorage.removeItem('userCredentials');
      sessionStorage.removeItem('authToken');
    });
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
