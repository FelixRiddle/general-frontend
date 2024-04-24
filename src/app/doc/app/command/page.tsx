
/**
 * App command standard
 */
export default function AppCommand() {
    return (
        <div>
            <h1>
                Standardization of commands
            </h1>

            <p>This is a list of standardized commands(scripts in package.json) for my apps</p>
            
            {/* Development */}
            <h2>dev</h2>
            <p>This should run the app on development mode</p>
            
            {/* Production */}
            <h2>
                prod
            </h2>
            <p>
                This runs the app in production mode
            </p>
            
            {/* Test */}
            <h2>
                test
            </h2>
            <p>
                This runs app tests
            </p>
        </div>
    )
}
