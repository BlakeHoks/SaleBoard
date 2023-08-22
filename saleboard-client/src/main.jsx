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
import { Auth } from "./components/pages/auth/Auth.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AdCreate } from "./components/pages/adCreate/AdCreate.jsx";
import { Catalog } from "./components/pages/catalog/Catalog.jsx";
import { RequireAuth } from "./components/layout/authLayer/RequireAuth.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route
        path="profile"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
      <Route path="auth" element={<Auth />} />
      <Route path="books" element={<Catalog category="Books" />} />
      <Route path="auto" element={<Catalog category="Auto" />} />
      <Route path="electronics" element={<Catalog category="Electronics" />} />
      <Route path="ad/:id" element={<Ad />} />
      <Route path="ad/create" element={<AdCreate />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>,
  ),
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
