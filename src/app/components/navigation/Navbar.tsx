'use server';

import { CompleteUserData } from "felixriddle.good-roots-ts-api";
import userDataRoute from "@/api/user/data";
import ClientNavbar from "./ClientNavbar";

/**
 * Navbar
 */
export default async function Navbar({ userData }: { userData?: CompleteUserData | undefined }) {
    // You may give the user, so there's no need to make two requests
    let user = userData;
    if(!user) {
        // Get authenticated user
        const newUserData = await userDataRoute();
        
        if(newUserData) {
            user = newUserData;
        }
    }
    
    return (
        <nav className="flex">
            <ClientNavbar user={user} />
        </nav>
    );
}
