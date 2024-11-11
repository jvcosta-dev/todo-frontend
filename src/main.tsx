import "./locales/i18n";
import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AuthProvider from "./contexts/AuthContext";
import SettingsProvider from "./contexts/SettingsContext";
import PrivateRoute from "./components/PrivateRoute";

import { Layout } from "./components/ui/Layout";
import { Login } from "./pages/Login";
import { Notfound } from "./pages/Notfound";
import { Tasks } from "./pages/Tasks";
import { Dashboard } from "./pages/Dashboard";
import { Settings } from "./pages/Settings";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { Landing } from "./pages/Landing";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <SettingsProvider>
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route
                  element={
                    <Layout>
                      <Dashboard />
                    </Layout>
                  }
                  path="/dashboard"
                />
                <Route
                  element={
                    <Layout>
                      <Tasks />
                    </Layout>
                  }
                  path="/tasks"
                />
                <Route
                  element={
                    <Layout>
                      <Settings />
                    </Layout>
                  }
                  path="/settings"
                />
                <Route
                  element={
                    <Layout>
                      <Profile />
                    </Layout>
                  }
                  path="/profile"
                />
              </Route>
              <Route element={<Register />} path="/signup" />
              <Route element={<Login />} path="/login" />
              <Route
                element={
                  <Layout noSideBar>
                    <Landing />
                  </Layout>
                }
                path="/"
              />
              <Route element={<Notfound />} path="/*" />
            </Routes>
          </SettingsProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
