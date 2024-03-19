'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "@/tailwindStyles/index";
import { UserData } from "felixriddle.good-roots-ts-api";
import logout from "@/api/auth/logout";

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
    
    // When logout is clicked, remove the token cookie
    const logoutOnClick = (event: any) => {
        event.preventDefault();
        
        const res = logout();
    }
    
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
                        
                        <li className={styles.navbar_liaClasses}>
                            <a className={styles.navbar_liaClasses} onClick={logoutOnClick}>Logout</a>
                        </li>
                    </ul>
                </div>
            )}
        </span>
    );
}
