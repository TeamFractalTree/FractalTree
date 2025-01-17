import * as localForage from "localforage";
import BottomBar from "./BottomBar";
import Header from "./Header";
import { Button } from 'primereact/button';
import { useState } from "react";
import "../CSS/ProjectsPage.css";
import { IconPlus } from "@tabler/icons-react";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import CodeTemplates from "../Helpers/CodeTemplates";
import LanguageIcon from "./LanguageIcon";


export default function ProjectsPage() {

    var [projects, setProjects] = useState([]);
    var [projectLoadState, setProjectLoadState] = useState("none");

    if (projectLoadState == "none") {
        setProjectLoadState("loading");
        setTimeout(async () => {
            var projectStore = await localForage.getItem("projectStore");
            if (projectStore == null) {
                projectStore = { projects: [] };
                await localForage.setItem("projectStore", projectStore)
            }

            setProjects(projectStore.projects);
        }, 0);
    }

    var createProject = () => {
        window.openLanguageSelector("BEFORE_PROJECT", async (lang) => {
            var newProject = {
                "name": "New Project (" + lang + ")",
                "author": localStorage.displayName || "Anonymous",
                "description": "",
                "assets": [],
                "language": lang,
                "code": CodeTemplates[lang](),
                "id": (localStorage.displayName || "Anonymous" + Math.random()) + new Date().getTime()
            }

            projects.push(newProject);
            await localForage.setItem("projectStore", { projects: projects });
            setProjectLoadState("none"); // Reload Project List
        });
    }


    return (
        <>
            <Header>{t("SECTION_PROJECTS")}</Header>

            <div className="projectsPage">
                {
                    projects.length == 0 ? (<p>{t("ERROR_NO_PROJECTS")}</p>) : ""
                }
                <Button onClick={createProject} className="createProjectButton"><IconPlus/></Button>

                {
                    projects.map((project, i) => {
                        return (<ProjectCard setProjectLoadState={setProjectLoadState} key={i} {...project}></ProjectCard>)
                    })
                }
            </div>

            <Dialog draggable={false} closable={false} header={t("ACTION_SET_NAME")} visible={!localStorage.displayName} style={{ width: '90vw' }}>
                <p>{t("ACTION_SET_NAME_DESCRIPTION")}</p>
                <InputText placeholder="New Username" value={localStorage.displayName} onChange={(e) => localStorage.displayName = e.target.value} />
                <br></br>
                <Button onClick={() => setProjectLoadState("none")}>{t("ACTION_CONTINUE")}</Button>
            </Dialog>

            <BottomBar></BottomBar>
        </>
    )
}

function ProjectCard(props) {

    var openProject = () => {
        window.openProjectPage(Object.assign({}, props), async (newState, isHard) => {
            // Update the project state in the store
            var projectStore = await localForage.getItem("projectStore", projectStore);
            projectStore.projects[projectStore.projects.findIndex((p) => p.id == props.id)] = newState;

            await localForage.setItem("projectStore", Object.assign({}, projectStore)); // Save

            if (!!isHard) {
                props.setProjectLoadState("none"); // Reload projects
            }
        });
    }

    return (
        <div onClick={openProject} {...props} className="projectCard">
            <h2 className="projectTitle">{props.name}</h2>
            <p className="projectDescription">{props.description || t("ERROR_NO_DESCRIPTION")}</p>
            <LanguageIcon icon={props.language + ".webp"}></LanguageIcon>
        </div>
    )
}