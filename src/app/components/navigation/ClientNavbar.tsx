'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "@/tailwindStyles/index";
import { UserData } from "felixriddle.good-roots-ts-api";

/**
 * Navbar
 */
export default async function ClientNavbar({
    user
}: Readonly<{
    user: UserData | undefined;
}>) {
    const pathname = usePathname();
    
    const activeLoginClasses = pathname === "/auth/login" ? styles.navbar_liaActiveClasses : "";
    const activeRegisterClasses = pathname === "/auth/register" ? styles.navbar_liaActiveClasses : "";
    
    return (
        <span className="flex">
            {!user && (
                <div>
                    <ul className={styles.navbarUlClasses}>
                        <li className={styles.navbar_liaClasses}>
                            <Link className={`${activeLoginClasses} ${styles.navLinkClasses}`}
                                href="/auth/login">Login</Link>
                        </li>
                        
                        <li className={styles.navbar_liaClasses}>
                            <Link className={`${activeRegisterClasses} ${styles.navLinkClasses}`}
                                href="/auth/register">Register</Link>
                        </li>
                    </ul>
                </div>
            ) || (
                <div>
                    <span>Welcome {user.name}</span>
                </div>
            )}
        </span>
    );
}
