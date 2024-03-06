'use client';

import { Inter } from "next/font/google";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// /**
//  * 
//  */
// class Student {
//     fullName: string;
    
//     constructor(
//         public firstName: string,
//         public middleInitial: string,
//         public lastName: string
//     ) {
//         this.fullName = firstName + " " + middleInitial + " " + lastName;
//     }
// }

/**
 * Root layout
 * 
 * @param param0 
 * @returns 
 */
export default function RootLayout({
    children,
    auth,
}: Readonly<{
    children: React.ReactNode;
    auth: React.ReactNode,
}>) {
    // const loginSegments = useSelectedLayoutSegment('auth');
    
    return (
        <html lang="en">
            
            {/* <nav>
                <Link href="/login">Open modal</Link>
            </nav> */}
            
            {/* <div>{auth}</div> */}
            <body className={inter.className}>{children}</body>
        </html>
    );
}
