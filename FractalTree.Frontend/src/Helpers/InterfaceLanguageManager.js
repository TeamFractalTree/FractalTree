import i18n from "i18next";


export function GetInterfaceLanguage() {
    return localStorage.interfaceLanguage || "en";
}

export function SwitchInterfaceLanguage(newLanguageCode) {
    localStorage.interfaceLanguage = newLanguageCode;
    ReloadLanguageData();
}

export function ReloadLanguageData() {
    var language = GetInterfaceLanguage();
    document.body.setAttribute("dir", (language == "ar") ? "rtl" : "ltr"); // Make The Page Right-To-Left In Arabic
    i18n.changeLanguage(language);
}

export function GetSidebarPosition() {
    return (GetInterfaceLanguage() == "ar") ? "left" : "right"; // Makes Pages Slide In From The Left Instead Of The Right If Arabic Mode
}