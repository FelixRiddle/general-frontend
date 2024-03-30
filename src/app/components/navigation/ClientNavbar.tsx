'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "@/tailwindStyles/index";
import { CompleteUserData } from "felixriddle.good-roots-ts-api";
import logout from "@/api/auth/logout";

/**
 * Navbar
 */
export default function ClientNavbar({
    user
}: Readonly<{
    user: CompleteUserData | undefined;
}>) {
    const pathname = usePathname();
    
    const activeLoginClasses = pathname === "/auth/login" ? styles.navbarButtonActiveClasses : "";
    const activeRegisterClasses = pathname === "/auth/register" ? styles.navbarButtonActiveClasses : "";
    
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
                        <li>
                            <Link className={`${styles.navbarButtonClasses} mr-2 ${activeLoginClasses}`}
                                href="/auth/login">Login</Link>
                        </li>
                        
                        <li>
                            <Link className={`${styles.navbarButtonClasses} ${activeRegisterClasses}`}
                                href="/auth/register">Register</Link>
                        </li>
                    </ul>
                </div>
            ) || (
                <div>
                    <span>Welcome {user && user.name}</span>
                    
                    {/* Required tailwind style, because you can't add it dynamically */}
                    <div hidden className={`bg-pink-500 border-solid border border-pink-600`}></div>
                    
                    {/* User navbar */}
                    <ul className={styles.navbarUlClasses}>
                        <li>
                            <Link className={`${styles.navbarButtonClasses} mr-2 ${pathname === "/user" ? styles.navbarButtonActiveClasses : ""}`}
                                href="/user">Profile</Link>
                        </li>
                        
                        <li>
                            <Link className={`${styles.navbarButtonClasses} mr-2 ${pathname.startsWith("/user/property/list") ? styles.navbarButtonActiveClasses : ""}`}
                                href="/user/property/list/1">My properties</Link>
                        </li>
                        
                        <li>
                            <a className={`${styles.navbarButtonClasses}`} onClick={logoutOnClick}>Logout</a>
                        </li>
                    </ul>
                </div>
            )}
        </span>
    );
}
