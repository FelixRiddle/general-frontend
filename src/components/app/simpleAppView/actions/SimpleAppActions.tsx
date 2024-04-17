
import AppData from "@/types/AppData";
import { useState } from "react";
import { Socket } from "socket.io-client";

/**
 * Simple app actions
 */
export default function SimpleAppActions({ app, socket }: { app: AppData, socket: Socket }) {
    const [showMore, setShowMore] = useState(false);
    const [isRunning, setIsRunning] = useState(app.running ? app.running : false);
    
    const switchShowMore = () => {
        setShowMore(!showMore);
    }
    
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
            {app.packageJson.scripts ? Object.entries(app.packageJson.scripts).map(([commandKey, value], index) => {
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
                                    socket.emit("run", {
                                        name: app.packageJson.name,
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

