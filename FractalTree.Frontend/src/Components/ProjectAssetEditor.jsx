import { Sidebar } from "primereact/sidebar";
import Header from "./Header";
import { GetSidebarPosition } from "../Helpers/InterfaceLanguageManager";
import "../CSS/ProjectAssetEditor.css";
import { InputText } from 'primereact/inputtext';
import { useState } from "react";
import { Button } from "primereact/button";
import { Carousel } from 'primereact/carousel';
import * as localForage from "localforage";

export default function ProjectAssetEditor(props) {

    var [pageVisible, setPageVisible] = useState(false);
    var [projectState, setProjectState] = useState({});
    var [callback, setCallback] = useState([]);

    var availableThumbnails = ["html", "javascript", "jsx", "python"];
    var selectedThumbnail = projectState.assets?.thumbnail || projectState.language;

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

    var modifyThumbnail = async (newValue) => {
        projectState.assets.thumbnail = availableThumbnails[newValue.page];
        setProjectState(Object.assign({}, projectState));
        await (callback[0])(Object.assign({}, projectState));
    }

    var saveProject = async () => {
        setProjectState(Object.assign({}, projectState));
        await (callback[0])(Object.assign({}, projectState), true);
    }

    var deleteProject = async () => {
        if (confirm(t("ACTION_DELETE_PROJECT_DESCRIPTION"))) {
            // remove the project state from the store
            var projectStore = await localForage.getItem("projectStore", projectStore);
            projectStore.projects = projectStore.projects.filter((p) => p.id != projectState.id);
            await localForage.setItem("projectStore", Object.assign({}, projectStore)); // Save
            location.reload();
        }
    }

    return (
        <Sidebar style={{ height: "100vh", width: "100vw" }} className="projectAssetEditorContainer" position={GetSidebarPosition()} visible={pageVisible}>
            <Header onBack={() => { saveProject(); setPageVisible(false); }}>{t("SECTION_PROJECT_ASSET_EDITOR")}</Header>
            <div className="projectAssetEditor">
                <label>{t("PARAM_NAME")}</label>
                <InputText className="projectProperty" value={projectState.name} onChange={(e) => modifyProjectProperty("name", e.target.value)} />

                <label>{t("PARAM_DESCRIPTION")}</label>
                <InputText className="projectProperty" value={projectState.description} onChange={(e) => modifyProjectProperty("description", e.target.value)} />

                <label>{t("PARAM_THUMBNAIL_BG")}</label>
                <Carousel onPageChange={modifyThumbnail} page={availableThumbnails.findIndex((t) => t == selectedThumbnail)} className="thumbnailCarousel" value={availableThumbnails} numVisible={1} numScroll={1} itemTemplate={ThumbnailCarouselTemplate} />

                <Button onClick={deleteProject} severity="danger" className="projectProperty">{t("ACTION_DELETE_PROJECT")}</Button>
            </div>
        </Sidebar>
    )
}

function ThumbnailCarouselTemplate(value) {
    return (
        <div className="thumbnailCarouselTemplate" style={{ backgroundImage: "url('" + `/Images/LangThumbnails/${value}.webp` + "')" }}/>
    );
}