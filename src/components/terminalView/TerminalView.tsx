import Anser from "anser";

/**
 * Show app output
 */
export default function TerminalView({ output }: { output: string }) {
    
    return (
        <div className="bg-gray-950 border rounded border-gray-100 text-slate-50 p-1 m-1" hidden={!output}>
            <pre dangerouslySetInnerHTML={{ __html: Anser.ansiToHtml(output) }}></pre>
        </div>
    );
}
