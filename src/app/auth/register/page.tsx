'use client';

import { useFormStatus } from 'react-dom';

import { register } from '@/api/auth/register';
import { RegisterInputType } from 'felixriddle.good-roots-ts-api';
import { buttonClasses, formAlternativeFormsContainerClasses,
    formContainerClasses, fullwidthInputClasses, hrClasses, linkClasses } from '@/tailwindStyles';
import RegisterResultType from '@/types/auth/RegisterResultType';

/**
 * Register
 * 
 * @returns 
 */
export default function Register() {
    const resultCb = (registerResult: RegisterResultType | undefined) => {
        if(!registerResult) {
            console.error(`Something went wrong!`);
            return;
        }
        
        console.log(`(Cb)Register result: `, registerResult);
    }
    
    return (
        <form>
            <div className={formContainerClasses}>
                <h1>Register</h1>
                <p>Fill this formulary to create an account.</p>
                <hr className={hrClasses} />
                
                <div>
                    <label htmlFor="name">Name</label>
                    <input className={fullwidthInputClasses} type="text" id="name" name="name" placeholder="Name" required />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input className={fullwidthInputClasses} type="email" id="email" name="email" placeholder="Email" required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input className={fullwidthInputClasses} type="password" id="password"
                        name="password" placeholder="Password" required />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input className={fullwidthInputClasses} type="password" id="confirmPassword"
                        name="confirmPassword" placeholder="Confirm password" required />
                </div>
                <hr className={hrClasses} />
                
                {/* Button */}
                {/* <RegisterButton resultCb={resultCb} /> */}
                <RegisterButtonA />
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
function RegisterButtonA() {
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
                return res;
            })
            .catch((err) => {
                console.error(err);
                return undefined;
            });
    }
    
    return (
        <button
            className={buttonClasses}
            aria-disabled={pending}
            type="submit"
            onClick={onClick}
        >
            Register
        </button>
    );
}

/**
 * Login button
 */
function RegisterButton({ resultCb }: { resultCb: (res: RegisterResultType | undefined) => void }) {
    const { pending } = useFormStatus();
    
    const onClick = async (event: any) => {
        console.log(`Register was clicked`);
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
        
        console.log(`Registering user`);
        const registerResult = await register(userData)
            .then((res) => {
                console.log(`Success`);
                return res;
            })
            .catch((err) => {
                console.error(err);
                return undefined;
            });
        
        console.log(`Register result: `, registerResult);
        
        resultCb(registerResult);
    }
    
    return (
        <button
            className={buttonClasses}
            aria-disabled={pending}
            type="submit"
            onClick={onClick}
        >
            Register
        </button>
    );
}
