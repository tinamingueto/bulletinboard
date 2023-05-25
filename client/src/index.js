import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App';
import ErrorPage from './pages/errorPage';
import Login from './pages/login';
import Register from './pages/register';
import CreateArticle from './pages/createArticle';
import Article from './pages/article';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
  },{
    path: '/pages/login',
    element: <Login />
  },{
    path: '/pages/register',
    element: <Register />
  },{
    path: '/pages/createArticle',
    element: <CreateArticle />
  },{
    path: '/pages/article/:id',
    element: <Article />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
