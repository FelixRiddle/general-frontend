'use client';

import { register } from '@/app/lib/auth/register';
import { useFormStatus } from 'react-dom';
import { RegisterInputType } from "good-roots-ts-api"

/**
 * Register
 * 
 * @returns 
 */
export default function Register() {
    return (
        <form id="loginForm">
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Name" required />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Email" required />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password"
                    name="password" placeholder="Password" required />
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm password</label>
                <input type="password" id="confirmPassword"
                    name="confirmPassword" placeholder="Confirm password" required />
            </div>
            
            {/* Button */}
            <LoginButton />
        </form>
    );
}

/**
 * Login button
 */
function LoginButton() {
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
        <button aria-disabled={pending} type="submit" onClick={onClick}>
            Login
        </button>
    );
}
