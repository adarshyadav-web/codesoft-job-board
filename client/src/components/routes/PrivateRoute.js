
import React, { useEffect } from 'react'
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from '../../redux/features/auth/authSlice';
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ children }) => {
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();


    const getUser = async () => {
        try {
            dispatch(showLoading());
            const { data } = await axios.post('/api/v1/user/getUser', { token: localStorage.getItem('token') }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading());
            if (data.success) {
                dispatch(setUser(data.data));
            } else {
                localStorage.removeItem('token');
                <Navigate to="/login" />
            }
        } catch (error) {
            localStorage.removeItem('token');
            dispatch(hideLoading());
            console.error("Error fetching user data:", error);
        }
    }
    useEffect(() => {
        if (!user) {
            getUser();
        }

    });
    if (localStorage.getItem('token')) {
        return children // or a spinner
    } else {
        return <Navigate to="/login" />
    }
}

export default PrivateRoute
