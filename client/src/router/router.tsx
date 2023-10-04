import React from 'react'
import {
    createBrowserRouter,
    Navigate,

} from "react-router-dom";
import Users from '../user/pages/Users';
import ErrorPage from '../shared/components/error-page';
import NewPlace from '../places/pages/NewPlace';
import Layout from '../shared/components/UiElements/Layout';
import UserPlaces from '../places/pages/UserPlaces';
import UpdatePlace from '../places/pages/UpdatePlace';
import Auth from '../user/pages/Auth';
import { PrivateRoute } from './PrivateRoute';


export interface PrivateRouteProps {
    children: React.ReactNode;
}

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Layout>
                <Users />
            </Layout>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: "/auth",
        element: (
            <Layout>
                <Auth />
            </Layout>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: "/:userId/places",
        element: (
            <Layout>
                <UserPlaces />
            </Layout>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: "/places/new",
        element: (
            <Layout>
                <PrivateRoute>
                    <NewPlace />
                </PrivateRoute>
            </Layout>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: "/places/:placeId",
        element: (
            <Layout>
                <PrivateRoute>
                    <UpdatePlace />
                </PrivateRoute>
            </Layout>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
]);

export default router