import TerminalView from "@/components/terminalView/TerminalView";
import SimpleAppActionsV2 from "./actions/SimpleAppActionsV2";
import AppData from "@/types/AppData";
import { Socket } from "socket.io-client";

/**
 * App view content
 */
export default function AppViewContent({
	app,
    socket,
    appsHandler,
}: {
	app: AppData;
    socket: Socket;
    appsHandler: any;
}) {
    const subtitleClasses = "m-1 p-1 text-xs font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl";
    const paragraphClasses = "p-1 m-1 text-gray-900";
	
	return (
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
			<SimpleAppActionsV2
				app={app}
				socket={socket}
				appsHandler={appsHandler}
			/>
			
			{/* Output */}
			{/* If the app is running show the output */}
			<div>
				<TerminalView output={app.out ? app.out : ""} />
			</div>
		</div>
	);
}
