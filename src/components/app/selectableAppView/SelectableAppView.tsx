"use client";

import { useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

import AppData from "@/types/AppData";
import { AppSelection } from "@/components/apps/selectableApp/useSelectableApp";

/**
 * Simple app view
 */
export default function SelectableAppView({
    app,
    selected,
    selectClickCb,
}: {
    app: AppData,
    selected: AppSelection,
    selectClickCb: (event: any, appName: string) => void,
}) {
    const [showMore, setShowMore] = useState(false);
    const [isRunning, setIsRunning] = useState(app.running ? app.running : false);
    
    const switchShowMore = () => {
        setShowMore(!showMore);
    }
    
    // Classes
    const arrowClasses = "mt-1 mr-2";
    
    return (
        <div
            className={`bg-lime-300 rounded border-2 p-2 m-2 ${selected.selected && "border-sky-500"} hover:border-emerald-400 hover:bg-emerald-300 hover:cursor-pointer`}
            onClick={(e) => selectClickCb(e, selected.packageJson.name)}
        >
            {/* Generate tailwind classes, because dynamic code doesn't */}
            <div hidden={true} className={""}></div>
            
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
                            <p>App path: {app.path}</p>
                            
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
