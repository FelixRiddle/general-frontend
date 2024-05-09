'use client';

import Navbar from "@/components/navbar/defaultNavbar/Navbar";

import "./globals.css";

/**
 * Root layout
 * 
 * @param param0 
 * @returns 
 */
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
            // className={inter.className}
            >
                <main>
                    <Navbar></Navbar>
                    {children}
                </main>
            </body>
        </html>
    );
}
