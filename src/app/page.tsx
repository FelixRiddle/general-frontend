import Link from "next/link";

/**
 * Home component
 * 
 * @returns 
 */
export default function Home() {
    const titleClasses = "m-1 p-1 text-xs font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl";
    const linkClasses = "p-1 m-1 font-medium text-blue-600 dark:text-blue-500 hover:underline";
    
    return (
        <div>
            <h1 className={titleClasses}>Home</h1>
            
            {/* Links */}
            <h2 className={titleClasses}>
                Links
            </h2>
            <nav>
                <ul>
                    <li>
                        <Link href="/doc" className={linkClasses}>Documentation</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
