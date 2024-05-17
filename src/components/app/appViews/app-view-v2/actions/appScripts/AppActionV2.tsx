import AppData from "@/types/AppData";
import { Socket } from "socket.io-client";

/**
 * App action
 */
export default function AppActionV2({
    scriptName,
    command,
    app,
    socket,
    appsHandler,
}: {
    scriptName: string,
    command: string,
    app: AppData,
    socket: Socket,
    appsHandler: any,
}) {
    // Classes
    const disabledClasses = "disabled:bg-gray-500";
    
    return (
        <div className="mt-2">
            {/* Show other commands */}
            <strong><h2>Command name: {scriptName}</h2></strong>
            <p>Command: {command}</p>
            
            <div>
                <button
                    className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-3 ${disabledClasses}`}
                    onClick={() => {
                        // console.log(`Event: Run app`);
                        console.log(`Run app: ${app.packageJson.name}`);
                        // console.log(`Command: ${command}`);
                        
                        const appName = app.packageJson.name;
                        const appInfo = {
                            name: appName,
                            command,
                            path: app.path,
                        };
                        
                        // This only runs once
                        // If you try to start multiple apps it won't work for some reason
                        socket.emit("run", appInfo);
                    }}
                >
                    Run
                </button>
                {/* <button
                    className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${disabledClasses}`}
                >
                    Stop
                </button> */}
            </div>
        </div>
    );
}
