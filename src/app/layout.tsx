'use client';

import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}
