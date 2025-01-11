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
    }

    return (
        <Sidebar style={{ height: "80vh" }} position="bottom" visible={pickerVisible} onHide={() => setPickerVisible(false)}>
            <h2>Select Programming Language</h2>
            <p>Before scanning your code, we'll need to know what programming language it's written in.</p>
            <Button onClick={() => onLanguageSelected("python")} className="languageOption"><IconBrandPython/> &nbsp; Python</Button>
            <Button onClick={() => onLanguageSelected("javascript")} className="languageOption"><IconBrandJavascript/> &nbsp; JavaScript</Button>
        </Sidebar>
    )
}