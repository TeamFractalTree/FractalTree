import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { useRef, useState } from 'react';
import Editor from 'react-simple-code-editor';
import "../CSS/CodeEditor.css"
import Header from './Header';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism.css';
import '@xterm/xterm/css/xterm.css';
import { XTerm } from "@pablo-lion/xterm-react";
import { IconPlayerPlay } from '@tabler/icons-react';
import ExecutePython from '../Helpers/PythonEngine';

export default function CodeEditor() {

    var xterm = useRef(null);
    var [editorVisible, setEditorVisible] = useState(false);
    var [codeState, setCodeState] = useState({});
    var [callback, setCallback] = useState([]);
    window.openCodeEditor = (newCodeState, newCallback) => { setCodeState(newCodeState); setCallback([newCallback]); setEditorVisible(true); }

    var updateCode = (newCode) => {
        codeState.code = newCode;
        setCodeState(Object.assign({}, codeState)); // Sets codeState to a duplicated version of itself
    }

    var getLanguage = () => {

        if (codeState.language == "python") {
            return languages.python;
        }

        return languages.js;
    }

    var run = () => {
        ExecutePython(codeState.code, (d) => xterm.current.write(d));
    }

    return (
        <Sidebar style={{ height: "100vh", width: "100vw" }} className="codeEditorContainer" position="right" visible={editorVisible} onHide={() => setEditorVisible(false)}>
            <Header>{t("ACTION_EDITRUN")}</Header>
            <div className="codeEditorScroller">
                <Editor
                    value={codeState?.code || ""}
                    className="codeEditor"
                    onValueChange={updateCode}
                    padding={10}
                    highlight={() => highlight(codeState?.code || "", getLanguage())}
                />

                <Button onClick={run} className="editorRun">
                    <IconPlayerPlay/>
                    &nbsp;
                    {t("ACTION_RUN")}
                </Button>

                <XTerm ref={xterm} options={{ cols: 35 }} />
            </div>
        </Sidebar>
    )
}