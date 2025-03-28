import { createRoot } from "react-dom/client";
import "./CSS/App.css";
import "./CSS/PrimeReact.css";
import App from "./App.jsx";
import { MemoryRouter, Route, Routes } from "react-router";
import SandboxPage from "./Components/SandboxPage";
import LessonsPage from "./Components/LessonsPage";
import LanguageSelect from "./Components/LanguageSelect.jsx";
import Scanner from "./Components/Scanner.jsx";
import CodeEditor from "./Components/CodeEditor.jsx";
import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next, useSSR, useTranslation } from "react-i18next";
import { registerSW } from "virtual:pwa-register";
import IsDevMode from "./Helpers/DevModeDetector.js";
import LanguageDetector from "i18next-browser-languagedetector";
import ProjectsPage from "./Components/ProjectsPage.jsx";
import { HTMLHost } from "./Helpers/HTMLEngine.jsx";
import PhoneWrapper from "./Components/PhoneWrapper.jsx";
import ProjectPage from "./Components/ProjectPage.jsx";
import "./Helpers/ServerStatus.js";
import { useState } from "react";
import ProjectHub from "./Components/ProjectHub.jsx";
import "./Helpers/AndroidBackHandler.js";
import "./Helpers/MobileFullscreen.js";
import SettingsPage from "./Components/SettingsPage.jsx";
import "./BaseURL.js";
import { GetInterfaceLanguage, ReloadLanguageData } from "./Helpers/InterfaceLanguageManager.js";
import ProjectAssetEditor from "./Components/ProjectAssetEditor.jsx";
import IconPicker from "./Components/IconPicker.jsx";
import GlobalLoadingBox from "./Components/GlobalLoadingBox.jsx";
import CodePeek from "./Components/CodePeek.jsx";

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        debug: true,

        interpolation: {
            escapeValue: false, // not needed for react!!
        },
    });
    
ReloadLanguageData();

window.startReact = () => {
    createRoot(document.getElementById("root")).render(
        window.innerHeight / window.innerWidth < 1.45 ? <PhoneWrapper/> : <Main/>
    );
    window.StartUpdateCycle();
};
window.doneInitStep();


if ("serviceWorker" in navigator) {
    if (!IsDevMode()) {
        registerSW();
    }
}
  

function Main() {

    var { t } = useTranslation();
    window.t = t;

    var [serverStatus, setServerStatus] = useState("PINGING");
    window.serverStatus = serverStatus;
    window.setServerStatus = setServerStatus;

    return (
        <MemoryRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/sandbox" element={<SandboxPage />} />
                <Route path="/lessons" element={<LessonsPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
            </Routes>

            <LanguageSelect></LanguageSelect>
            <Scanner></Scanner>
            <CodeEditor></CodeEditor>
            <CodePeek></CodePeek>
            <HTMLHost></HTMLHost>
            <ProjectPage></ProjectPage>
            <ProjectHub></ProjectHub>
            <SettingsPage></SettingsPage>
            <ProjectAssetEditor></ProjectAssetEditor>
            <IconPicker></IconPicker>
            <GlobalLoadingBox></GlobalLoadingBox>
        </MemoryRouter>
    );
}