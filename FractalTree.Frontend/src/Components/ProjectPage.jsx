import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { useRef, useState } from 'react';
import Header from './Header';
import "../CSS/ProjectPage.css";
import { CompileApp } from '../Helpers/AppCompiler';

export default function ProjectPage() {

    var [pageVisible, setPageVisible] = useState(false);
    var [projectState, setProjectState] = useState({});
    var [callback, setCallback] = useState([]);

    window.openProjectPage = (newprojectState, newCallback) => { setProjectState(newprojectState); setCallback([newCallback]); setPageVisible(true); }
    
    return (
        <Sidebar style={{ height: "100vh", width: "100vw" }} className="projectPageContainer" position="right" visible={pageVisible}>
            <Header onBack={() => { (callback[0] || console.log)(Object.assign({}, projectState), true); setPageVisible(false) }}>{projectState.name || "Unknown Project"}</Header>
            
        </Sidebar>
    )
}