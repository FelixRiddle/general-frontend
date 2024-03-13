'use client';

import { useFormStatus } from 'react-dom';

import { login } from "@/app/api/auth/login";
import { buttonClasses, formAlternativeFormsContainerClasses,
    formContainerClasses, fullwidthInputClasses, hrClasses, linkClasses } from '@/tailwindStyles';

/**
 * Page
 * 
 * @returns 
 */
export default function Page() {
    return (
        <form>
            <div className={formContainerClasses}>
                <h1>Login</h1>
                <p>Log in to an existing account</p>
                <hr className={hrClasses} />
                
                <div>
                    <label htmlFor="email">Email</label>
                    <input className={fullwidthInputClasses} type="email" id="email" name="email" placeholder="Email" required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input className={fullwidthInputClasses} type="password" id="password"
                        name="password" placeholder="Password" required />
                </div>
                <hr className={hrClasses} />
                
                {/* Button */}
                <LoginButton />
            </div>
            
            <div className={formAlternativeFormsContainerClasses}>
                <p>Already have an account? <a className={linkClasses} href="/auth/login">Sign in</a></p>
            </div>
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
        console.log(`User trying to login`);
        
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
        <button aria-disabled={pending} type="submit" onClick={onClick} className={buttonClasses}>
            Login
        </button>
    )
}
