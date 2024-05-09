'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

import navbarStyles from "@/styles/navbar.module.css";
import navbarContainer from "@/styles/navbarContainer.module.css";

/**
 * Navbar
 */
export default function Navbar() {
    const pathname = usePathname();
    
    return (
        <ul className={navbarContainer.container}>
            <li>
                <Link className={`${navbarStyles.navbar} mr-2 ${pathname === "/" ? navbarStyles.navbarActive : ""}`}
                    href="/">Home</Link>
            </li>
            <li>
                <Link className={`${navbarStyles.navbar} ${pathname === "/app" ? navbarStyles.navbarActive : ""}`}
                    href="/app">App</Link>
            </li>
        </ul>
    );
}
