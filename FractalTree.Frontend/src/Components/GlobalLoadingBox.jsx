import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import "../CSS/GlobalLoadingBox.css";
import { ProgressSpinner } from 'primereact/progressspinner';

export default function GlobalLoadingBox() {

    var [pageVisible, setPageVisible] = useState(false);
    window.startGlobalLoading = () => { setPageVisible(true); return () => setPageVisible(false); };

    return (
        <Sidebar className="globalLoadingBox" position="bottom" visible={pageVisible}>
            <ProgressSpinner strokeWidth="8"/>
        </Sidebar>
    );
}
