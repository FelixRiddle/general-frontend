import { redirect } from "next/navigation";

/**
 * App manager
 */
export default async function App() {
    return redirect('/app/paginated-app-view');
}
