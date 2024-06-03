import AppData from "@/types/AppData";
import { Socket } from "socket.io-client";

export interface RunAppInfo {
    name: string,
    command: string,
    path: string,
    scriptName?: string,
}

/**
 * App action
 */
export default function AppAction({
    scriptName,
    command,
    app,
    socket,
    buttonName,
}: {
    scriptName: string,
    command: string,
    app: AppData,
    socket: Socket,
    buttonName?: string,
}) {
    // Classes
    const disabledClasses = "disabled:bg-gray-500";
    
    // Run app script
    const runApp = () => {
        const appInfo: RunAppInfo = {
            name: app.packageJson.name,
            command,
            path: app.path,
            scriptName,
        };
        
        socket.emit("run", appInfo);
    }
    
    const buttonClasses = `bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-3 ${disabledClasses}`;
    return (
        <div className="mt-2">
            {/* Show other commands */}
            <strong><h2>Command name: {scriptName}</h2></strong>
            <p>Command: {command}</p>
            
            <div>
                {/* Run actions */}
                <button
                    className={buttonClasses}
                    onClick={runApp}
                >
                    {buttonName ?? "Run"}
                </button>
                
                {/* Run without sockets */}
                <button
                    className={buttonClasses}
                >
                    Run(Not realtime updates)
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
