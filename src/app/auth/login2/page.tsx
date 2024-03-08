'use client'

import { authenticate } from '@/app/lib/auth/login2'
 
import { useFormState, useFormStatus } from 'react-dom'

/**
 * Main page
 * 
 * [PROBLEM], authenticate is not being called at all.
 * 
 * @returns 
 */
export default function Page() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined)
    
    return (
        <form id="loginForm" action={dispatch}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Email" required />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Password" required />
            </div>
            
            {/* Show error message */}
            <div>{errorMessage && <p>{errorMessage}</p>}</div>
            
            {/* Button */}
            <LoginButton />
        </form>
    )
}

/**
 * Login button
 * 
 * @returns 
 */
function LoginButton() {
    const { pending } = useFormStatus()

    const onClick = async (event: any) => {
        event.preventDefault();
        console.log(`Prevented default`);
    }
    
    return (
        <button aria-disabled={pending} type="submit" onClick={onClick}>
            Login
        </button>
    );
}
