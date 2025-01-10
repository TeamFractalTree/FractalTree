import { createRoot } from 'react-dom/client'
import "./CSS/App.css";
import "./CSS/PrimeReact.css";
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from "react-router";
import SandboxPage from "./Components/SandboxPage";
import LessonsPage from "./Components/LessonsPage";
import SnippetsPage from "./Components/SnippetsPage";
import LanguageSelect from './Components/LanguageSelect.jsx';

createRoot(document.getElementById('root')).render(
    (<BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/sandbox" element={<SandboxPage />} />
            <Route path="/lessons" element={<LessonsPage />} />
            <Route path="/snippets" element={<SnippetsPage />} />
        </Routes>
        <LanguageSelect></LanguageSelect>
    </BrowserRouter>)
)
