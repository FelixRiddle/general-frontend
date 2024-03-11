import { Metadata } from "next";
import Link from "next/link";
import Navbar from "./components/navigation/Navbar";

export default function Home() {
    return (
        <main>
            <Navbar />
            
            <div>Next.js</div>
            <Link href="/dashboard">Dashboard</Link>
        </main>
    );
}
