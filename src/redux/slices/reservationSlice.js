import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BaseUrl, { getHeaders } from '../../api/api_helper';
import { showError } from '../../helpers';
import { loading, loaded } from './loaderSlice';

const initialState = [];

export const getReservations = createAsyncThunk('reservations/getReservations', async (_, { dispatch }) => {
  dispatch(loading());
  try {
    const headers = getHeaders();
    const response = await axios.get(`${BaseUrl}reservations`, headers);
    dispatch(loaded());
    return response.data;
  } catch (error) {
    showError();
    dispatch(loaded());
    throw error;
  }
});

const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReservations.fulfilled, (state, action) => action.payload);
  },
});

export default reservationSlice.reducer;