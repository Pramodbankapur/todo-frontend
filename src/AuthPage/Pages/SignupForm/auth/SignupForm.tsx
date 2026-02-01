import React, { useState } from "react";
import type { Errors, SignupFormData, Touched } from "./auth.types";
import styles from './SignupForm.module.css'
import authImage from '../../../Assets/SignupLoginPage.jpeg'
import { Checkbox } from "../../../Components/CheckBox";
import { Button } from "../../../Components/Button";
import Input from "../../../Components/Input";

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
    const { name, value, checked, type } = e.target;

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
        errors.firstName = 'First name is required';
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
        errors.email = 'Invalid email address';
    }

    if (formData.password.trim().length < 6) {
        errors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
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
                <h2>Sign up</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <Input name="firstName" label="First Name" type="text" icon=" 👤" value={formData.firstName} error={errors.firstName} touched={touched.firstName} onChange={handleChange} onBlur={handleBlur} />

                    <Input name="lastName" label="Last Name" type="text" icon="" value={formData.lastName} error={errors.lastName} touched={touched.lastName} onChange={handleChange} onBlur={handleBlur} />

                    <Input name="username" label="User Name" type="text" icon=" 👤" value={formData.username} error={errors.username} touched={touched.username} onChange={handleChange} onBlur={handleBlur} />

                    <Input name="email" label="Email" type="email" icon=" 📧" value={formData.email} error={errors.email} touched={touched.email} onChange={handleChange} onBlur={handleBlur} />

                    <Input name="password" label="Password" type="password" icon=" 🔒" value={formData.password} error={errors.password} touched={touched.password} onChange={handleChange} onBlur={handleBlur} />

                    <Input name="confirmPassword" label="Confirm Password" type="password" icon=" 🔒" value={formData.confirmPassword} error={errors.confirmPassword} touched={touched.confirmPassword} onChange={handleChange} onBlur={handleBlur} />

                    <Checkbox name="acceptedTerms" label="Accept Terms and conditions" checked={formData.acceptedTerms} error={errors.acceptedTerms} touched={touched.acceptedTerms} onChange={handleChange} onBlur={handleBlur} />
                    {/* SubmitButton Moved */}

                    <label className={styles.switchAuth}>
                        Already have an account? <a href="/login">Log in</a>
                    </label>
                    
                    <Button type="submit" disabled={!formData.acceptedTerms} >
                        Resgister
                    </Button>
                </form>
            </div>
        </div>
    </div>

    );
}
