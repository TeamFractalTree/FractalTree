import * as localForage from "localforage";
import BottomBar from "./BottomBar";
import Header from "./Header";
import { Button } from 'primereact/button';
import { useState } from "react";
import "../CSS/ProjectsPage.css";
import { IconPlus } from "@tabler/icons-react";

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
        window.openLanguageSelector("BEFORE_PROJECT", (lang) => {
            alert(lang);
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
            </div>

            <BottomBar></BottomBar>
        </>
    )
}