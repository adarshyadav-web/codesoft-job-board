
import { configureStore } from '@reduxjs/toolkit'
import { alertSlice } from './features/alertSlice';
import { authSlice } from './features/auth/authSlice';

export default configureStore({
    reducer: {
        alert: alertSlice.reducer,
        auth: authSlice.reducer,
    },
});