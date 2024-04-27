import { getApps } from "@/api/appManager/apps";
import AppCustomNavbar from "../AppCustomNavbar";
import CreateGroupForm from "./CreateGroupForm";

/**
 * App groups page
 */
export default async function GroupsPage({
    searchParams,
}: {
    searchParams: {
        query?: string;
        page?: string;
    }
}) {
    const apps = await getApps()
        .then((res) => {
            return res?.apps;
        })
        .catch((err) => {
            console.error(err);
        });
    
    return (
        <div>
            <AppCustomNavbar />
            
            <h1>App groups</h1>
            <p>
                Apps can be grouped together to manage them together.
            </p>
            
            {/* No joke, it's really hard to program this thing */}
            <CreateGroupForm apps={apps || []} searchParams={searchParams} />
        </div>
    );
}

