'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";

/**
 * Checking active links example
 * 
 * Reference/s:
 * * https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating
 * 
 * @returns 
 */
export function Links() {
    const pathname = usePathname();
    
    return (
        <nav>
            <ul>
                <li>
                    <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link className={`link ${pathname === '/about' ? 'active' : ''}`} href="/">
                        About
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
