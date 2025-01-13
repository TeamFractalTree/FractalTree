import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { useState } from 'react';
import "../CSS/LanguageSelect.css"
import { IconBrandPython } from '@tabler/icons-react';
import { IconBrandJavascript } from '@tabler/icons-react';

export default function LanguageSelect() {

    var [pickerVisible, setPickerVisible] = useState(false);
    var [callback, setCallback] = useState([]);
    window.openLanguageSelector = (newCallback) => { setCallback([newCallback]); setPickerVisible(true); }

    var onLanguageSelected = (lang) => {
        var callbackToRun = callback[0] || console.log;
        callbackToRun(lang);
        setTimeout(() => setPickerVisible(false), 0);
    }

    return (
        <Sidebar style={{ height: "80vh" }} position="bottom" visible={pickerVisible} onHide={() => setPickerVisible(false)}>
            <h2>{t("ACTION_SELECTLANG")}</h2>
            <p>{t("ACTION_SELECTLANG_DESCRIPTION")}</p>
            <Button onClick={() => onLanguageSelected("python")} className="languageOption"><IconBrandPython/> &nbsp; {t("LANG_PYTHON")}</Button>
            <Button onClick={() => onLanguageSelected("javascript")} className="languageOption"><IconBrandJavascript/> &nbsp; {t("LANG_JAVASCRIPT")}</Button>
        </Sidebar>
    )
}