import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for adding an item to the cart
export const addItemToCart = createAsyncThunk('cart/addItemToCart', async ({ productId, quantity }) => {
    const token = localStorage.getItem('token');
    const response = await axios.post('http://localhost:5000/api/cart/addToCart', { productId, quantity }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data; 
});

// Async thunk for fetching cart items
export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/api/cart/getAllCart', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data; 
});

// Async thunk for removing an item from the cart
export const deleteItemFromCart = createAsyncThunk('cart/deleteItemFromCart', async (productId) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`http://localhost:5000/api/cart/deleteItemFromCart/${productId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data; 
});

// Async thunk for emptying the cart
export const emptyCart = createAsyncThunk('cart/emptyCart', async () => {
    const token = localStorage.getItem('token');
    const response = await axios.delete('http://localhost:5000/api/cart/emptyCart', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data; 
});

// Async thunk for updating item quantity in the cart
export const updateQuantity = createAsyncThunk('cart/updateQuantity', async ({ productId, quantity }) => {
    const token = localStorage.getItem('token');
    console.log("in CartSlice",productId,quantity);
    const response = await axios.put('http://localhost:5000/api/cart/updateQuantity', { productId, quantity }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data; 
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalPrice: 0,
    },
    reducers: {
        clearCart(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addItemToCart.fulfilled, (state, action) => {
                state.items = action.payload.items; 
                state.totalPrice = action.payload.totalPrice; 
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.items = action.payload.items; 
                state.totalPrice = action.payload.totalPrice; 
            })
            .addCase(deleteItemFromCart.fulfilled, (state, action) => {
                state.items = action.payload.items; // Assuming this matches the API response structure
                state.totalPrice = action.payload.totalPrice; // Assuming this matches the API response structure
            })
            .addCase(emptyCart.fulfilled, (state) => {
                state.items = []; 
                state.totalPrice = 0; 
            })
            .addCase(updateQuantity.fulfilled, (state, action) => {
                // Update the cart items and totalPrice from the server response
                console.log('Update Quantity Response:', action.payload); // Debugging line
                state.items = action.payload.items; 
                state.totalPrice = action.payload.totalPrice; 
            });
    },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
