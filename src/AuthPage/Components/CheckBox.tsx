import type React from 'react';
import styles from './CheckBox.module.css'

type CheckBoxPropsType = {
    name: string;
    label: string;
    checked: boolean;
    error?: string;
    touched?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export function Checkbox({ name, label, checked, error, touched, onChange, onBlur }: CheckBoxPropsType) {
    return (
        <div >
            <label >
                <input 
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    onBlur={onBlur}
                    style={styles}
                />
                {label}
            </label>
            {touched && error && <span>{error}</span>}
        </div>
    )
}

