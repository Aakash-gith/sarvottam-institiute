import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = useSelector((state) => state.auth.status);
    const hasToken = localStorage.getItem('accessToken');

    if (!isLoggedIn && !hasToken) {
        return <Navigate to="/auth/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
