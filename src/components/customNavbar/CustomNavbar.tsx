"use client";

import { usePathname } from "next/navigation";

import navbarContainer from "@/styles/navbarContainer.module.css";
import CustomNavbarLink from "./CustomNavbarLink";

export interface PageInfo {
    displayName: string;
    href: string;
}

/**
 * Custom navbar
 */
export default function CustomNavbar({ pagesInfo }: {
    pagesInfo: PageInfo[]
}) {
    const pathname = usePathname();
    
    return (
        <div>
            <ul className={navbarContainer.container}>
                {pagesInfo.map((pageInfo, index) => {
                    return (
                        <CustomNavbarLink
                            key={index}
                            pageInfo={pageInfo}
                            pathname={pathname}
                        >
                            {pageInfo.displayName}
                        </ CustomNavbarLink>
                    );
                })}
            </ul>
        </div>
    );
}
