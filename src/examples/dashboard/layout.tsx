
/**
 * Dashboard layout
 * 
 * @param param0 
 * @returns 
 */
export default function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            {/* Include shared UI Here */}
            <nav></nav>
            {children}
        </section>
    );
}
