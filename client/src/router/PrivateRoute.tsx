import { useContext } from 'react';
import { Navigate } from "react-router-dom";
import { AuthContext } from '../shared/context/AuthContext';
import { PrivateRouteProps } from './router';

export function PrivateRoute({ children }: PrivateRouteProps) {
    const auth = useContext(AuthContext);
    if (auth.isLoggedIn) {
        return children;
    }

    return <Navigate to="/auth" replace />;
}
