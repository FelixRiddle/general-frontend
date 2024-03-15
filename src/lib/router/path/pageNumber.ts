import { redirect } from "next/navigation";

/**
 * Get page number or redirect to
 * 
 * Note that params must have the field 'pageNumber'
 * 
 * @param params 
 * @param redirectTo 
 * @returns 
 */
export function pageNumberOrRedirectTo(params: { pageNumber: string}, redirectTo: string): number {
    // Query parameters
    const pageNumber = params.pageNumber;
    const pageExpression = /^[0-9]$/;
    
    // Check that validation passes
    if(!pageExpression.test(pageNumber)) {
        // Show the first page then
        console.log(`Didn't pass expression validation, redirecting to first page!`);
        redirect(redirectTo);
    }
    
    return parseInt(pageNumber);
}
