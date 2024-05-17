"use server";

import processes from "@/api/appManager/process/processes";
import Processes from "@/components/process/Processes";

/**
 * 
 */
export default async function ProcessPage() {
    
    const appProcesses = await processes();
    
    const titleClasses = "m-1 p-1 text-xs font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl";
    const linkClasses = "p-1 m-1 font-medium text-blue-600 dark:text-blue-500 hover:underline";
    const paragraphClasses = "p-1 m-1 text-gray-900";
    
    return (
        <div>
            <h1 className={titleClasses}>Processes</h1>
            <p className={paragraphClasses}>
                This is a list of all the processes running on the server
            </p>
            
            <Processes
                processes={appProcesses}
            />
        </div>
    );
}
