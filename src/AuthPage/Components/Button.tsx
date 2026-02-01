import type React from 'react';
import styles from './Button.module.css'


type ButtonProps ={
    type?:'button' | 'submit' | 'reset';
    disabled:boolean;
    children:React.ReactNode;
}

export function Button({type='button',disabled=false,children}:ButtonProps) {

    return (
        <button type={type} disabled={disabled} className={styles.button}>
            {children}
        </button>
    )
}   
