import { v4 as uuidv4 } from 'uuid';

import AppData from '@/types/AppData';
import SelectableAppView from '../../single/selectableAppView/SelectableAppView';

/**
 * Show apps
 * 
 * Use with 'useSelectedApps' hook
 */
export default function ShowApps({
    apps,
    appsGroup,
    selectClickCb,
}: {
    apps: AppData[];
    appsGroup?: AppData[];
    selectClickCb?: ((event: any, appName: string) => void);
}) {
    // Only apps with package.json
    const appsWithPackageJson = apps.filter(app => app.packageJson && true);
    
    return (
        <div>
            {/* Show all apps */}
            {appsWithPackageJson.map((app, index) => {
                let selectedApp = false;
                if(appsGroup) {
                    let isAppSelected = appsGroup.find(selectedApp => {
                        // Validate that there's package json in the app
                        return selectedApp.packageJson && selectedApp.packageJson.name === app.packageJson.name;
                    });
                    
                    selectedApp = isAppSelected ? true : false;
                }
                
                return (
                    <SelectableAppView
                        key={uuidv4()}
                        app={app}
                        selected={selectedApp}
                        selectClickCb={selectClickCb}
                    ></SelectableAppView>
                );
            })}
        </div>
    );
}
