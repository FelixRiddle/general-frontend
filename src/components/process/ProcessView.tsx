export interface Process {
    name: string;
    pid: number;
    url: string;
    appType: string;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Process
 */
export default function ProcessView({
    process
}: {
    process: Process;
}) {
    // Classes
    const arrowClasses = "mt-1 mr-2";
    const appColor = (() => {
        if(process.pid) {
            return "bg-lime-300 border-lime-400";
        } else {
            return "bg-gray-300 border-gray-400";
        }
    })();
    
    // const titleClasses = "m-1 p-1 text-xs font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl";
    const linkClasses = "p-1 m-1 font-medium text-blue-600 dark:text-blue-500 hover:underline";
    const paragraphClasses = "p-1 m-1 text-gray-900";
    
    return (
        <div
            className={`rounded border-2 p-2 m-2 ${appColor} hover:border-emerald-400 hover:bg-emerald-300 hover:cursor-pointer`}
        >
            <h1 className={paragraphClasses}>{process.name}</h1>
        </div>
    );
}

