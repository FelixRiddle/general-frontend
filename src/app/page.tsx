import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "General frontend",
    description: "For learning",
};


export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>Next.js</div>
            <Link href="/dashboard">Dashboard</Link>
        </main>
    );
}
