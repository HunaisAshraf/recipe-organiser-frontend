import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AddRecipe from "./pages/AddRecipe.jsx";
import EditRecipe from "./pages/EditRecipe.jsx";
import AddCategory from "./pages/AddCategory.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Home />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/add-recipe",
        element: (
          <ProtectedRoute>
            <AddRecipe />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/edit-recipe/:id",
        element: (
          <ProtectedRoute>
            <EditRecipe />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/add-category",
        element: (
          <ProtectedRoute>
            <AddCategory />,
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
