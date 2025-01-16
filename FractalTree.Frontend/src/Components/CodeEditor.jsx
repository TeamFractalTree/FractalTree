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
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism.css';
import '@xterm/xterm/css/xterm.css';
import { XTerm } from "@pablo-lion/xterm-react";
import { IconPlayerPlay } from '@tabler/icons-react';
import ExecutePython from '../Helpers/PythonEngine';
import ExecuteJavaScript from '../Helpers/JavaScriptEngine';
import ExecuteHTML, { ExecuteJSX } from '../Helpers/HTMLEngine';
import { CompileApp } from '../Helpers/AppCompiler';

export default function CodeEditor() {

    var xterm = useRef(null);
    var [editorVisible, setEditorVisible] = useState(false);
    var [codeState, setCodeState] = useState({});
    var [callback, setCallback] = useState([]);
    var guiOutputRef = useRef(null);

    window.openCodeEditor = (newCodeState, newCallback) => { setCodeState(newCodeState); setCallback([newCallback]); setEditorVisible(true); }

    window.enableGUIOutput = () => {
        guiOutputRef.current?.classList.add("enabledOutput");
    }

    window.disableGUIOutput = () => {
        guiOutputRef.current?.setAttribute("class", "guiOutputWindow");
    }

    var updateCode = (newCode) => {
        (callback[0] || console.log)(newCode);
        codeState.code = newCode;
        setCodeState(Object.assign({}, codeState)); // Sets codeState to a duplicated version of itself
    }

    var getLanguage = () => {

        if (codeState.language == "python") {
            return languages.python;
        }
        else if (codeState.language == "html") {
            return languages.markup;
        }

        return languages.js;
    }

    var run = () => {
        window.disableGUIOutput();
        if (codeState.language == "python") {
            ExecutePython(codeState.code, (d) => xterm.current.write(d));
        }
        else if (codeState.language == "javascript") {
            ExecuteJavaScript(codeState.code, (d) => xterm.current.write(d));
        }
        else if (codeState.language == "html") {
            ExecuteHTML(codeState.code, (d) => xterm.current.write(d));
        }
        else if (codeState.language == "jsx") {
            ExecuteJSX(codeState.code, (d) => xterm.current.write(d));
        }
    }

    var compile = async () => {
        var result = await CompileApp(codeState);
        console.log(result);
    }

    return (
        <Sidebar style={{ height: "100vh", width: "100vw" }} className="codeEditorContainer" position="right" visible={editorVisible}>
            <Header onBack={() => { (callback[0] || console.log)(codeState.code, true); setEditorVisible(false) }}>{t("ACTION_EDITRUN")}</Header>
            <div className="codeEditorScroller">
                <Editor
                    value={codeState?.code || ""}
                    className="codeEditor overrideFont"
                    onValueChange={updateCode}
                    padding={10}
                    highlight={() => highlight(codeState?.code || "", getLanguage())}
                />

                <Button onClick={run} className="editorRun">
                    <IconPlayerPlay/>
                    &nbsp;
                    {t("ACTION_RUN")}
                </Button>

                <div ref={guiOutputRef} id="guiOutputWindow" className="guiOutputWindow"></div>

                <XTerm ref={xterm} options={{ cols: 35 }} />
            </div>
        </Sidebar>
    )
}