import Navbar from "@/components/navbar/defaultNavbar/Navbar";

import "./globals.css";
import { Providers } from "./provider";
import clsx from "clsx";
import { fontSans } from "../lib/config/fonts";
import Link from "next/link";
import MainNavbar from "@/components/navbar/MainNavbar";
import { siteConfig } from "@/lib/config/site";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: "/favicon.ico",
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
};

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
			<head>
				
			</head>
			
            <body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable,
				)}
			>
        		<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					
					<div className="relative flex flex-col h-screen">
						{/* <Navbar /> */}
						<MainNavbar />
						<main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
							{children}
						</main>
						<footer className="w-full flex items-center justify-center py-3">
							<Link
								isexternal="true"
								className="flex items-center gap-1 text-current"
								href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
								title="nextui.org homepage"
							>
								<span className="text-default-600">Powered by</span>
								<p className="text-primary">NextUI</p>
							</Link>
						</footer>
					</div>
				</Providers>
            </body>
        </html>
    );
}
