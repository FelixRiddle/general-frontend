"use client";

import { useState } from "react";

import AppData from "@/types/AppData";
import AppScriptsViewV2 from "./appScripts/AppScriptsViewV2";
import { Socket } from "socket.io-client";

/**
 * Simple app actions
 */
export default function SimpleAppActionsV2({
    app,
    socket,
    appsHandler,
}: {
    app: AppData;
    socket: Socket;
    appsHandler: any;
}) {
    const [isRunning, setIsRunning] = useState(app.running ? app.running : false);
    const [showOtherActions, setShowOtherActions] = useState(false);
    
    // Start app
    const startApp = async (event: any) => {
        try {
            const startScript = app.packageJson.scripts["start"];
            const appInfo = {
                name: app.packageJson.name,
                command: startScript,
                path: app.path,
            };
            
            console.log(`TODO: Start app`);
            // runApp(appInfo);
        } catch(err: any) {
            console.log(`Error when emitting run, couldn't get start script`);
            console.error(err);
        }
    }
    
    // Stop app
    const stopApp = async (event: any) => {
        // What we have to do here, is to kill the shell and all its chidlren processes
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
                    disabled={!isRunning}
                    onClick={stopApp}
                >Stop</button>
            </div>
            
            {/* Other actions */}
            <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded ${disabledClasses}`}
                onClick={() => {
                    setShowOtherActions((prevState) => {
                        return !prevState;
                    });
                }}
            >
                Show other actions
            </button>
            {showOtherActions && app.packageJson.scripts ? (
                <AppScriptsViewV2
                    scripts={app.packageJson.scripts}
                    app={app}
                    socket={socket}
                    appsHandler={appsHandler}
                />
            ) : (
            // ( : )
                <div>
                    No scripts
                </div>
            )}
        </div>
    )
}

