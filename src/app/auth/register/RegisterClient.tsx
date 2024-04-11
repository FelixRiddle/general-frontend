'use client';

import { useFormStatus } from 'react-dom';
import { Dispatch, SetStateAction, useState } from 'react';

import { register } from '@/api/auth/register';
import { RegisterInputType, Status } from 'felixriddle.good-roots-ts-api';
import { buttonClasses, formAlternativeFormsContainerClasses,
    formContainerClasses, fullwidthInputClasses, hrClasses, linkClasses, 
    navbarButtonClasses} from '@/tailwindStyles';
import RegisterResultType from '@/types/auth/RegisterResultType';
import StatusMessage from '@/app/components/feedback/StatusMessage/StatusMessage';

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
 * One of each type
 * We may have more than one message for the same field that's what this function filters
 */
function getStatusMessages(messages: Array<Status>, options: {
    removeItems: boolean,
    setFieldMessages: Dispatch<SetStateAction<FieldStatusMessagesResult>> | undefined,
} = {
    removeItems: false,
    setFieldMessages: undefined,
}) {
    let nameStatus: Status | undefined = undefined;
    let passwordStatus: Status | undefined = undefined;
    let confirmPasswordStatus: Status | undefined = undefined;
    let emailStatus: Status | undefined = undefined;
    
    // Store index of items that we've taken
    let index = 0;
    const popItems: Array<number> = [];
    
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
                    
                    // Item to push
                    popItems.push(index);
                }
                break label1;
            }
            case 'password': {
                // Password status
                if(!passwordStatus) {
                    passwordStatus = msg;
                    
                    // Item to push
                    popItems.push(index);
                }
                break label1;
            }
            case 'confirmPassword': {
                // Confirm password status
                if(!confirmPasswordStatus) {
                    confirmPasswordStatus = msg;
                    
                    // Item to push
                    popItems.push(index);
                }
                break label1;
            }
            case 'email': {
                // Email status
                if(!emailStatus) {
                    emailStatus = msg;
                    
                    // Item to push
                    popItems.push(index);
                }
                break label1;
            }
        }
        
        index++;
    }
    
    // I wanted to remove the items but I don't remember why
    // // Remove items
    // if(options.removeItems && options.setFieldMessages) {
    //     if(popItems.length > 0) {
    //         // Sort from greater to lower
    //         const popIndexes = popItems.sort((a, b) => b - a);
    //         console.log(`Pop indexes: `, popIndexes);
    //         for(const index of popIndexes) {
    //             options.setFieldMessages((msgs) => {
    //                 return msgs.
    //             })
    //         }
    //     }
    // }
    
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
        // console.log(`Register result: `, registerResult);
        if(registerResult.userRegistered) {
            // Successfully registered the user
            location.href = "/auth/login";
        }
        
        // Get messages
        const messages = registerResult.messages;
        
        // Take a single message for each field
        const newfieldMessages = getStatusMessages(messages, {
            removeItems: true,
            setFieldMessages,
        });
        // console.log(`Field messages: `, fieldMessages);
        
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
    
    // On register button click
    const onClick = async (event: any) => {
        event.preventDefault();
        
        const nameEl = document.getElementById("name") as HTMLInputElement;
        if(!nameEl) return console.error("No name element");
        
        const emailEl = document.getElementById("email") as HTMLInputElement;
        if(!emailEl) return console.error("No email element");
        
        const passwordEl = document.getElementById("password") as HTMLInputElement;
        if(!passwordEl) return console.error("No password element");
        
        const confirmPasswordEl = document.getElementById("confirmPassword") as HTMLInputElement;
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
            className={navbarButtonClasses}
            aria-disabled={pending}
            type="submit"
            onClick={onClick}
        >
            Register
        </button>
    );
}
