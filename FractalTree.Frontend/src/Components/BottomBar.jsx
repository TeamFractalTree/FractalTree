
import { SelectButton } from "primereact/selectbutton";
import { useState } from "react";
import "../CSS/BottomBar.css";
import { IconPackage, IconSandbox } from "@tabler/icons-react";
import { IconSchool } from "@tabler/icons-react";
import { IconCode } from "@tabler/icons-react";
import { Link, NavLink, useLocation } from "react-router";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

export default function BottomBar() {

    var location = useLocation().pathname;
    var navigate = useNavigate();

    var tabIndexes = [0, 1, 2];
    var tabNames = ["Projects", "Lessons", "Sandbox"];
    var tabIcons = [<IconPackage key={0}/>, <IconSchool key={1}/>, <IconSandbox key={2}/>];

    var isTabSelected = (tabName) => location.toLowerCase().replaceAll("/", "").endsWith(tabName.toLowerCase());
    var selectedTab = (tabNames.map(isTabSelected)).findIndex((t) => !!t);

    var barItemTemplate = (option) => {
        return (
            <div className="barItem" onClick={() => navigate("/" + tabNames[option].toLowerCase())}>
                {tabIcons[option]}
                {t("SECTION_" + tabNames[option].toUpperCase())}
            </div>
        );
    };


    return (
        <div className="bottomBar">
            <SelectButton value={selectedTab} itemTemplate={barItemTemplate} options={tabIndexes} />
        </div>
    );
}