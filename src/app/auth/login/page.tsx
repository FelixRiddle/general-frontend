'use client';

import styles from "./login.module.css";
import { login } from "@/api/auth/login";
import { buttonClasses, formAlternativeFormsContainerClasses,
    formContainerClasses, fullwidthInputClasses, hrClasses, linkClasses, 
    navbarButtonClasses} from '@/tailwindStyles';

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
                
                {/* Remember to use this instead */}
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        className={fullwidthInputClasses}
                        // className={`${styles.fullWidthInput}`}
                        // All these are so similar is actually funny
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        className={fullwidthInputClasses}
                        // className={styles.fullWidthInput}
                        type="password" id="password"
                        name="password" placeholder="Password"
                        required />
                </div>
                <hr className={hrClasses} />
                
                {/* Button */}
                <LoginButton />
            </div>
            
            <div className={formAlternativeFormsContainerClasses}>
                <p>Don't have an account? <a className={linkClasses} href="/auth/register">Sign up</a></p>
            </div>
        </form>
    );
}

/**
 * Login button
 */
function LoginButton() {
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
        
        const result = await login(userData)
            .then((res) => {
                if(res.token) {
                    location.href = "/";
                }
            })
            .catch((err) => {
                console.log(`Error when trying to log in(1).`);
                console.error(err);
            });
    }
    
    return (
        <button type="submit" onClick={onClick} className={navbarButtonClasses}>
            Login
        </button>
    );
}
