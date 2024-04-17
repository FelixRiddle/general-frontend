"use client";

import { useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

import AppData from "@/types/AppData";
import { Socket } from "socket.io-client";

/**
 * Simple app view
 */
export default function SimpleAppView({ app, socket }: { app: AppData, socket: Socket }) {
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
    const arrowClasses = "mt-1 mr-2";
    
    return (
        <div className={"bg-gray-300 rounded border-2 border-gray-400 p-2 m-2"}>
            {app.packageJson && (
                <div>
                    <div className="flex">
                        {/* Name and toggle */}
                        <div className="flex flex-1">
                            {showMore ? <SlArrowUp className={arrowClasses} /> : <SlArrowDown className={arrowClasses} /> }
                            <h1 className="cursor-pointer" onClick={switchShowMore}>{app.name ? app.name : app.packageJson.name}</h1>
                        </div>
                        
                        {/* Is it running */}
                        <div className="ml-auto flex-1">
                            {isRunning ? (
                                <span className="text-green-500">
                                    <strong>Running</strong>
                                </span>
                            ) : (
                                <span className="text-gray-500">
                                    Not running
                                </span>
                            )}
                        </div> 
                        
                        <div className="flex-1"></div>
                    </div>
                    {showMore && (
                        <div>
                            {/* Show description */}
                            {app.packageJson.description && (
                                <div>
                                    <h3>Description</h3>
                                    <p>{app.packageJson.description}</p>
                                </div>
                            ) || (
                                <div>
                                    No description
                                </div>
                            )}
                            
                            {/* Actions */}
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
                        </div>
                    )}
                </div>
            ) || (
                <div>
                    <h3>No package.json</h3>
                </div>
            )}
        </div>
    );
}



