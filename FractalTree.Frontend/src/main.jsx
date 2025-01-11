import { createRoot } from 'react-dom/client'
import "./CSS/App.css";
import "./CSS/PrimeReact.css";
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from "react-router";
import SandboxPage from "./Components/SandboxPage";
import LessonsPage from "./Components/LessonsPage";
import SnippetsPage from "./Components/SnippetsPage";
import LanguageSelect from './Components/LanguageSelect.jsx';
import Scanner from './Components/Scanner.jsx';
import CodeEditor from './Components/CodeEditor.jsx';
import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next, useTranslation } from 'react-i18next';

i18n
    .use(Backend)
    .use(initReactI18next) // bind react-i18next to the instance
    .init({
        fallbackLng: 'en',
        debug: true,

        interpolation: {
        escapeValue: false, // not needed for react!!
        },
    });

createRoot(document.getElementById('root')).render(
    <Main/>
)

function Main() {

    var { t } = useTranslation();
    window.t = t;

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/sandbox" element={<SandboxPage />} />
                <Route path="/lessons" element={<LessonsPage />} />
                <Route path="/snippets" element={<SnippetsPage />} />
            </Routes>

            <LanguageSelect></LanguageSelect>
            <Scanner></Scanner>
            <CodeEditor></CodeEditor>
        </BrowserRouter>
    )
}