import type React from 'react';
import styles from './Input.module.css'

type InputProps = {
    name: string;
    label: string;
    type: string;
    icon?: string;
    value: string;
    error?: string;
    touched?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: React.ChangeEventHandler<HTMLInputElement>;

}

export default function Input({ name, label, type, icon, value, error, touched, onChange, onBlur 
}: InputProps) {
     const hasError = touched && !!error
    return (
        <div className={styles.field} >
            <input type={type} name={name} placeholder='' value={value} onChange={onChange} onBlur={onBlur}
                 className={`${styles.input} ${hasError ? styles.inputError : ''}`}
            />
            <label className={styles.label}>{label}</label>
            {icon && <span className={styles.icon}>{icon}</span>}
            {touched && error && (
                <span className={styles.errorText}>{error}</span>
            )}

        </div>
    )
}

