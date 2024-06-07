
/**
 * 
 */
export default interface AppData {
    path: string;
    packageJson: any;
    running?: boolean;
    name?: string;
    // App output
    out?: string;
    pid?: number;
    url?: string;
    appType?: string;
}

/**
 * Check if app is running
 * 
 * @param app 
 * @returns 
 */
export function isAppRunning(app: AppData) {
    console.log(`App: `, app.packageJson.name);
    
    const isRunning = app.running || app.pid;
    
    console.log(`Is app running?: `, isRunning);
    
    // I sometimes forget to set app.running
    // And it should be removed, as having the pid is a way to know it
    return isRunning;
}
