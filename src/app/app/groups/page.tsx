import AppCustomNavbar from "../AppCustomNavbar";
import CreateGroupForm from "./CreateGroupForm";

/**
 * App groups page
 */
export default function GroupsPage() {
    
    return (
        <div>
            <AppCustomNavbar />
            
            <h1>App groups</h1>
            <p>
                Apps can be grouped together to manage them together.
            </p>
            
            {/* No joke, it's really hard to program this thing */}
            <CreateGroupForm />
        </div>
    );
}

