import CustomNavbar from "@/components/customNavbar/CustomNavbar";

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
                }]
            }>
            </CustomNavbar>
        </div>
    );
}
