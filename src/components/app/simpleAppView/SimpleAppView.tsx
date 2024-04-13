"use client";

import { useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

import AppData from "@/types/AppData";

/**
 * Simple app view
 */
export default function SimpleAppView({ app }: { app: AppData }) {
    const [showMore, setShowMore] = useState(false);
    
    const switchShowMore = () => {
        setShowMore(!showMore);
    }
    
    const arrowClasses = "mt-1 mr-2";
    return (
        <div key={app.path} className={"bg-green-300 rounded border-2 border-green-400 p-2 m-2"}>
            {app.packageJson && (
                <div>
                    <div className="flex">
                        {/* Div acts as an anchor */}
                        {showMore ? <SlArrowUp className={arrowClasses} /> : <SlArrowDown className={arrowClasses} /> }
                        <h1 className="cursor-pointer" onClick={switchShowMore}>{app.packageJson.name}</h1>
                    </div>
                    {showMore && (
                        <div>
                            {app.packageJson.description && (
                                <div>
                                    <h3>Description</h3>
                                    <p>{app.packageJson.description}</p>
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



