import { Button } from 'primereact/button';
import * as tabler from "@tabler/icons-react" 
import { Dialog } from 'primereact/dialog';
import { VirtualScroller } from 'primereact/virtualscroller';
import "../CSS/IconPicker.css";
import { useState } from 'react';
import RemToPixels from "../Helpers/RemToPixels.js";
import { Sidebar } from 'primereact/sidebar';
import { GetSidebarPosition } from '../Helpers/InterfaceLanguageManager.js';
import Header from './Header.jsx';

export default function IconPicker(props) {
    var [isPickerOpen, setIsPickerOpen] = useState(false);
    var [iconLoadingState, setIconLoadingState] = useState("none");
    var [iconMetaList, setIconMetaList] = useState([]);
    var [callback, setCallback] = useState([]);

    window.openIconPicker = (newCallback) => {
        setCallback([newCallback]);
        setIconLoadingState("none");
        setIsPickerOpen(true);
    }

    var onSelect = (iconData) => {
        (callback[0] || console.log)(iconData);
        setIsPickerOpen(false);
    }

    if (iconLoadingState == "none") {
        setIconLoadingState("loading");

        // Download The File With The Icon Metadata
        setTimeout(async () => {
            try {
                var iconURL = "/Misc/icons.json";
                var req = await fetch(iconURL);

                var icons = await req.json(); // The List Of Icons
                var splitIcons = []; // Split The Icons Into Groups, Eg. [[...], [...], [...]], This Is For The VirtualScroller Optimization

                // Create The Groups
                var groupSize = 5;
                var groupCount = Math.ceil(icons.length / groupSize);

                var groupIteration = 0;
                var numInGroupIteration = 0;
                for (var i = 0; i < icons.length; i++) { 

                    // Create The Group If It Doesn't Exist Yet
                    if (!splitIcons[groupIteration]) {
                        splitIcons[groupIteration] = [];
                    }
                    
                    var icon = icons[i];
                    icon.onSelect = (iconData) => onSelect(iconData);
                    splitIcons[groupIteration].push(icon);
                    numInGroupIteration++;

                    // Move To Next Group If The Size Limit Is Reached
                    if (numInGroupIteration >= groupSize) {
                        groupIteration++;
                        numInGroupIteration = 0;
                    }
                }

                setIconMetaList(splitIcons);
                setIconLoadingState("success");
            }
            catch (ex) {
                console.log(ex);
            }


        }, 0);
    }

    return (
        <>
            <Sidebar style={{ height: "100vh", width: "100vw" }} className="iconPickerContainer" position={GetSidebarPosition()} visible={isPickerOpen}>
                <Header onBack={() => setIsPickerOpen(false)}>{t("ACTION_SELECT_ICON")}</Header>
                {
                    iconLoadingState == "success" ? 
                    <VirtualScroller className="iconList" items={iconMetaList} itemTemplate={IconPickerItemTemplate} itemSize={RemToPixels(4)}></VirtualScroller>
                    : null
                }
            </Sidebar>
        </>
    )
}

export function IconPickerItemTemplate(item, options) {

    return (
        <div className="iconListItemContainer">
            {
                item.map((icon) => {

                    
                    var IconName = ConvertIconName(icon.name);
                    var IconToRender = tabler[IconName];

                    // If The Icon Is Missing For Some Reason (Tabler Version Mismatch Usually),
                    // Use The Exclamation Mark Icon In It's Place.
                    // Prevents Having A Gap In The Icons.
                    // The User Is Unlikely To Notice That There Are Multiple Exclamation Mark Icons.
                    if (!IconToRender) {
                        IconName = "IconExclamationCircle";
                        IconToRender = tabler[IconName];
                    }

                    return (
                        <Button key={icon.name} severity="secondary" className="iconListItem" onClick={() => icon.onSelect(icon.svg)}>
                            <IconToRender></IconToRender>
                        </Button>
                    )
                })
            }
        </div>
    )
}

// Converts Icons In The Format "foo-bar" Into "IconFooBar"
function ConvertIconName(iconName) {
    var upperCased = iconName.replace(/(^\w|-\w)/g, (g) => g.replace(/-/, "").toUpperCase());
    return "Icon" + upperCased;
}