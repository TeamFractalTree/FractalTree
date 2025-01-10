import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { useState } from 'react';
import "../CSS/Scanner.css"
import { useRef } from 'react';
import Webcam from "react-webcam";
import { IconTextScan2 } from '@tabler/icons-react';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function Scanner() {

    var [scannerVisible, setScannerVisible] = useState(false);
    var [scanState, setScanState] = useState("none");

    window.openScanner = () => setScannerVisible(true);

    var startScan = () => {
        setScanState("loading");
    }

    return (
        <Sidebar style={{ height: "100%" }} position="bottom" className="scannerContainer" visible={scannerVisible} onHide={() => setScannerVisible(false)}>
            <Webcam className="camera" audio={false} videoConstraints={{ facingMode: "environment" }} ></Webcam>
            <img src="/ScannerOverlayBackground.png" className="scannerOverlay"></img>
            <Button onClick={startScan} disabled={scanState == "loading"} className="scanButton">
                {
                    // Show Loading Wheel If Loading State Is Active
                    scanState == "loading" ?
                    <ProgressSpinner strokeWidth="8"/> :
                    <IconTextScan2/>
                }
            </Button>
        </Sidebar>
    )
}