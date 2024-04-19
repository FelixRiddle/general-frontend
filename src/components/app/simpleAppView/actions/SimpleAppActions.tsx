import { useState } from "react";
import { Socket } from "socket.io-client";

import AppData from "@/types/AppData";

/**
 * Simple app actions
 */
export default function SimpleAppActions({ app, socket }: { app: AppData, socket: Socket }) {
    const [isRunning, setIsRunning] = useState(app.running ? app.running : false);
    const [showOtherActions, setShowOtherActions] = useState(false);
    
    // Start app
    const startApp = async (event: any) => {
        console.log(`Running app: `, app.packageJson.name);
        try {
            const devScript = app.packageJson.scripts["dev"];
            console.log(`Dev script: `, devScript);
            socket.emit("run", {
                name: app.packageJson.name,
                command: devScript,
                path: app.path,
            });
        } catch(err) {
            console.log(`Error when emitting run, couldn't get dev script`);
        }
    }
    
    // Classes
    const disabledClasses = "disabled:bg-gray-500";
    
    return (
        <div>
            Actions
            <div className="flex justify-start">
                <button
                    className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-3 ${disabledClasses}`}
                    disabled={isRunning}
                    onClick={startApp}
                >
                    Start
                </button>
                <button
                    className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${disabledClasses}`}
                    disabled={!isRunning}>Stop</button>
            </div>
        
            {/* Other actions */}
            <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded ${disabledClasses}`}
                onClick={() => setShowOtherActions(!showOtherActions)}
            >
                Show other actions
            </button>
            {showOtherActions && app.packageJson.scripts ? Object.entries(app.packageJson.scripts).map(([commandKey, value], index) => {
                if(typeof(value) !== 'string') {
                    return (
                        <div>
                            {commandKey} has an invalid type set as command.
                        </div>
                    );
                }
                const command = value;
                
                return (
                    <div className="mt-2">
                        {/* Show other commands */}
                        <strong><h2>Command name: {commandKey}</h2></strong>
                        <p>Command: {command}</p>
                        
                        <div>
                            <button
                                className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-3 ${disabledClasses}`}
                                onClick={() => {
                                    const appName = app.packageJson.name;
                                    console.log(`Running app: `, appName);
                                    
                                    socket.emit("run", {
                                        name: appName,
                                        command,
                                        path: app.path,
                                    });
                                }}
                            >
                                Run
                            </button>
                            <button
                                className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${disabledClasses}`}
                            >
                                Stop
                            </button>
                        </div>
                    </div>
                );
            }) : (
                <div>
                    No scripts
                </div>
            )}
        </div>
    )
}

