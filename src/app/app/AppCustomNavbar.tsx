import CustomNavbar from "@/components/navbar/customNavbar/CustomNavbar";

/**
 * App custom navbar
 */
export default function AppCustomNavbar() {
    return (
        <div>
            {/* Other views */}
            <CustomNavbar pagesInfo={
                [{
                    displayName: "Apps",
                    href: "/app"
                }, {
                    displayName: "Groups",
                    href: "/app/groups"
                }, {
                    displayName: "Process",
                    href: "/app/process"
                }]
            }>
            </CustomNavbar>
        </div>
    );
}
