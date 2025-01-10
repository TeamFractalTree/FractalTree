
import { SelectButton } from 'primereact/selectbutton';
import { useState } from 'react';
import "../CSS/BottomBar.css"
import { IconSandbox } from '@tabler/icons-react';
import { IconSchool } from '@tabler/icons-react';
import { IconCode } from '@tabler/icons-react';
import { Link, NavLink, useLocation } from 'react-router';
import { useNavigate } from 'react-router';

export default function BottomBar() {

    var location = useLocation().pathname;
    var navigate = useNavigate();

    var tabIndexes = [0, 1, 2]
    var tabNames = ["Snippets", "Lessons", "Sandbox"];
    var tabIcons = [<IconCode/>, <IconSchool/>, <IconSandbox/>]

    var isTabSelected = (tabName) => location.toLowerCase().replaceAll("/", "").endsWith(tabName.toLowerCase())
    var selectedTab = (tabNames.map(isTabSelected)).findIndex((t) => !!t);

    var barItemTemplate = (option) => {
        return (
            <NavLink className="barItem" to={"/" + tabNames[option].toLowerCase()} viewTransition>
                {tabIcons[option]}
                {tabNames[option]}
            </NavLink>
        )
    }


    return (
        <div className="bottomBar">
            <SelectButton value={selectedTab} itemTemplate={barItemTemplate} options={tabIndexes} />
        </div>
    )
}