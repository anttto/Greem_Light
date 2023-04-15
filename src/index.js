import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import Home from "./pages/Home";
import MyArtwork from "./pages/MyArtwork";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Liked from "./pages/Liked";
import AddProduct from "./pages/AddProduct";
// import ProtectedRoute from "./pages/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "/artworks", element: <MyArtwork /> },
      {
        path: "/upload",
        element: (
          // <ProtectedRoute requireAdmie={true}>
          <AddProduct />
          // </ProtectedRoute>
        ),
      },
      { path: "/artworks/:productId", element: <ProductDetail /> },
      { path: "/edit/:productId", element: <AddProduct /> },
      { path: "/liked", element: <Liked /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

reportWebVitals();
