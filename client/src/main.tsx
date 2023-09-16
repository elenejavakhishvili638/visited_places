import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Users from './user/pages/Users';
import ErrorPage from './shared/components/error-page';
import NewPlace from './places/pages/NewPlace';
import Layout from './shared/components/UiElements/Layout';

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
    path: "/palces/new",
    element: (
      <Layout>
        <NewPlace />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
