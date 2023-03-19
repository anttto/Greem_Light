import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import App from './App';
import Home from './pages/Home';
import AllProducts from './components/AllProducts';

import NotFound from './pages/NotFound';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import NewProducts from './pages/NewProducts';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <NotFound/>,
    children: [
      {index:true, element:<Home/>},
      {path:'/products', element:<AllProducts/>},
      {path:'/products/new', element:<NewProducts/>},
      {path:'/products/:id', element:<ProductDetail/>},
      {path:'/cart', element:<Cart/>},
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
