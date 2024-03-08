import { FormEvent } from "react";
import { useRouter } from "next/router";

/**
 * Login page
 * 
 * Supposedly this was for the pages router
 * 
 * @returns 
 */
export default function LoginPage() {
    const router = useRouter();
    
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(`Logging in!`);
        
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");
        
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        if(response.ok) {
            console.log(`Login successful`);
            router.push("/profile");
        } else {
            // Handle errors
            console.log(`Response not ok!`);
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
}
