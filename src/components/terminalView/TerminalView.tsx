import Anser from "anser";

import styles from "./terminalView.module.css";

/**
 * Show app output
 */
export default function TerminalView({ output }: { output: string }) {
    
    return (
        <div className={`${styles.view}`} hidden={!output}>
            <div className={`bg-gray-950 border rounded border-gray-100 text-slate-50 p-1 m-1 ${styles.outputContainer}`}>
                <pre dangerouslySetInnerHTML={{ __html: Anser.ansiToHtml(output) }} className={`${styles.output}`} style={{overflowWrap: "break-word"}}></pre>
            </div>
        </div>
    );
}
