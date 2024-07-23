"use client";

import { useState } from "react";

import AppData from "@/types/AppData";
import { Socket } from "socket.io-client";
import AppViewContent from "./AppViewContent";
import RunningState from "./RunningState";

/**
 * Simple app view
 */
export default function AppAccordion({
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
    const [isRunning, setIsRunning] = useState(app.pid ? true : false);
	
    return (
		<div>
			{app.packageJson && (
				<div>
					<div className="flex">
						{/* Is it running */}
						<RunningState isRunning={isRunning} />
					</div>
					
					<AppViewContent
						app={app}
						socket={socket}
						appsHandler={appsHandler}
					/>
				</div>
			) || (
				<div>
					<h3>No package.json</h3>
				</div>
			)}
		</div>
    );
}
