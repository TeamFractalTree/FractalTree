
import { SelectButton } from 'primereact/selectbutton';
import { useState } from 'react';
import "../CSS/BottomBar.css"
import { IconSandbox } from '@tabler/icons-react';
import { IconSchool } from '@tabler/icons-react';
import { IconCode } from '@tabler/icons-react';

export default function BottomBar() {

    var tabIndexes = [0, 1, 2]
    var tabNames = ["Sandbox", "Lessons", "Snippets"];
    var tabIcons = [<IconSandbox/>, <IconSchool/>, <IconCode/>]

    var [selectedTab, setSelectedTab] = useState(0);

    var barItemTemplate = (option) => {
        return (
            <div className="barItem">
                {tabIcons[option]}
                {tabNames[option]}
            </div>
        )
    }

    var switchTabs = (newTab) => {
        if (newTab === null) { return; }
        setSelectedTab(newTab);
    }

    return (
        <div className="bottomBar">
            <SelectButton value={selectedTab} onChange={(e) => switchTabs(e.value)} itemTemplate={barItemTemplate} options={tabIndexes} />
        </div>
    )
}