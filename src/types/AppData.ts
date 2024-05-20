
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
