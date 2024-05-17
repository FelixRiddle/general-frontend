import ProcessView, { Process } from "./ProcessView";

/**
 * Show processes
 */
export default function Processes({
    processes,
}: {
    processes: Process[],
}) {
    
    return (
        <div>
            {processes.map(process => {
                return (
                    <ProcessView process={process} />
                );
            })}
        </div>
    );
}
