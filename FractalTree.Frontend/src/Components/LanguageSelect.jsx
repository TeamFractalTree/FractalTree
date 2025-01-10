import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { useState } from 'react';
import "../CSS/LanguageSelect.css"
import { IconBrandPython } from '@tabler/icons-react';
import { IconBrandJavascript } from '@tabler/icons-react';

export default function LanguageSelect() {

    var [pickerVisible, setPickerVisible] = useState(false);
    window.openLanguageSelector = () => setPickerVisible(true);

    var onLanguageSelected = () => {
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ"); // TODO: Remove In Production
    }

    return (
        <Sidebar style={{ height: "80vh" }} position="bottom" visible={pickerVisible} onHide={() => setPickerVisible(false)}>
            <h2>Select Programming Language</h2>
            <p>Before scanning your code, we'll need to know what programming language it's written in.</p>
            <Button onClick={onLanguageSelected} className="languageOption"><IconBrandPython/> &nbsp; Python</Button>
            <Button onClick={onLanguageSelected} className="languageOption"><IconBrandJavascript/> &nbsp; JavaScript</Button>
        </Sidebar>
    )
}