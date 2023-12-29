import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import PublicRoutes from "./routers/PublicRoutes";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={PublicRoutes} />
    </HelmetProvider>
  </React.StrictMode>
);
