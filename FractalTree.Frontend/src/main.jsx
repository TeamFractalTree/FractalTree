import { createRoot } from 'react-dom/client'
import "./CSS/App.css";
import "./CSS/PrimeReact.css";
import App from './App.jsx'
import { MemoryRouter, Route, Routes } from "react-router";
import SandboxPage from "./Components/SandboxPage";
import LessonsPage from "./Components/LessonsPage";
import SnippetsPage from "./Components/SnippetsPage";
import LanguageSelect from './Components/LanguageSelect.jsx';
import Scanner from './Components/Scanner.jsx';
import CodeEditor from './Components/CodeEditor.jsx';
import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next, useTranslation } from 'react-i18next';
import { registerSW } from "virtual:pwa-register";
import IsDevMode from "./Helpers/DevModeDetector.js";
import LanguageDetector from 'i18next-browser-languagedetector';

localStorage.i18nextLng = navigator.language.split("-")[0];
if (navigator.language.toLowerCase().startsWith("ar")) {
    document.body.setAttribute("dir", "rtl"); // Make The Page Right-To-Left In Arabic
}

i18n
    .use(LanguageDetector)
    .use(Backend)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: true,

        interpolation: {
            escapeValue: false, // not needed for react!!
        },
    });

window.startReact = () => {
    createRoot(document.getElementById('root')).render(
        <Main/>
    )
}
window.doneInitStep();


if ("serviceWorker" in navigator) {
    if (!IsDevMode()) {
        registerSW();
    }
}
  

function Main() {

    var { t } = useTranslation();
    window.t = t;

    return (
        <MemoryRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/sandbox" element={<SandboxPage />} />
                <Route path="/lessons" element={<LessonsPage />} />
                <Route path="/snippets" element={<SnippetsPage />} />
            </Routes>

            <LanguageSelect></LanguageSelect>
            <Scanner></Scanner>
            <CodeEditor></CodeEditor>
        </MemoryRouter>
    )
}