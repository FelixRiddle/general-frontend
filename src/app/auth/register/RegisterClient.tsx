'use client';

import { useFormStatus } from 'react-dom';

import { register } from '@/api/auth/register';
import { RegisterInputType, Status } from 'felixriddle.good-roots-ts-api';
import { buttonClasses, formAlternativeFormsContainerClasses,
    formContainerClasses, fullwidthInputClasses, hrClasses, linkClasses } from '@/tailwindStyles';
import RegisterResultType from '@/types/auth/RegisterResultType';
import StatusMessage from '@/app/components/feedback/StatusMessage/StatusMessage';
import { SetStateAction, useState } from 'react';

/**
 * Field status messages
 */
interface FieldStatusMessages {
    name: Status | undefined,
    password: Status | undefined,
    confirmPassword: Status | undefined,
    email: Status | undefined,
};

/**
 * Get field status messages
 * 
 * One of each
 * We may have more than one message for the same field that's what this function filters
 */
function getStatusMessages(messages: Array<Status>) {
    let nameStatus: Status | undefined = undefined;
    let passwordStatus: Status | undefined = undefined;
    let confirmPasswordStatus: Status | undefined = undefined;
    let emailStatus: Status | undefined = undefined;
    for(const msg of messages) {
        // Skip those that don't have the field
        if(!msg.field) {
            continue;
        }
        
        const missing = !nameStatus || !passwordStatus || !confirmPasswordStatus || !emailStatus;
        
        // If we have all, there's no need to continue
        if(!missing) {
            break;
        }
        
        label1: switch(msg.field) {
            case 'name': {
                // Name status
                if(!nameStatus) {
                    nameStatus = msg;
                }
                break label1;
            }
            case 'password': {
                // Password status
                if(!passwordStatus) {
                    passwordStatus = msg;
                }
                break label1;
            }
            case 'confirmPassword': {
                // Confirm password status
                if(!confirmPasswordStatus) {
                    confirmPasswordStatus = msg;
                }
                break label1;
            }
            case 'email': {
                // Email status
                if(!emailStatus) {
                    emailStatus = msg;
                }
                break label1;
            }
        }
    }
    
    const statusMessages: FieldStatusMessages = {
        name: nameStatus,
        password: passwordStatus,
        confirmPassword: confirmPasswordStatus,
        email: emailStatus,
    }
    
    return statusMessages;
}

type FieldStatusMessagesResult = FieldStatusMessages | undefined;

/**
 * Register
 * 
 * @returns 
 */
export default function RegisterClient() {
    // Field messages state
    let [fieldMessages, setFieldMessages] = useState<FieldStatusMessagesResult>(undefined);
    
    /**
     * On register success call this callback
     * 
     * This will update 'fieldMessages' state
     * 
     * @param registerResult 
     * @returns 
     */
    const resultCb = (registerResult: RegisterResultType | undefined) => {
        // Validate data
        if(!registerResult) {
            console.error(`Something went wrong!`);
            return;
        }
        
        // Get messages
        const messages = registerResult.messages;
        
        // Take a single message for each field
        const newfieldMessages = getStatusMessages(messages);
        console.log(`Field messages: `, fieldMessages);
        
        // Update field messages state with the new messages
        setFieldMessages(newfieldMessages);
    }
    
    return (
        <form>
            <div className={formContainerClasses}>
                <h1>Register</h1>
                <p>Fill this formulary to create an account.</p>
                <hr className={hrClasses} />
                
                {/* Name */}
                <div>
                    <label htmlFor="name">Name</label>
                    <input className={fullwidthInputClasses} type="text" id="name" name="name" placeholder="Name" required />
                </div>
                
                {/* Name status message */}
                {fieldMessages && fieldMessages.name && (
                    <StatusMessage status={fieldMessages.name} />
                )}
                
                {/* Email */}
                <div>
                    <label htmlFor="email">Email</label>
                    <input className={fullwidthInputClasses} type="email" id="email" name="email" placeholder="Email" required />
                </div>
                {/* Email status message */}
                {fieldMessages && fieldMessages.email && (
                    <StatusMessage status={fieldMessages.email} />
                )}
                
                {/* Password */}
                <div>
                    <label htmlFor="password">Password</label>
                    <input className={fullwidthInputClasses} type="password" id="password"
                        name="password" placeholder="Password" required />
                </div>
                {/* Password status message */}
                {fieldMessages && fieldMessages.password && (
                    <StatusMessage status={fieldMessages.password} />
                )}
                
                {/* Confirm password */}
                <div>
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input className={fullwidthInputClasses} type="password" id="confirmPassword"
                        name="confirmPassword" placeholder="Confirm password" required />
                </div>
                {/* Confirm password status message */}
                {fieldMessages && fieldMessages.confirmPassword && (
                    <StatusMessage status={fieldMessages.confirmPassword} />
                )}
                
                <hr className={hrClasses} />
                
                {/* Button */}
                <RegisterButton resultCb={resultCb} />
            </div>
            
            <div className={formAlternativeFormsContainerClasses}>
                <p>Already have an account? <a className={linkClasses} href="/auth/login">Sign in</a></p>
            </div>
        </form>
    );
}

/**
 * Login button
 * 
 * Callback to return state
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
        
        const registerResult = await register(userData)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                console.error(err);
                return undefined;
            });
        
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
