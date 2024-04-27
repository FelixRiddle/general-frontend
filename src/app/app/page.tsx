import ClientApp from "./ClientApp";
import { getAppsData } from "@/api/appManager/app";

/**
 * App manager
 */
export default async function App() {
    return(
        <div>
            <ClientApp apps={await getAppsData()}></ClientApp>
        </div>
    );
}
