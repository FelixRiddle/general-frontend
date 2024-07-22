"use server";

// FIXME: Not working for some reason
// import SettingsClient from "./SettingsClient";

/**
 * Settings page
 */
export default async function SettingsPage() {
	
    const titleClasses = "m-1 p-1 text-xs font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl";
    const linkClasses = "p-1 m-1 font-medium text-blue-600 dark:text-blue-500 hover:underline";
    const paragraphClasses = "p-1 m-1 text-gray-900";
    
    return (
        <div>
            <h1 className={titleClasses}>Settings</h1>
            <p className={paragraphClasses}>
				Configure how app manager should behave
            </p>
			{/* <SettingsClient /> */}
		</div>
	);
}
