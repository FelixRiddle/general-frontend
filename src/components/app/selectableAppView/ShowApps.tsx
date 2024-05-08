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
    // Only apps with package.json
    const appsWithPackageJson = apps.filter(app => app.packageJson && true);
    
    // console.log(`Apps with package json: `, appsWithPackageJson);
    // const appsWithoutPackageJson = apps.filter(app => app.packageJson && false);
    // console.log(`Apps without package json: `, appsWithoutPackageJson);
    
    return (
        <div>
            {/* Show all apps */}
            {appsWithPackageJson.map((app, index) => {
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
            })}
        </div>
    );
}
