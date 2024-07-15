import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/App.tsx";
import "./styles/index.css";
import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

axios.defaults.baseURL = "http://localhost:3000/api";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
        <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);