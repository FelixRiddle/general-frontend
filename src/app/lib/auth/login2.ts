'use server';
 
import { login } from '@/api/auth/login';

/**
 * Authentication
 * 
 * @param _currentState 
 * @param formData 
 * @returns 
 */
export async function authenticate(_currentState: unknown, formData: FormData) {
    console.log(`Authenticating user...`);
    try {
        // Get user data
        const email = formData.get("email");
        const password = formData.get("password");
        console.log(`Data fetch from form`);
        
        if(!email) {
            console.log(`Email not found in FormData`);
        }
        if(!password) {
            console.log(`Password not found FormData`);
        }
        
        const userData = {
            email, password,
        };
        console.log(`User data: `, userData);
        
        const result = await login(userData);
        console.log(`Result: `, result);
    } catch (error) {
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
