import AppData from "@/types/AppData";

/**
 * App but client side
 */
export default function ClientApp({ apps }: { apps: AppData[] }) {
    
    for(let app of apps) {
        console.log(`App(${app.path}): `, app);
    }
    
    return (
        <div>
            
        </div>
    );
}
