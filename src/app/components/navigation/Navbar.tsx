'use server';

import userDataRoute from "@/app/lib/user/data";
import UserData from "good-roots-ts-api/src/types/UserData";
import Link from "next/link";
import React, { useEffect } from "react";

/**
 * Get authenticated user data
 */
async function getUserData(): Promise<UserData | undefined> {
    
    const userData = await userDataRoute()
        .then((userData) => {
            return userData;
        })
        .catch((err) => {
            console.error(err);
            return undefined;
        });
    
    return userData;
}

/**
 * Navbar
 */
export default async function Navbar() {
    let user = undefined;
    
    if(!user) {
        // Get authenticated user
        const userData = await getUserData();
        
        if(userData) {
            user = userData;
        }
    }
    
    return (
        <nav className="flex">
            {!user && (
                <span>
                    <Link href="/auth/login">Login</Link>
                    <Link href="/auth/register">Register</Link>
                </span>
            ) || (
                <span>
                    <span>Welcome {user.name}</span>
                </span>
            )}
        </nav>
    );
}
