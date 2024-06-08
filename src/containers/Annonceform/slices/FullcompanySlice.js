import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../../utils/setAuthToken';
import { toast } from 'react-toastify';

export const fetchCompany = createAsyncThunk(
    'companyProfile/fetchCompany',
    async (id) => {
      const response = await instance.get(`/user/recruiter/${id}`);
      return response.data;
  }
);

export const updateCompanyProfile = createAsyncThunk(
    'companyProfile/updateCompanyProfile',
    async (data) => {
        try {
            const response = await instance.put(`/user/update/${data.id}`, data.formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                
            });
            toast.success('Profil mis à jour avec succès !', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            window.location.reload();
            return response.data;
        
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil:', error);
            toast.error('Erreur lors de la mise à jour du profil !', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            throw error;
        }
    }
);

export const updateProfilPic = createAsyncThunk(
    'companyProfile/updateProfilPic',
    async ({ id, file }) => {
        try {
            const formData = new FormData();
            formData.append('profilpic', file);

            const response = await instance.put(`/user/update-profilpic/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'image de profil:', error);
            throw error;
        }
    }
);

export const updateCoverPic = createAsyncThunk(
    'companyProfile/updateCoverPic',
    async ({ id, file }) => {
        try {
            const formData = new FormData();
            formData.append('coverpic', file);

            const response = await instance.put(`/user/update-coverpic/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'image de couverture:', error);
            throw error;
        }
    }
);

const companyProfileSlice = createSlice({
    name: 'companyProfile',
    initialState: {
        companyData: {},
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompany.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCompany.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.companyData = action.payload;
            })
            .addCase(fetchCompany.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateCompanyProfile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateCompanyProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.companyData = action.payload;
            })
            .addCase(updateCompanyProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateProfilPic.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateProfilPic.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.companyData.profilpic = action.payload.profilpic;
            })
            .addCase(updateProfilPic.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateCoverPic.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateCoverPic.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.companyData.coverpic = action.payload.coverpic;
            })
            .addCase(updateCoverPic.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default companyProfileSlice.reducer;
