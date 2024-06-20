import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../../utils/setAuthToken';

export const fetchUserApplications = createAsyncThunk(
  'applications/fetchUserApplications',
  async (userId) => {
    try {
      const response = await instance.get(`/application/get_user_applications/${userId}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const applicationSlice = createSlice({
  name: 'applications',
  initialState: {
    applications: [],
    loading: false,
    error: null,
    status: 'idle'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchUserApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload;
        state.error = null;
        state.status = 'succeeded'; 
      })
      .addCase(fetchUserApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = 'failed'; 
      });
  }
});

export default applicationSlice.reducer;
