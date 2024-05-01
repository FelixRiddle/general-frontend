import { v4 as uuidv4 } from 'uuid';

import AppData from '@/types/AppData';
import SelectableAppView from './SelectableAppView';
import useSelectableApp, { AppSelection } from '@/components/apps/selectableApp/useSelectableApp';

/**
 * Show apps
 */
export default function ShowApps({
    apps,
    appSelection,
    selectClickCb,
}: {
    apps: AppData[];
    appSelection: AppSelection[];
    selectClickCb: (event: any, appName: string) => void;
}) {
    
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
