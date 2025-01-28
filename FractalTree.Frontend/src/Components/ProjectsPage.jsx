import * as localForage from "localforage";
import BottomBar from "./BottomBar";
import Header from "./Header";
import { Button } from "primereact/button";
import { useState } from "react";
import "../CSS/ProjectsPage.css";
import { IconPlus } from "@tabler/icons-react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import CodeTemplates from "../Helpers/CodeTemplates";
import LanguageIcon from "./LanguageIcon";
import ServerStatusText from "./ServerStatusText";
import ProjectIcon from "./ProjectIcon";

export default function ProjectsPage() {

    var [projects, setProjects] = useState([]);
    var [projectLoadState, setProjectLoadState] = useState("none");
    window.isProjectLocal = (project) => {
        return projects.filter((p) => p.id == project.id).length > 0;
    };

    if (projectLoadState == "none") {
        setProjectLoadState("loading");
        setTimeout(async () => {
            var projectStore = await localForage.getItem("projectStore");
            if (projectStore == null) {
                projectStore = { projects: [] };
                await localForage.setItem("projectStore", projectStore);
            }

            setProjects(projectStore.projects);
        }, 0);
    }

    var createProject = () => {
        window.openLanguageSelector("BEFORE_PROJECT", async (lang) => {

            try {
                // Generate an RSA keypair 
                var keys = await window.crypto.subtle.generateKey(
                    {
                        name: "RSASSA-PKCS1-v1_5",
                        modulusLength: 1024,
                        publicExponent: new Uint8Array([1, 0, 1]),
                        hash: "SHA-256",
                    },
                    true,
                    ["sign", "verify"],
                );
                var publicKey = await window.crypto.subtle.exportKey("spki", keys.publicKey);
                var privateKey = await window.crypto.subtle.exportKey("pkcs8", keys.privateKey);
                publicKey = btoa(String.fromCharCode(...new Uint8Array(publicKey)));
                privateKey = btoa(String.fromCharCode(...new Uint8Array(privateKey)));

                await localForage.setItem("pk_" + publicKey, privateKey); // Store the private key for later

                var newProject = {
                    "name": "New Project (" + lang + ")",
                    "author": localStorage.displayName || "Anonymous",
                    "description": "",
                    "assets": {},
                    "language": lang,
                    "code": CodeTemplates[lang](),
                    "id": publicKey,
                    "hubID": crypto.randomUUID()
                };

                projects.push(newProject);
                await localForage.setItem("projectStore", { projects: projects });
                setProjectLoadState("none"); // Reload Project List
            }
            catch {
                // Creating a project requires a secure origin, so it might fail
                alert(t("ERROR_GENERIC"));
            }

        });
    };


    return (
        <>
            <Button onClick={createProject} className="createProjectButton"><IconPlus/></Button>

            <Header>{t("SECTION_PROJECTS")}</Header>

            <div className="page projectsPage">

                <div onClick={window.openProjectHub} className="projectCard projectHubCard">
                    <h2>{t("SECTION_PROJECT_HUB")}</h2>
                    <p>{t("SECTION_PROJECT_HUB_DESCRIPTION")}</p>
                    <ServerStatusText></ServerStatusText>
                </div>

                {
                    projects.length == 0 ? (<p>{t("ERROR_NO_PROJECTS")}</p>) : ""
                }

                {
                    projects.map((project, i) => {
                        return (<ProjectCard project={project} setProjectLoadState={setProjectLoadState} key={i}></ProjectCard>);
                    })
                }
            </div>

            <Dialog draggable={false} closable={false} header={t("ACTION_SET_NAME")} visible={!localStorage.displayName} style={{ width: "90vw" }}>
                <p>{t("ACTION_SET_NAME_DESCRIPTION")}</p>
                <InputText placeholder="New Username" value={localStorage.displayName} onChange={(e) => localStorage.displayName = e.target.value} />
                <br></br>
                <Button onClick={() => setProjectLoadState("none")}>{t("ACTION_CONTINUE")}</Button>
            </Dialog>

            <BottomBar></BottomBar>
        </>
    );
}

function ProjectCard(props) {

    var openProject = () => {
        window.openProjectPage(Object.assign({}, props.project), async (newState, isHard) => {
            // Update the project state in the store
            var projectStore = await localForage.getItem("projectStore", projectStore);
            projectStore.projects[projectStore.projects.findIndex((p) => p.id == props.project.id)] = newState;

            await localForage.setItem("projectStore", Object.assign({}, projectStore)); // Save

            if (!!isHard) {
                props.setProjectLoadState("none"); // Reload projects
            }
        });
    };

    return (
        <div onClick={openProject} {...props} className="projectCard">
            <h2 className="projectTitle">{props.project.name}</h2>
            <p className="projectDescription">{props.project.description || t("ERROR_NO_DESCRIPTION")}</p>
            <ProjectIcon projectState={props.project}/>
        </div>
    );
}