import Link from "next/link";

/**
 * Documentation page
 */
export default function DocumentationPage() {
    return (
        <div>
            <h1>
                Documentation
            </h1>
            <p>
                This is the documentation page
            </p>
            
            {/* Other links */}
            <h2>Links</h2>
            <nav>
                <ul>
                    <li>
                        <Link href="/doc/app">App</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
