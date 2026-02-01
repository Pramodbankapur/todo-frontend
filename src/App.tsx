import { SignupForm } from "./AuthPage/Pages/SignupForm/auth/SignupForm";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginForm } from "./AuthPage/Pages/LoginForm/components/LoginForm";


function App() {


  return (
    <BrowserRouter>
      <Routes>
        {/* default Route */}
        <Route path="/" element={<Navigate to='/signup' replace/>}/>

        <Route path="/signup" element={<SignupForm/>}/>
        <Route path="/login" element={<LoginForm/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
