"use client";

import { useState } from "react";
import { Socket } from "socket.io-client";

import AppData from "@/types/AppData";
import AppScriptsView from "./appScripts/AppScriptsView";

/**
 * Simple app actions
 */
export default function SimpleAppActions({ app, socket }: { app: AppData, socket: Socket }) {
    const [isRunning, setIsRunning] = useState(app.running ? app.running : false);
    const [showOtherActions, setShowOtherActions] = useState(false);
    
    // Start app
    const startApp = async (event: any) => {
        try {
            const startScript = app.packageJson.scripts["start"];
            socket.emit("run", {
                name: app.packageJson.name,
                command: startScript,
                path: app.path,
            });
        } catch(err) {
            console.log(`Error when emitting run, couldn't get start script`);
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
                {/* <button
                    className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${disabledClasses}`}
                    disabled={!isRunning}
                    onClick={stopApp}
                >Stop</button> */}
            </div>
            
            {/* Other actions */}
            <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded ${disabledClasses}`}
                onClick={() => {
                    // console.log(`Show other actions: `, !showOtherActions);
                    // console.log(`Package json scripts: `, app.packageJson.scripts);
                    setShowOtherActions((prevState) => {
                        return !prevState;
                    });
                }}
            >
                Show other actions
            </button>
            {showOtherActions && app.packageJson.scripts ? (
                <AppScriptsView
                    scripts={app.packageJson.scripts}
                    app={app}
                    socket={socket}
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

