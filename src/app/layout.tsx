'use client';

// import { Inter } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/navbar/Navbar";

// const inter = Inter({ subsets: ["latin"] });

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
