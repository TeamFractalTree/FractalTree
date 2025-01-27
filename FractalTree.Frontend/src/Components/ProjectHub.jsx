import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { useRef, useState } from "react";
import Header from "./Header";
import "../CSS/ProjectHub.css";
import { Skeleton } from "primereact/skeleton";
import { GetSidebarPosition } from "../Helpers/InterfaceLanguageManager";

export default function ProjectHub() {

    var [pageVisible, setPageVisible] = useState(false);
    var [loadingState, setLoadingState] = useState("none");
    var [discoveredProjects, setDiscoveredProjects] = useState({ projects: [] });

    window.openProjectHub = () => { setLoadingState("none"); setPageVisible(true); };
    
    if (loadingState == "none" && pageVisible) {
        setLoadingState("loading");
        setTimeout(async () => {
            try {
                var req = await fetch(BaseURL + "/api/hub/discover");
                var res = await req.json();
                setDiscoveredProjects(Object.assign({}, res));
                setLoadingState("success"); 
            }
            catch {
                alert(t("ERROR_NO_CONNECTION_TO_HUB"));
                setPageVisible(false);
            }
        }, 0);
    }

    return (
        <Sidebar style={{ height: "100vh", width: "100vw" }} className="projectHubContainer" position={GetSidebarPosition()} visible={pageVisible}>
            <Header onBack={() => setPageVisible(false)}>{t("SECTION_PROJECT_HUB")}</Header>
            <div className="projectHub">
                {
                    discoveredProjects.projects?.map((project) => {
                        return !!project ? <ExternalProjectCard projectState={project}></ExternalProjectCard> : null;
                    })
                }
                {
                    // Show skeletons if still loading
                    loadingState != "success" ? [...Array(5).keys()].map((i) => <Skeleton key={i} className="externalProjectCard externalProjectCardSkeleton"></Skeleton>) : null
                }
            </div>
        </Sidebar>
    );
}

export function ExternalProjectCard(props) {
    return (
        <div onClick={() => window.openProjectPage(Object.assign({}, props.projectState), () => {})} className="externalProjectCard">
            <div className="projectThumbnail" style={{ background: "url('" + (props.projectState.assets?.thumbnail || `/Images/LangThumbnails/${props.projectState?.language}.webp`) + "')" }}>
                {
                    // Show the language logo if no thumbnail is available
                    !props.projectState.assets?.thumbnail ? (<img src={`/Images/LangIcons/${props.projectState.language}.webp`}></img>) : null
                }
            </div>
            <p><b>{t("PARAM_NAME")}</b> {props.projectState.name}</p>
            <p><b>{t("PARAM_AUTHOR")}</b> {props.projectState.author}</p>
            <p><b>{t("PARAM_DESCRIPTION")}</b> {props.projectState.description || t("ERROR_NO_DESCRIPTION")}</p>
            <p><b>{t("PARAM_LANGUAGE")}</b> {props.projectState.language}</p>
        </div>
    );
}