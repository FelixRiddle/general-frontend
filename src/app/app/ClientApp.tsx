import SimpleAppView from "@/components/app/simpleAppView/SimpleAppView";
import AppData from "@/types/AppData";

/**
 * App but client side
 */
export default function ClientApp({ apps }: { apps: AppData[] }) {
    
    // for(let app of apps) {
    //     console.log(`App(${app.path}): `, app);
    // }
    
    return (
        <div>
            {apps.map(app => {
                return (
                    <SimpleAppView app={app}></SimpleAppView>
                );
            })}
        </div>
    );
}
