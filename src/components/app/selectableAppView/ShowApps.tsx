import { v4 as uuidv4 } from 'uuid';

import AppData from '@/types/AppData';
import SelectableAppView from './SelectableAppView';
import useSelectableApp, { AppSelection } from '@/components/apps/selectableApp/useSelectableApp';

/**
 * Show apps
 */
export default function ShowApps({
    apps,
    appsGroup,
    selectClickCb,
}: {
    apps: AppData[];
    appsGroup: AppData[];
    selectClickCb: (event: any, appName: string) => void;
}) {
    
    return (
        <div>
            {/* Show all apps */}
            {apps.map((app, index) => {
                // Check that package json exists
                if(app.packageJson) {
                    const selectedApp = appsGroup.find(selectedApp => {
                        
                        // Validate that there's package json in the app
                        return selectedApp.packageJson && selectedApp.packageJson.name === app.packageJson.name;
                    });
                    
                    return (
                        <SelectableAppView
                            key={uuidv4()}
                            app={app}
                            selected={selectedApp ? true : false}
                            selectClickCb={selectClickCb}
                        ></SelectableAppView>
                    );
                }
                
                // If package json doesn't exists
                // Don't show anything then
                return (<></>);
            })}
        </div>
    );
}
