"use client";

import { useState } from "react";

import AppData, { isAppRunning } from "@/types/AppData";
import AppScriptsViewV2 from "./appScripts/AppScriptsViewV2";
import { Socket } from "socket.io-client";
import { RunAppInfo } from "../../app-view-v1/actions/appScripts/AppAction";
import runApp from "@/api/appManager/app/run";
import { stopAppByName } from "@/api/appManager/process/stopProcess";

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
    const [isRunning, setIsRunning] = useState(isAppRunning(app));
    const [showOtherActions, setShowOtherActions] = useState(false);
    
    // Start app
    const startApp = async (event: any) => {
        try {
            const scriptName = "start";
            const startScript = app.packageJson.scripts[scriptName];
            const appInfo: RunAppInfo = {
                name: app.packageJson.name,
                command: startScript,
                path: app.path,
                scriptName: scriptName,
            };
            
            await runApp(appInfo);
            
            window.location.reload();
        } catch(err: any) {
            console.log(`Error when emitting run, couldn't get start script`);
            console.error(err);
        }
    }
    
    /**
     * Start app in development mode
     */
    async function startAppDev(event: any) {
        try {
            const scriptName = "dev";
            const startScript = app.packageJson.scripts[scriptName];
            const appInfo: RunAppInfo = {
                name: app.packageJson.name,
                command: startScript,
                path: app.path,
                scriptName: scriptName,
            };
            
            await runApp(appInfo);
            
            window.location.reload();
        } catch(err: any) {
            console.log(`Error when emitting run, couldn't get start script`);
            console.error(err);
        }
    }
    
    // Stop app
    const stopApp = async (event: any) => {
        // What we have to do here, is to kill the shell and all its chidlren processes
        try {
            const appName = app.packageJson.name;
            
            await stopAppByName(appName);
            
            window.location.reload();
        } catch(err: any) {
            console.log(`Error when emitting run, couldn't get start script`);
            console.error(err);
        }
    }
    
    // Classes
    const disabledClasses = "disabled:bg-gray-500";
    
    return (
        <div>
            Actions
            <div className="flex justify-start">
                {!isRunning && (
                    <div>
                        <button
                            className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-3 ${disabledClasses}`}
                            onClick={startApp}
                        >
                            Start
                        </button>
                        <button
                            className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-3 ${disabledClasses}`}
                            onClick={startAppDev}
                        >
                            Start dev
                        </button>
                    </div>
                ) || (
                    <button
                        className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${disabledClasses}`}
                        onClick={stopApp}
                    >Stop</button>
                )}
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
                <div>
                    No scripts
                </div>
            )}
        </div>
    )
}

