import { Sidebar } from "primereact/sidebar";
import Header from "./Header";
import { GetSidebarPosition } from "../Helpers/InterfaceLanguageManager";
import "../CSS/ProjectAssetEditor.css";
import { InputText } from 'primereact/inputtext';
import { useState } from "react";

export default function ProjectAssetEditor(props) {

    var [pageVisible, setPageVisible] = useState(false);
    var [projectState, setProjectState] = useState({});
    var [callback, setCallback] = useState([]);

    window.openProjectAssetEditor = (newState, newCallback) => {
        setProjectState(newState);
        setCallback([newCallback]);
        setPageVisible(true);
    }

    var modifyProjectProperty = async (property, newValue) => {
        projectState[property] = newValue;
        setProjectState(Object.assign({}, projectState));
        await (callback[0])(Object.assign({}, projectState));
    }

    var saveProject = async () => {
        setProjectState(Object.assign({}, projectState));
        await (callback[0])(Object.assign({}, projectState), true);
    }

    return (
        <Sidebar style={{ height: "100vh", width: "100vw" }} className="projectAssetEditorContainer" position={GetSidebarPosition()} visible={pageVisible}>
            <Header onBack={() => { saveProject(); setPageVisible(false); }}>{t("SECTION_PROJECT_ASSET_EDITOR")}</Header>
            <div className="projectAssetEditor">
                <InputText value={projectState.name} onChange={(e) => modifyProjectProperty("name", e.target.value)} />
            </div>
        </Sidebar>
    )
}