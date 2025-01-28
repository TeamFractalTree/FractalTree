import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { useRef, useState } from "react";
import Header from "./Header";
import "../CSS/ProjectPage.css";
import { CompileApp } from "../Helpers/AppCompiler";
import { IconBrandAndroid, IconCode, IconPlayerPlay, IconUpload } from "@tabler/icons-react";
import ExecuteHTML, { ExecuteJSX } from "../Helpers/HTMLEngine";
import CompileProjectForAndroid from "../Helpers/AndroidRuntimeCompiler";
import { ExternalProjectCard } from "./ProjectHub";
import { GetSidebarPosition } from "../Helpers/InterfaceLanguageManager";

export default function ProjectPage() {

    var [pageVisible, setPageVisible] = useState(false);
    var [projectState, setProjectState] = useState({});
    var [callback, setCallback] = useState([]);

    window.openProjectPage = (newprojectState, newCallback) => { setProjectState(newprojectState); setCallback([newCallback]); setPageVisible(true); };
    
    var isProjectLocal = window.isProjectLocal || (() => false);

    var runProject = () => {

        // Run directly
        if (projectState.language == "html") {
            ExecuteHTML(projectState.code, () => {});
            return;
        }
        else if (projectState.language == "jsx") {
            ExecuteJSX(projectState.code, () => {});
            return;
        }

        // Run through a readOnly code editor instance
        window.openCodeEditor(Object.assign({}, projectState, { readOnly: true, autoRun: true }), () => {});
    };

    var editProject = () => {
        window.openCodeEditor(Object.assign({}, projectState), (newCode, isHard) => {
            projectState = Object.assign({}, projectState, { code: newCode });
            setProjectState(projectState);
            (callback[0] || console.log)(projectState, isHard);
        });
    };

    var editProjectAssets = () => {
        window.openProjectAssetEditor(Object.assign({}, projectState), (newState, isHard) => {
            projectState = Object.assign({}, newState);
            setProjectState(projectState);
            (callback[0] || console.log)(projectState, isHard);
        });
    };

    var uploadProject = async () => {
        try {
            var req = await fetch(BaseURL + "/api/hub/upload", { method: "POST", body: JSON.stringify(projectState), headers: { "content-type": "application/json" } });

            if (req.status == 201 || req.status == 204) {
                alert(t("ACTION_UPLOAD_DESCRIPTION_CREATED"));
            }
            else if (req.status == 200) {
                alert(t("ACTION_UPLOAD_DESCRIPTION_MODIFIED"));
            }
            else {
                throw Error();
            }
            
        }
        catch {
            alert(t("ACTION_UPLOAD_DESCRIPTION_FAIL"));
        }
    }

    return (
        <Sidebar style={{ height: "100vh", width: "100vw" }} className="projectPageContainer" position={GetSidebarPosition()} visible={pageVisible}>
            <Header onBack={() => { (callback[0] || console.log)((Object.assign({}, projectState)), true); setPageVisible(false); }}>{projectState.name || "Unknown Project"}</Header>
            
            <div className="projectPage">

                <ExternalProjectCard editProjectAssets={isProjectLocal(projectState) ? editProjectAssets : null} projectState={projectState} />

                <Button onClick={runProject} className="projectAction">
                    <IconPlayerPlay/>
                    &nbsp;
                    {t("ACTION_RUN_PROJECT")}
                </Button>

                {
                    // Show edit button only if the user owns the current project
                    isProjectLocal(projectState) ? 
                        <Button onClick={editProject} className="projectAction">
                            <IconCode/>
                        &nbsp;
                            {t("ACTION_EDIT")}
                        </Button> : null
                }

                {               
                    // Show upload button only if the user owns the current project
                    window.serverStatus == "ONLINE" && isProjectLocal(projectState) ? 
                        <Button onClick={uploadProject} className="projectAction">
                            <IconUpload/>
                        &nbsp;
                            {t("ACTION_UPLOAD")}
                        </Button> : null
                }

                {
                    window.serverStatus == "ONLINE" && false ? // Disabled for now because it's incomplete, remove "&& false" to enable
                        <Button onClick={() => CompileProjectForAndroid(projectState)} className="projectAction">
                            <IconBrandAndroid/>
                        &nbsp;
                            {t("ACTION_COMPILE")}
                        </Button> : null
                }




            </div>
        </Sidebar>
    );
}