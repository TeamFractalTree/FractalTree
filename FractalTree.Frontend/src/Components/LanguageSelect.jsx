import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import "../CSS/LanguageSelect.css";
import LanguageIcon from "../Components/LanguageIcon";

export default function LanguageSelect() {

    var [pickerVisible, setPickerVisible] = useState(false);
    var [callback, setCallback] = useState([]);
    var [context, setContext] = useState([]);
    window.openLanguageSelector = (newContext, newCallback) => { setContext(newContext); setCallback([newCallback]); setPickerVisible(true); };

    var onLanguageSelected = (lang) => {
        var callbackToRun = callback[0] || console.log;
        callbackToRun(lang);
        setTimeout(() => setPickerVisible(false), 0);
    };

    return (
        <Sidebar className='languageSelect' position="bottom" visible={pickerVisible} onHide={() => setPickerVisible(false)}>
            <h2>{t("ACTION_SELECTLANG")}</h2>
            <p>{t("ACTION_SELECTLANG_" + context + "_DESCRIPTION")}</p>
            <div className='languageGrid'>
                <LanguageSelectOption onLanguageSelected={onLanguageSelected} language={"html"} />
                <LanguageSelectOption onLanguageSelected={onLanguageSelected} language={"javascript"} />
                <LanguageSelectOption onLanguageSelected={onLanguageSelected} language={"jsx"} />
                <LanguageSelectOption onLanguageSelected={onLanguageSelected} language={"python"} />
            </div>
        </Sidebar>
    );
}

function LanguageSelectOption(props) {
    return (
        <Button style={{ backgroundImage: `url('/Images/LangThumbnails/${props.language}.webp')` }} onClick={() => props.onLanguageSelected(props.language)} className="languageOption">
            <LanguageIcon icon={props.language + ".webp"}/>
            {t("LANG_" + props.language.toUpperCase())}
        </Button>
    );
}