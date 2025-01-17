import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { useRef, useState } from 'react';
import Header from './Header';
import "../CSS/ProjectPage.css";
import { CompileApp } from '../Helpers/AppCompiler';
import { IconCode, IconPlayerPlay } from '@tabler/icons-react';
import ExecuteHTML, { ExecuteJSX } from '../Helpers/HTMLEngine';

export default function ProjectPage() {

    var [pageVisible, setPageVisible] = useState(false);
    var [projectState, setProjectState] = useState({});
    var [callback, setCallback] = useState([]);

    window.openProjectPage = (newprojectState, newCallback) => { setProjectState(newprojectState); setCallback([newCallback]); setPageVisible(true); }
    
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
        window.openCodeEditor(Object.assign({}, projectState, { readOnly: true, autoRun: true }), () => {})
    }

    var editProject = () => {
        window.openCodeEditor(Object.assign({}, projectState), (newCode, isHard) => {
            projectState = Object.assign({}, projectState, { code: newCode });
            setProjectState(projectState);
            (callback[0] || console.log)(projectState, isHard);
        });
    }

    return (
        <Sidebar style={{ height: "100vh", width: "100vw" }} className="projectPageContainer" position="right" visible={pageVisible}>
            <Header onBack={() => { (callback[0] || console.log)((Object.assign({}, projectState)), true); setPageVisible(false) }}>{projectState.name || "Unknown Project"}</Header>
            
            <div className="projectPage">
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


            </div>
        </Sidebar>
    )
}