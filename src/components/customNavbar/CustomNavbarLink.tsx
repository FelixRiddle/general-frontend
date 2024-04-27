import Link from "next/link";

import navbarStyles from "@/styles/navbar.module.css";
import React from "react";
import { PageInfo } from "./CustomNavbar";

/**
 * Navbar link
 */
export default function CustomNavbarLink({
    pageInfo, pathname, children
}: {
    pageInfo: PageInfo, pathname: string, children: React.ReactNode
}) {
    return (
        <li>
            <Link
                href={pageInfo.href}
                className={`${navbarStyles.navbar} mr-2 ${pathname === pageInfo.href ? navbarStyles.navbarActive : ""}`}
            >
                {children}
            </Link>
        </li>
    );
}
