import { useState } from 'react'
import styles from './LoginForm.module.css'
import loginImg from '../../../Assets/SinginLoginPage.png'

export function LoginForm(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    function handelLogin(){
        console.log(username,password)
    }

    return (
    <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
            <div className={styles.loginForm}>
                <h2>Sign In</h2>

                <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Enter Username/Email" />
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type="text" placeholder="Enter Password" />

                <label>
                    <input type="checkbox" />Remember Me
                </label>

                <button onClick={()=>handelLogin()}>Login</button>

                <p>Don't have an account? <a href="/signup">Sign up</a> </p>
            </div>
            <div className={styles.loginIllustration}>
                <img src={loginImg} alt="Image Failed to load" />
            </div>
        </div>
    </div>
    )
}