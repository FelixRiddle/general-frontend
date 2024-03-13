'use server';

import userDataRoute from "@/app/lib/user/data";
import { UserData } from "felixriddle.good-roots-ts-api";
import Link from "next/link";
import React, { useEffect } from "react";
import styles from "@/tailwindStyles/index";

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
                <div>
                    <ul className={styles.navbarUlClasses}>
                        <li className={styles.navbar_liaClasses}>
                            <Link className={styles.navLinkClasses} href="/auth/login">Login</Link>
                        </li>
                        
                        <li className={styles.navbar_liaClasses}>
                            <Link className={styles.navLinkClasses} href="/auth/register">Register</Link>
                        </li>
                    </ul>
                </div>
            ) || (
                <div>
                    <span>Welcome {user.name}</span>
                </div>
            )}
        </nav>
    );
}
