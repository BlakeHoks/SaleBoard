import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.scss";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "./components/layout/Layout.jsx";
import { HomePage } from "./components/pages/home/HomePage.jsx";
import { ErrorPage } from "./components/pages/error/ErrorPage.jsx";
import { Profile } from "./components/pages/profile/Profile.jsx";
import { Ad } from "./components/pages/ad/Ad.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="profile" element={<Profile />} />
      <Route path="ad/:id" element={<Ad />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
