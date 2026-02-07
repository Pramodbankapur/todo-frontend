import {  Outlet, Route, Routes } from "react-router-dom";
import { LoginForm } from "../AuthPage/Pages/LoginForm/Login";
import { SignupForm } from "../AuthPage/Pages/SignupForm/auth/SignupForm";

export function AuthLayout(){
    return (
        <div>
            <Outlet/>
        </div>
    )
}
