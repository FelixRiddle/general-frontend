import AppData from "@/types/AppData";
import { Socket } from "socket.io-client";

/**
 * Apps
 */
export default class Apps {
    apps: AppData[];
    appsView: AppData[] = [];
    socket: Socket;
    
    /**
     * Constructor
     */
    constructor(apps: AppData[], socket: Socket) {
        this.apps = apps;
        this.socket = socket;
        
        this.appsView = this.apps;
    }
    
    getAppsView(): AppData[] {
        return this.appsView;
    }
    
    // --- Sockets ---
    /**
     * Make sockets listen
     */
    socketsListen(apps: AppData[]) {
        // On app start
        this.socket.on('app start', (appName: string) => {
            console.log(`App ${appName} started`);
        });
        
        // On app error / start error
        this.socket.on('app error', (err) => {
            console.error(`App start error: `, err);
        });
        
        // Stdout
        this.socket.on('out', (out) => {
            // Update app output
            const name = out.app.name;
            
            this.appendMessage(apps, name, out.message);
        });
        
        // Stderr
        this.socket.on('err', (err) => {
            // Update app output
            const name = err.app.name;
            
            this.appendMessage(apps, name, err.message);
        });
    }
    
    /**
     * Run app
     */
    runApp(appInfo: any) {
        this.socket.emit("run", appInfo);
    }
    
    // --- Non-transformative methods ---
    /**
     * Get apps name
     */
    getAppsName(apps: AppData[]) {
        let appsName: Array<string> = [];
        for (const app of apps) {
            appsName.push(app.packageJson.name);
        }
        
        return appsName;
    }
    
    /**
     * Find app output
     */
    findApp(apps: AppData[], name: string) {
        for (const app of apps) {
            if (app.packageJson.name === name) {
                return app;
            }
        }
        
        return undefined;
    }
    
    // --- View transformations ---
    /**
     * Sort alphabetically
     */
    sortAlphabetically() {
        const result = this.appsView.sort((a, b) => {
            return a.packageJson.name.localeCompare(b.packageJson.name);
        });
        
        this.appsView = result;
    }
    
    /**
     * Append message to app and re-create the app state
     */
    appendMessage(apps: AppData[], name: string, message: string) {
        // Get previous app output
        const appData = this.findApp(apps, name);
        if(!appData) {
            throw new Error("Couldn't find the app " + name);
        }
        
        // Insert output message
        const newAppData = {
            ...appData,
            out: appData.out + message,
        };
        
        // Insert the updated app into the array
        const updatedState = [
            newAppData,
           ...apps.filter(app => app.packageJson.name !== name),
        ];
        
        this.appsView = updatedState;
        
        // Normalize array structure
        this.defaultAppsView();
    }
    
    /**
     * Replace undefined outputs for empty strings
     */
    replaceUndefined() {
        // If output is undefined, insert a string to it
        const result = this.appsView.filter((app) => {
            if(typeof(app.out) === "undefined") {
                app.out = "";
            }
            return app;
        });
        
        this.appsView = result;
    }
    
    /**
     * Apps with output are first in the view
     */
    appsOutputFirst() {
        // Apps with output are first in the list
        const appsOutput = this.appsView.filter((app) => {
            return app && app.out && app.out.length > 0;
        });
        
        // Apps without output are last in the list
        const appsNoOutput = this.appsView.filter((app) => {
            // app.out is either 'undefined' or empty string
            return !app.out;
        });
        
        this.appsView = [...appsOutput, ...appsNoOutput];
    }
    
    /**
     * Create default apps view
     */
    defaultAppsView() {
        const operationName = "[Transform array]";
        
        console.log(`${operationName} Sort alphabetically`);
        
        // Sort alphabetically
        this.sortAlphabetically();
        
        this.replaceUndefined();
        
        this.appsOutputFirst();
    }
}
