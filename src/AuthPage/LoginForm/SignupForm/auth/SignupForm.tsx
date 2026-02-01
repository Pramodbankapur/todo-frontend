import React, { useState } from "react";
import type { Errors, SignupFormData, Touched } from "./auth.types";
import styles from './SignupForm.module.css'
import authImage from '../assets/ChatGPT Image Jan 29, 2026, 01_23_28 PM.jpeg'

const initialState: SignupFormData = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
};

export function SignupForm() {
    const [formData, setFormData] = useState<SignupFormData>(initialState);
    const [errors, setErrors] = useState<Errors>({});
    const [touched, setTouched] = useState<Touched>({});

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const validationErrors = validate(formData);
        setErrors(validationErrors);

        setTouched({
            firstName: true,
            lastName: true,
            username: true,
            email: true,
            password: true,
            confirmPassword: true,
            acceptedTerms: true,
        });
        if (Object.keys(validationErrors).length > 0) return;
        console.log('Signup Data:', formData);
    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    }

    function validate(formData: SignupFormData): Errors {
        const errors: Errors = {};
        if (!formData.firstName.trim()) {
            errors.firstName = 'First name is Required';
        }
        if (!formData.email.includes('@')) {
            errors.email = 'Invalid Email address';
        }
        if (formData.password.length < 6) { //Operator '<' cannot be applied to types 'boolean' and 'number'.ts(2365)
            errors.password = 'Password must be more than 6 Characters';
        }
        if (formData.password !== formData.confirmPassword) {//This comparison appears to be unintentional because the types 'boolean' and 'string' have no overlap.ts(2367)
            errors.confirmPassword = 'Passwords not missmatch';
        }
        if (!formData.acceptedTerms) {
            errors.acceptedTerms = 'You must accept the terms';
        }
        return errors;
    }

    return (<div className={styles.page}>
        <div className={styles.authCard}>
            <div className={styles.authIllustration}>
                <img src={authImage} alt="Filed to Load a imgae" />
            </div>
            <div className={styles.formWrapper}>
                <form onSubmit={handleSubmit} className={styles.field}>
                    {/* First name */}
                    

                    {/* Last Name */}
                    <div className={styles.field}>
                        <input
                            name="lastName"
                            placeholder=" "
                            value={formData.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${styles.input} ${touched.lastName && errors.lastName ? styles.inputError : ""
                                }`}
                        />
                        <label className={styles.label}>Last Name</label>
                        <span className={styles.icon}></span>

                        {touched.lastName && errors.lastName && (
                            <span className={styles.errorText}>{errors.lastName}</span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <input
                            name="username"
                            placeholder=" "
                            value={formData.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${styles.input} ${touched.username && errors.username ? styles.inputError : ""
                                }`}
                        />
                        <label className={styles.label}>User Name</label>
                        <span className={styles.icon}>👤</span>

                        {touched.username && errors.username && (
                            <span className={styles.errorText}>{errors.username}</span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <input
                            type="email"
                            name="email"
                            placeholder=" "
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${styles.input} ${touched.email && errors.email ? styles.inputError : ""
                                }`}
                        />
                        <label className={styles.label}>Email</label>
                        <span className={styles.icon}>📧</span>

                        {touched.email && errors.email && (
                            <span className={styles.errorText}>{errors.email}</span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <input
                            type="password"
                            name="password"
                            placeholder=" "
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${styles.input} ${touched.password && errors.password ? styles.inputError : ""
                                }`}
                        />
                        <label className={styles.label}>Password</label>
                        <span className={styles.icon}>🔒</span>

                        {touched.password && errors.password && (
                            <span className={styles.errorText}>{errors.password}</span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder=" "
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${styles.input} ${touched.confirmPassword && errors.confirmPassword ? styles.inputError : ""
                                }`}
                        />
                        <label className={styles.label}>Confirm Password</label>
                        <span className={styles.icon}>🔒</span>

                        {touched.confirmPassword && errors.confirmPassword && (
                            <span className={styles.errorText}>{errors.confirmPassword}</span>
                        )}
                    </div>

                    <div className={styles.checkbox}>
                        <label>
                            <input
                                type="checkbox"
                                name="acceptedTerms"
                                checked={formData.acceptedTerms}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            I agree to all terms
                        </label>

                        {touched.acceptedTerms && errors.acceptedTerms && (
                            <span className={styles.errorText}>{errors.acceptedTerms}</span>
                        )}
                    </div>

                    <button type="submit" disabled={!formData.acceptedTerms}>
                        Register
                    </button>

                    <label className={styles.checkbox}>
                        Already have an account?{" "}
                        <a href="/login">Log in</a>
                    </label>

                </form>
            </div>
        </div>
    </div>

    );
}
