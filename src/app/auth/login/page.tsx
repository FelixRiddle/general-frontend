'use client';

import { useFormStatus } from 'react-dom';

import { login } from "@/app/lib/auth/login";

/**
 * Page
 * 
 * @returns 
 */
export default function Page() {
    return (
        <form id="loginForm">
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Email" required />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Password" required />
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
        
        const emailEl: any = document.getElementById("email");
        if(!emailEl) return console.error("No email element");
        
        const passwordEl: any = document.getElementById("password");
        if(!passwordEl) return console.error("No password element");
        
        const userData = {
            email: emailEl.value,
            password: passwordEl.value,
        }
        
        await login(userData)
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
    )
}
