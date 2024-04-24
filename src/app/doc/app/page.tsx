import Link from "next/link";

/**
 * App documentation
 */
export default function AppDocumentationPage() {
    
    return (
        <div>
            <h1>
                App documentation
            </h1>
            <p>
                This is the documentation for the app
            </p>
            
            {/* Other links */}
            <h2>Links</h2>
            <nav>
                <ul>
                    <li>
                        <Link href="/doc/app/command">Command</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
