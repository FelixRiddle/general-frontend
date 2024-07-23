import AppData from "@/types/AppData";
import { Socket } from "socket.io-client";
import { RunAppInfo } from "../../../app-view-v1/actions/appScripts/AppAction";
import runApp from "@/api/appManager/app/run";
import { Button } from "@nextui-org/button";

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
        const appName = app.packageJson.name;
        const appInfo: RunAppInfo = {
            name: appName,
            command,
            path: app.path,
            scriptName,
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
    const runApp = async (event: any) => {
        const appName = app.packageJson.name;
        const appInfo: RunAppInfo = {
            name: appName,
            command,
            path: app.path,
            scriptName,
        };
        
        await runApp(appInfo);
        
        window.location.reload();
    }
    
    return (
        <div className="mt-2">
            {/* Show other commands */}
            <strong><h2>Script name: {scriptName}</h2></strong>
            <p>Script: {command}</p>
            
            <div>
                {/* Run */}
				<Button
					className="mr-2"
					color="success"
					onClick={runApp}
				>Run</Button>
				<Button
					color="warning"
					onClick={runAppRealtime}
				>Run(Realtime)</Button>
            </div>
        </div>
    );
}
