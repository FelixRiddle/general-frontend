'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "@/tailwindStyles/index";
import { UserData } from "felixriddle.good-roots-ts-api";

/**
 * Navbar
 */
export default function ClientNavbar({
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
                    <span>Welcome {user && user.name}</span>
                    
                    {/* User navbar */}
                    <ul className={styles.navbarUlClasses}>
                        <li className={styles.navbar_liaClasses}>
                            <Link className={`${pathname === "/user" ? styles.navbar_liaActiveClasses : ""} ${styles.navLinkClasses}`}
                                href="/user">Profile</Link>
                        </li>
                        
                        <li className={styles.navbar_liaClasses}>
                            <Link className={`${pathname === "/user/property/admin" ? styles.navbar_liaActiveClasses : ""} ${styles.navLinkClasses}`}
                                href="/user/property/admin">My properties</Link>
                        </li>
                    </ul>
                </div>
            )}
        </span>
    );
}
