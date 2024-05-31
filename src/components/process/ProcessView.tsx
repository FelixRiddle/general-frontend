"use client";

import { useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

import Button from "../button/Button";
import stopProcess, { stopAppByName } from "@/api/appManager/process/stopProcess";

export interface Process {
    name: string;
    pid: number;
    url: string;
    appType: string;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Process
 */
export default function ProcessView({
    process: appProcess,
    selectClickCb
}: {
    process: Process;
    selectClickCb?: ((event: any, appProcess: Process) => void);
}) {
    const [showMore, setShowMore] = useState(false);
    
    const switchShowMore = () => {
        setShowMore(!showMore);
    }
    
    // Classes
    const arrowClasses = "mt-1 mr-2";
    const appColor = (() => {
        if(appProcess.pid) {
            return "bg-lime-300 border-lime-400";
        } else {
            return "bg-gray-300 border-gray-400";
        }
    })();
    
    // const titleClasses = "m-1 p-1 text-xs font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl";
    const linkClasses = "p-1 m-1 font-medium text-blue-600 dark:text-blue-500 hover:underline";
    const paragraphClasses = "text-gray-900";
    
    // On element click
    const onElementClick = (event: any) => {
        if(selectClickCb) {
            selectClickCb(event, appProcess);
        } else {
            // Show app information
            switchShowMore();
        }
    }
    
    return (
        <div
            className={`rounded border-2 p-2 m-2 ${appColor} hover:border-emerald-400 hover:bg-emerald-300 hover:cursor-pointer`}
        >
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
                        className={`cursor-pointer ${paragraphClasses}`}
                        onClick={onElementClick}
                    >{appProcess.name}</h1>
                </div>
            </div>
            {showMore && (
                <div className={"flex flex-col"}>
                    <div>
                        <Button
                            onClick={() => stopAppByName(appProcess.name)}
                        >
                            Stop app
                        </Button>
                    </div>
                </div>
            ) || (
                <div>
                </div>
            )}
        </div>
    );
}

