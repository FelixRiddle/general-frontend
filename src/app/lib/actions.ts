'use server';

import { login } from "@/auth/login";
import LoginInputType from "@/types/auth/LoginInputType";

/**
 * Function to authenticate
 * 
 * A little redudant
 * 
 * @param _currentState 
 * @param formData 
 */
export async function authenticate(userData: LoginInputType) {
    try {
        console.log(`Data: `, userData);
        const result = await login(userData);
    } catch(error: any) {
        console.error(error);
        
        if (error) {
            switch (error.type) {
            case 'CredentialsSignin':
                return 'Invalid credentials.'
            default:
                return 'Something went wrong.'
            }
        }
        
        throw error
    }
}
