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
    return (
        <div className={"bg-red-200 m-1 border-2 border-"}>
            <p className={"text-red-600 p-1 m-1"}>{status.message}</p>
        </div>
    );
}
