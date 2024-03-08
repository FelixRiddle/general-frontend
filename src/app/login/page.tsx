'use client';

import { authenticate } from "@/app/lib/actions";
import { useFormState, useFormStatus } from 'react-dom';

/**
 * Page
 * 
 * @returns 
 */
export default function Page() {
    // const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    
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
            
            {/* Show error message */}
            {/* <div>{errorMessage && <p>{errorMessage}</p>}</div> */}
            
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
        
        // const loginFormElement: HTMLElement | null = document.getElementById("loginForm");
        
        // // Unnecessary, how can I cast it
        // if(!(loginFormElement instanceof HTMLFormElement) || !loginFormElement) {
        //     console.error("Form element not found");
        //     return;
        // }
        
        // const loginForm = loginFormElement;
        
        const emailEl: any = document.getElementById("email");
        if(!emailEl) return console.error("No email element");
        
        const passwordEl: any = document.getElementById("password");
        if(!passwordEl) return console.error("No password element");
        
        const userData = {
            email: emailEl.value,
            password: passwordEl.value,
        }
        
        await authenticate(userData)
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
