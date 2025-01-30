import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { useRef, useState } from "react";
import Editor from "react-simple-code-editor";
import Header from "./Header";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-markup";
import { GetSidebarPosition } from "../Helpers/InterfaceLanguageManager";

export default function CodePeek() {

    var [editorVisible, setEditorVisible] = useState(false);
    var [codeState, setCodeState] = useState({});

    window.openCodePeek = (newCodeState) => { 
        setCodeState(newCodeState);
        setEditorVisible(true);
    };

    var getLanguage = () => {

        if (codeState.language == "python") {
            return languages.python;
        }
        else if (codeState.language == "html") {
            return languages.markup;
        }

        return languages.js;
    };



    return (
        <Sidebar style={{ height: "100vh", width: "100vw" }} className="codeEditorContainer" position={GetSidebarPosition()} visible={editorVisible}>
            <Header onBack={() => setEditorVisible(false)}>{t("ACTION_PEEK_CODE")}</Header>
            <div className="codeEditorScroller">
                <Editor
                    value={codeState?.code || ""}
                    className="codeEditor overrideFont"
                    padding={10}
                    highlight={() => highlight(codeState?.code || "", getLanguage())}
                />
            </div>
        </Sidebar>
    );
}