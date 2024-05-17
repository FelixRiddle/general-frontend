import AppCustomNavbar from "./AppCustomNavbar";

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
            <AppCustomNavbar />
            
            {children}
        </section>
    );
  }
