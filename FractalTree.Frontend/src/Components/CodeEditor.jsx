import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { useState } from 'react';
import Editor from 'react-simple-code-editor';
import "../CSS/CodeEditor.css"
import Header from './Header';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

export default function CodeEditor() {

    var [editorVisible, setEditorVisible] = useState(false);
    var [codeState, setCodeState] = useState({});
    var [callback, setCallback] = useState([]);
    window.openCodeEditor = (newCodeState, newCallback) => { setCodeState(newCodeState); setCallback([newCallback]); setEditorVisible(true); }

    var updateCode = (newCode) => {
        codeState.code = newCode;
        setCodeState(Object.assign({}, codeState)); // Sets codeState to a duplicated version of itself
    }

    return (
        <Sidebar style={{ height: "100vh", width: "100vw" }} className="codeEditorContainer" position="right" visible={editorVisible} onHide={() => setEditorVisible(false)}>
            <Header>Touch-Up Code</Header>
            <div className="codeEditorScroller">
                <Editor
                    value={codeState?.code || ""}
                    className="codeEditor"
                    onValueChange={updateCode}
                    padding={10}
                    highlight={() => highlight(codeState?.code || "", languages.js)}
                />
            </div>
        </Sidebar>
    )
}