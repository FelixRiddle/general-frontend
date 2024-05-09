import Anser from "anser";
import { AppOutput } from "@/lib/app/appOutput";

/**
 * Show app output
 */
export default function SimpleAppOutput({ appOutput }: { appOutput: AppOutput }) {
    
    return (
        <div>
            <h3>Output</h3>
            <pre dangerouslySetInnerHTML={{ __html: Anser.ansiToHtml(appOutput.output) }}></pre>
        </div>
    );
}
