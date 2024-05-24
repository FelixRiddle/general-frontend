import AppData from "@/types/AppData";
import { Socket } from "socket.io-client";
import { RunAppInfo } from "../../../app-view-v1/actions/appScripts/AppAction";
import runApp from "@/api/appManager/app/run";

/**
 * App action
 */
export default function AppActionV2({
    scriptName,
    command,
    app,
    socket,
    appsHandler,
}: {
    scriptName: string,
    command: string,
    app: AppData,
    socket: Socket,
    appsHandler: any,
}) {
    
    /**
     * Run app and update frontend in realtime with sockets
     * 
     * @param event '
     */
    const runAppRealtime = (event: any) => {
        console.log(`Run app(Realtime): ${app.packageJson.name}`);
        
        const appName = app.packageJson.name;
        const appInfo: RunAppInfo = {
            name: appName,
            command,
            path: app.path,
        };
        
        // This only runs once
        // If you try to start multiple apps it won't work for some reason
        socket.emit("run", appInfo);
    }
    
    /**
     * Run app
     * 
     * Note: I don't know if it's allowed to do it this way.
     * 
     * @param event 
     */
    const runAppNotRealtime = (event: any) => {
        console.log(`Run app: ${app.packageJson.name}`);
        
        const appName = app.packageJson.name;
        const appInfo: RunAppInfo = {
            name: appName,
            command,
            path: app.path,
        };
        
        runApp(appInfo);
    }
    
    // Classes
    const disabledClasses = "disabled:bg-gray-500";
    const buttonClasses = `bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-3 ${disabledClasses}`;
    
    return (
        <div className="mt-2">
            {/* Show other commands */}
            <strong><h2>Command name: {scriptName}</h2></strong>
            <p>Command: {command}</p>
            
            <div>
                {/* Run */}
                <button
                    className={buttonClasses}
                    onClick={runAppRealtime}
                >
                    Run(Realtime)
                </button>
                
                {/* Run without sockets */}
                <button
                    className={buttonClasses}
                    onClick={runAppNotRealtime}
                >
                    Run
                </button>
                
                {/* <button
                    className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${disabledClasses}`}
                >
                    Stop
                </button> */}
            </div>
        </div>
    );
}
