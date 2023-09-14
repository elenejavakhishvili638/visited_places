import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import User from './user/pages/User';
import ErrorPage from './shared/components/error-page';
import NewPlace from './places/pages/NewPlace';

const router = createBrowserRouter([
  {
    path: "/",
    element: <User />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/palces/new",
    element: <NewPlace />,
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
