import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { useState } from 'react';
import "../CSS/Scanner.css"
import { useRef } from 'react';
import Webcam from "react-webcam";

export default function Scanner() {

    var [scannerVisible, setScannerVisible] = useState(false);
    window.openScanner = () => setScannerVisible(true);

    return (
        <Sidebar style={{ height: "100%" }} position="bottom" className="scannerContainer" visible={scannerVisible} onHide={() => setScannerVisible(false)}>
            <Webcam className="camera" audio={false} videoConstraints={{ facingMode: "environment" }} ></Webcam>
            <img src="/ScannerBackground.png" className="scannerOverlay">

            </img>
        </Sidebar>
    )
}