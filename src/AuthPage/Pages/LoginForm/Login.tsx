import React, { useState } from "react";
import styles from './LoginForm.module.css';
import loginImg from '../../Assets/SinginLoginPage.png';
import { Checkbox } from "../../Components/CheckBox";
import { Button } from "../../Components/Button";
import Input from "../../Components/Input";
import type { ErrorsSingin, SinginData , TouchedSignin } from "../SignupForm/auth/auth.types";

export function LoginForm() {
    const [touched, setTouched] = useState<TouchedSignin>({ username: true, password: true });
    const [errros,setErrors] = useState<ErrorsSingin>({});

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        rememberMe: false,
    });

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, checked, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    // Submit Handle
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const validationErrors = validate(formData);
        setErrors(validationErrors);

        setTouched({
            username: true,
            password: true,
        });
        if (Object.keys(validationErrors).length > 0) return;
        console.log('Signup Data:', formData);
    }


// Validatae
        function validate(formData: SinginData): ErrorsSingin {
            const errros: ErrorsSingin = {};
    
            if (!formData.username.trim()) {
                errros.username = 'First name is required';
            }
    
            if (formData.password.trim().length < 6) {
                errros.password = 'Password must be at least 6 characters';
            }
            return errros;
        }


    return (
        <div className={styles.page}>
            <div className={styles.authCard}>
                <div className={styles.authIllustration}>
                    <img src={loginImg} alt="Failed to load image" />
                </div>

                <div className={styles.formWrapper}>
                    <h2>Sign In</h2>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <Input
                            name="username"
                            label="Username or Email"
                            type="text"
                            icon=" 👤"
                            value={formData.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched.username}
                        />

                        <Input
                            name="password"
                            label="Password"
                            type="password"
                            icon=" 🔒"
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched.password}
                        />

                        <Checkbox
                            name="rememberMe"
                            label="Remember Me"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        <label className={styles.switchAuth}>
                            Don’t have an account? <a href="/signup">Sign up</a>
                        </label>

                        <Button
                            type="submit"
                            disabled={!formData.username || !formData.password}
                        >
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
