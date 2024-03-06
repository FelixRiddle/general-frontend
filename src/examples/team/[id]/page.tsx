import { redirect } from "next/navigation";

/**
 * Fetch team
 * 
 * @param id 
 * @returns 
 */
async function fetchTeam(id: string) {
    const res = await fetch("https://");
    if(!res.ok) return undefined;
    return res.json();
}

/**
 * Profile
 */
export default async function Profile({ params }: { params: { id: string } }) {
    const team = await fetchTeam(params.id);
    if(!team) {
        redirect("/login");
    }
    
    return (
        <div>
            <pre>{team}</pre>
        </div>
    );
}
