import { LoginForm } from "./AuthPage/Pages/LoginForm/Login";
import { SignupForm } from "./AuthPage/Pages/SignupForm/auth/SignupForm";
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import AppRoutes from "./routes/AppRoutes";

function App() {

  return (
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
  )
}

export default App