"use client";

import { useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

import AppData from "@/types/AppData";
import { Socket } from "socket.io-client";
import TerminalView from "@/components/terminalView/TerminalView";
import SimpleAppActionsV2 from "./actions/SimpleAppActionsV2";

/**
 * Simple app view
 */
export default function SimpleAppViewV2({
    app,
    selectClickCb,
    socket,
}: {
    app: AppData;
    selectClickCb?: ((event: any, appName: string) => void);
    socket: Socket;
}) {
    const [showMore, setShowMore] = useState(false);
    const [isRunning, setIsRunning] = useState(app.running ? app.running : false);
    
    const switchShowMore = () => {
        setShowMore(!showMore);
    }
    
    // Classes
    const arrowClasses = "mt-1 mr-2";
    const appColor = (() => {
        // console.log(`App out: `, app.out);
        if(app.out) {
            return "bg-lime-300 border-lime-400";
        } else {
            return "bg-gray-300 border-gray-400";
        }
    })();
    
    // On element click
    const onElementClick = (event: any) => {
        if(selectClickCb) {
            selectClickCb(event, app.packageJson.name);
        } else {
            // Show app information
            switchShowMore();
        }
    }
    
    const titleClasses = "m-1 p-1 text-xs font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl";
    const subtitleClasses = "m-1 p-1 text-xs font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl";
    const linkClasses = "p-1 m-1 font-medium text-blue-600 dark:text-blue-500 hover:underline";
    const paragraphClasses = "p-1 m-1 text-gray-900";
    
    return (
        <div
            className={`rounded border-2 p-2 m-2 ${appColor} hover:border-emerald-400 hover:bg-emerald-300 hover:cursor-pointer`}
            onClick={(e) => {
                // Only when it's not shown
                // Otherwise it's gonna collapse when you click anywhere insde the parent element
                // We will enable it to be hidden when the user clicks either the arrow icon or the name
                if(!showMore) {
                    onElementClick(e);
                }
            }}
        >
            {app.packageJson && (
                <div>
                    <div className="flex">
                        {/* Name and toggle */}
                        <div className="flex flex-1">
                            {showMore ? (
                                <SlArrowUp
                                    className={arrowClasses}
                                    onClick={onElementClick}
                                />
                            ) : (
                                <SlArrowDown
                                    className={arrowClasses}
                                    onClick={onElementClick}
                                />
                            )}
                            <h1
                                className={`cursor-pointer`}
                                onClick={onElementClick}
                            >{app.name ? app.name : app.packageJson.name}</h1>
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
                                    <h3 className={subtitleClasses}>Description</h3>
                                    <p className={paragraphClasses}>{app.packageJson.description}</p>
                                </div>
                            ) || (
                                <div>
                                    No description
                                </div>
                            )}
                            
                            {/* Actions */}
                            <SimpleAppActionsV2 app={app} socket={socket} />
                            
                            {/* Output */}
                            {/* If the app is running show the output */}
                            <div>
                                <TerminalView output={app.out ? app.out : ""} />
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
