import { v4 as uuidv4 } from 'uuid';

import AppData from '@/types/AppData';
import SelectableAppView from './SelectableAppView';
import useSelectableApp, { AppSelection } from '@/components/apps/selectableApp/useSelectableApp';

/**
 * Show apps
 */
export default function ShowApps({
    apps,
}: {
    apps: AppData[];
}) {
    const {
        appSelection,
        switchAppSelectedState
    } = useSelectableApp({
        apps
    })
    
    const selectClickCb = (event: any, appName: string) => {
        // event.preventDefault();
        
        // Update app selected state
        switchAppSelectedState(appName);
    }
    
    return (
        <div>
            {/* Show all apps */}
            {apps.map((app, index) => {
                return (
                    <SelectableAppView
                        key={uuidv4()}
                        app={app}
                        selected={appSelection[index]}
                        selectClickCb={selectClickCb}
                    ></SelectableAppView>
                );
            })}
        </div>
    );
}
