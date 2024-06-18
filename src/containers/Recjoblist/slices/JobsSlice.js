import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../../utils/setAuthToken';
export const fetchEmploisByRecruiter = createAsyncThunk(
  'emploi/fetchEmploisByRecruiter',
  async (recruiterId) => {
    try {
       const response = await instance.get(`/job/get_jobs/${recruiterId}`);
    const data = await response.data;
    return data;
  }catch (error) {
      return error.response.data;
    }
  }
);

const emploiSlice = createSlice({
  name: 'emploi',
  initialState: {
    emplois: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmploisByRecruiter.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmploisByRecruiter.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.emplois = action.payload;
      })
      .addCase(fetchEmploisByRecruiter.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default emploiSlice.reducer;
