import userDataRoute from "@/api/user/data";
import { CompleteUserData } from "felixriddle.good-roots-ts-api";
import { redirect } from "next/navigation";

/**
 * Get user or redirect
 */
export async function userVanguard(redirectTo: string = "/"): Promise<CompleteUserData> {
    // Get user
    const userData = await userDataRoute();
    
    // Check that validation passes
    if(!userData) {
        // Show the first page then
        console.log(`Couldn't find user, redirecting!`);
        redirect(redirectTo);
    }
    
    return userData;
}
