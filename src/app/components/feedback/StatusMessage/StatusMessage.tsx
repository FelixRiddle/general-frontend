import { Status } from "felixriddle.good-roots-ts-api";

/**
 * Status message
 * 
 * Show a simple status message
 */
export default function StatusMessage({
    status
}: {
    status: Status,
}) {
    console.log(`<StatusMessage> data: `, status);
    
    return (
        <div className={"bg-red-200 m-1 border rounded border-rose-600 border-solid"}>
            <p className={"text-rose-600 p-1 m-1"}>{status.message}</p>
        </div>
    );
}
