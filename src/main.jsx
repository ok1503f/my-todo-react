import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Register from "./auth/register/Register.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./home/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "home",
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
  <RouterProvider router={router} />
  //</React.StrictMode>
);
