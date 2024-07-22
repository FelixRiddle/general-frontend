"use client";

import { useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

import AppData from "@/types/AppData";
import { Socket } from "socket.io-client";
import TerminalView from "@/components/terminalView/TerminalView";
import SimpleAppActionsV2 from "./actions/SimpleAppActionsV2";
import AppViewContent from "./AppViewContent";
import AppNameToggle from "./AppNameToggle";
import RunningState from "./RunningState";

/**
 * Simple app view
 */
export default function SimpleAppViewV2({
    app,
    selectClickCb,
    socket,
    appsHandler,
}: {
    app: AppData;
    selectClickCb?: ((event: any, appName: string) => void);
    socket: Socket;
    appsHandler: any;
}) {
    const [showMore, setShowMore] = useState(false);
    const [isRunning, setIsRunning] = useState(app.pid ? true : false);
    
    const switchShowMore = () => {
        setShowMore(!showMore);
    }
    
    // Classes
    const arrowClasses = "mt-1 mr-2";
    const appColor = (() => {
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
						<AppNameToggle
							showMore={showMore}
							app={app}
							onElementClick={onElementClick}
						/>
                        
                        {/* Is it running */}
						<RunningState isRunning={isRunning} />
                    </div>
                    {showMore && (
						<AppViewContent
							app={app}
							socket={socket}
							appsHandler={appsHandler}
						/>
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
