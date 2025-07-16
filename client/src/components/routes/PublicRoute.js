
import React from 'react'
import { Navigate } from 'react-router-dom';
const PublicRoute = ({ children }) => {
    if (localStorage.getItem('token')) {
        return <Navigate to="/dashboard" />
    } else {
        return children; // Render the child components if not authenticated
    }
}

export default PublicRoute
