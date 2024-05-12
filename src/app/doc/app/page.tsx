import Link from "next/link";

/**
 * App documentation
 */
export default function AppDocumentationPage() {
    const titleClasses = "m-1 p-1 text-xs font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl";
    const linkClasses = "p-1 m-1 font-medium text-blue-600 dark:text-blue-500 hover:underline";
    const paragraphClasses = "p-1 m-1 mb-3 text-gray-900";
    
    return (
        <div>
            <h1 className={titleClasses}>
                App documentation
            </h1>
            <p className={paragraphClasses}>
                This is the documentation for the app
            </p>
            
            {/* Other links */}
            <h2 className={titleClasses}>Links</h2>
            <nav>
                <ul>
                    <li>
                        <Link href="/doc/app/command" className={linkClasses}>Command</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
