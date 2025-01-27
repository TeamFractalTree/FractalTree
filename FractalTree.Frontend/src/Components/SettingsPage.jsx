import { useState } from "react";
import "../CSS/SettingsPage.css";
import { Sidebar } from "primereact/sidebar";
import Header from "./Header";

export default function SettingsPage() {

    var [pageVisible, setPageVisible] = useState(false);
    
    window.openSettingsPage = () => setPageVisible(true);

    return (
        <Sidebar style={{ height: "100vh", width: "100vw" }} className="settingsPageContainer" position="right" visible={pageVisible}>
            <Header onBack={() => setPageVisible(false)}>{t("SECTION_SETTINGS")}</Header>
            <div className="settingsPage">
                <h1>{t("ACTION_SELECTLANG_INTERFACE")}</h1>
                <InterfaceLanguageSelect></InterfaceLanguageSelect>
            </div>
        </Sidebar>
    );
}

function InterfaceLanguageSelect() {

    // TODO: Make this dynamic and not hardcoded
    var supportedLanguages = [
        {
            "name": "English",
            "english_name": "English",
            "code": "en"
        },
        {
            "name": "العربية",
            "english_name": "Arabic",
            "code": "ar"
        }
    ]

    return (
        <div className="interfaceLanguageSelect">
            {
                supportedLanguages.map((lang) => {
                    return (
                        <div className="interfaceLanguageOption">
                            <h2>{lang.name}</h2>
                            <p className="secondaryText">{lang.english_name}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}