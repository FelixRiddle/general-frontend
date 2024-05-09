import Link from "next/link";

/**
 * Home component
 * 
 * @returns 
 */
export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            
            {/* Links */}
            <h2>
                Links
            </h2>
            <nav>
                <ul>
                    <li>
                        <Link href="/doc">Documentation</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
