'use client';

import { register } from '@/app/lib/auth/register';
import { useFormStatus } from 'react-dom';
import styles from "./styles.module.css";
import { RegisterInputType } from 'felixriddle.good-roots-ts-api';

/**
 * Register
 * 
 * @returns 
 */
export default function Register() {
    const inputTailwindClasses = "rounded";
    
    return (
        <form>
            <div className={`${styles.container} ${styles.general}`}>
                <h1>Register</h1>
                <p>Fill this formulary to create an account.</p>
                <hr className={`${styles.hr} ${styles.general}`} />
                
                <div>
                    <label htmlFor="name">Name</label>
                    <input className={`${styles.fullWidthInput} ${inputTailwindClasses}`} type="text" id="name" name="name" placeholder="Name" required />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input className={`${styles.fullWidthInput} ${inputTailwindClasses}`} type="email" id="email" name="email" placeholder="Email" required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input className={`${styles.fullWidthInput} ${inputTailwindClasses}`} type="password" id="password"
                        name="password" placeholder="Password" required />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input className={`${styles.fullWidthInput} ${inputTailwindClasses}`} type="password" id="confirmPassword"
                        name="confirmPassword" placeholder="Confirm password" required />
                </div>
                <hr className={`${styles.hr} ${styles.general}`} />
                
                {/* Button */}
                <RegisterButton />
            </div>
            
            <div className={`${styles.container} ${styles.signin}`}>
                <p>Already have an account? <a className={`${styles.link}`} href="/auth/login">Sign in</a></p>
            </div>
        </form>
    );
}

/**
 * Login button
 */
function RegisterButton() {
    const { pending } = useFormStatus();
    
    const onClick = async (event: any) => {
        event.preventDefault();
        
        const nameEl: any = document.getElementById("name");
        if(!nameEl) return console.error("No name element");
        
        const emailEl: any = document.getElementById("email");
        if(!emailEl) return console.error("No email element");
        
        const passwordEl: any = document.getElementById("password");
        if(!passwordEl) return console.error("No password element");
        
        const confirmPasswordEl: any = document.getElementById("confirmPassword");
        if(!confirmPasswordEl) return console.error("No confirm password element");
        
        const userData: RegisterInputType = {
            name: nameEl.value,
            email: emailEl.value,
            password: passwordEl.value,
            confirmPassword: confirmPasswordEl.value,
        };
        
        await register(userData)
            .then((res) => {
                console.log(`Success`);
            })
            .catch((err) => {
                console.error(err);
            });
    }
    
    return (
        <button
            className={`${styles.registerBtn} bg-slate-800 p-3 m-1 hover:bg-slate-500 rounded`}
            aria-disabled={pending} type="submit" onClick={onClick}>
            Register
        </button>
    );
}
