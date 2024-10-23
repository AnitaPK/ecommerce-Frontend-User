import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for user registration
export const registerUser = createAsyncThunk('auth/registerUser', async (userData) => {
    const response = await axios.post('http://localhost:5000/api/auth/register', userData);
    return response.data; 
});

// Async thunk for user login
export const loginUser = createAsyncThunk('auth/loginUser', async (userData) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', userData);
    return response.data; 
});

// Async thunk for getting user info
export const getUserInfo = createAsyncThunk('auth/getUserInfo', async () => {
    const response = await axios.get('http://localhost:5000/api/auth/getUserInfo', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
        }
    });
    return response.data; 
});

// Create a slice
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
    },
    reducers: {
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token'); 
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; 
                state.isAuthenticated = true; 
                localStorage.setItem('token', action.payload.token); 
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; 
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                // state.user = action.payload; 
                state.isAuthenticated = true; 
                localStorage.setItem('token', action.payload.token); 
                getUserInfo();
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; 
            })
            .addCase(getUserInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; 
                state.isAuthenticated = true;  
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; 
            });
    }
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
