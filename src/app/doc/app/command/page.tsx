
/**
 * App command standard
 */
export default function AppCommand() {
    const titleClasses = "m-1 p-1 text-xs font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl";
    const linkClasses = "p-1 m-1 font-medium text-blue-600 dark:text-blue-500 hover:underline";
    const paragraphClasses = "p-1 m-1 mb-3 text-gray-900";
    
    return (
        <div>
            <h1 className={titleClasses}>
                Standardization of commands
            </h1>

            <p className={paragraphClasses}>This is a list of standardized commands(scripts in package.json) for my apps</p>
            
            {/* Development */}
            <h2 className={titleClasses}>dev</h2>
            <p className={paragraphClasses}>This should run the app on development mode</p>
            
            {/* Production */}
            <h2 className={titleClasses}>
                prod
            </h2>
            <p className={paragraphClasses}>
                This runs the app in production mode
            </p>
            
            {/* Test */}
            <h2 className={titleClasses}>
                test
            </h2>
            <p className={paragraphClasses}>
                This runs app tests
            </p>
        </div>
    )
}
