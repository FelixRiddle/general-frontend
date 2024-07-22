import AppNavbar from "./AppNavbar";

/**
 * App layout
 */
export default function AppLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <section>
			<AppNavbar />
            
            {children}
        </section>
    );
}
