import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const useAuthRedirect = (requireAuth = true) => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (requireAuth && !isAuthenticated) {
            navigate('/admin/login');
        } else if (!requireAuth && isAuthenticated) {
            navigate('/admin');
        }
    }, [isAuthenticated, requireAuth, navigate]);

    return isAuthenticated;
};