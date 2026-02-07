import { Routes, Route, Navigate } from "react-router-dom";
import DashboardHome from "../dashboard/pages/DashboardHome/DashboardHome";
import { AuthLayout } from "../layouts/AuthLayout";
import { LoginForm } from "../AuthPage/Pages/LoginForm/Login";
import { SignupForm } from "../AuthPage/Pages/SignupForm/auth/SignupForm";
import DashboardLayout from "../layouts/DashboardLayout";
import { TaskCard } from "../dashboard/pages/components/TaskCard";
import Statuschart from "../dashboard/pages/components/Statuschart";

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
            </Route>
            {/* Dashboard with nested routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="tasks" element={<TaskCard />} />
                <Route path="status" element={<Statuschart />} />
            </Route>

            {/* fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}
