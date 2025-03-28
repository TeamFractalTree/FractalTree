import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import "../CSS/Scanner.css";
import { useRef } from "react";
import Webcam from "react-webcam";
import { IconCodeOff, IconFile, IconFileUpload, IconTextScan2, IconX } from "@tabler/icons-react";
import { ProgressSpinner } from "primereact/progressspinner";
import Vibrate from "../Helpers/Vibrator";
import Image from "image-js";
import IsDevMode from "../Helpers/DevModeDetector";
import { createWorker } from "tesseract.js";
import jsQR from "jsqr";

window.addEventListener("load", async () => {
    window.tesseractWorker = await createWorker("eng", 1, {
        workerPath: "/Tesseract/worker.js",
        langPath: "/Tesseract",
        corePath: "/Tesseract",
    });

    window.doneInitStep();
});


export default function Scanner() {

    var [scannerVisible, setScannerVisible] = useState(false);
    var [scanState, setScanState] = useState("none");
    var [callback, setCallback] = useState([]);
    var [scanOptions, setScanOptions] = useState({});

    window.openScanner = (newScanOptions, newCallback) => { 
        setScanOptions(newScanOptions);
        setCallback([newCallback]);
        setScannerVisible(true);
    };

    var cameraRef = useRef(null);
    var targetRef = useRef(null);

    var startScan = () => {
        if (!cameraRef.current) { return; }

        setScanState("loading");
        Vibrate();

        setTimeout(async () => {

            if ((parseInt(localStorage.lastScan) || 0) + 15000 > Date.now()) { // 15 Seconds
                alert("You are rate limited to 1 scan per 15 seconds to prevent abuse. This only applies to the demo instance. You may try again later.");
                setScanState("none");
                return;
            }
            localStorage.lastScan = Date.now();

            var callbackToRun = callback[0] || console.log;
            var screenshot = cameraRef.current.getScreenshot(); // Returns A WebP Data URL
            var image = await Image.load(screenshot);

            var parentDimensions = cameraRef.current.video.getBoundingClientRect();
            var targetDimensions = targetRef.current.getBoundingClientRect();

            var scale = image.width / parentDimensions.width;
            var captureX = Math.abs(parentDimensions.x - targetDimensions.x);
            var captureY = Math.abs(parentDimensions.y + targetDimensions.y);

            image = image.crop({
                x: captureX * scale, 
                y: captureY * scale, 
                width: targetDimensions.width * scale, 
                height: targetDimensions.height * scale
            });

            // Try to scan the image as a QR code incase the user is trying to scan a QR code
            var pixelData = image.getRGBAData();
            var code = jsQR(pixelData, image.width, image.height, { inversionAttempts: "dontInvert" });
            
            if (!!code && !!code.data) {
                // We found some code!
                // Use that instead of OCR
                callbackToRun(code.data);
                setScanState("none");
                setTimeout(() => setScannerVisible(false), 0);
                return;
            }

            var savedImage = await image.toBlob("image/png");
            
            if (window.serverStatus == "ONLINE") { // Use OpenAI online scanner
                var formData = new FormData();
                formData.append("image", savedImage);
    
                var result = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.addEventListener("load", () => resolve({ status: xhr.status, body: xhr.responseText }));
                    xhr.addEventListener("error", () => reject(new Error("File Upload Failed")));
                    xhr.addEventListener("abort", () => reject(new Error("File Upload Aborted")));
                    xhr.open("POST", BaseURL + "/api/scan", true);
                    xhr.send(formData);
                });
    
                console.log("Scan result: " + result.body);
    
                // ChatGPT is supposed to just return the string "error" when there's an error
                // But sometimes it adds random characters around it like ".aerror_", probably from the thing it's trying to scan
                // Just check if it contains the "error" string and is short enough
                if (result.body.length < 10 && result.body.toLowerCase().includes("error")) {
                    alert(t("ERROR_BAD_SCAN"));
                    setScanState("error");
                    return;
                }
            }
            else { // Use offline scanner
                var result = (await tesseractWorker.recognize(URL.createObjectURL(savedImage)));
                result = {
                    body: result.data.text
                };
            }
            

            callbackToRun(result.body);

            setScanState("none");
            setTimeout(() => setScannerVisible(false), 0);
        });
    };

    return (
        <Sidebar style={{ height: "100%" }} position="bottom" className="scannerContainer" visible={scannerVisible} onHide={() => setScannerVisible(false)}>

            <Button onClick={() => setScannerVisible(false)} className="scannerCloseButton">
                <IconX></IconX>
            </Button>

            <Webcam onUserMediaError={console.log} forceScreenshotSourceSize={true} screenshotQuality={1} screenshotFormat="image/png" ref={cameraRef} className="camera" audio={false} videoConstraints={{ facingMode: "environment" }} ></Webcam>
            <img alt="Scanner" src="/Images/ScannerOverlayBackground.png" className="scannerOverlay"></img>
            <div ref={targetRef} className="scannerTarget"></div>

            <div className="scanButtonRow">
                <Button className="pickButton">
                    <IconFileUpload/>&nbsp;{t("ACTION_CHOOSE")}
                </Button>
                <Button onClick={startScan} disabled={scanState == "loading"} className="scanButton">
                    {
                        // Show Loading Wheel If Loading State Is Active
                        scanState == "loading" ?
                            <ProgressSpinner strokeWidth="8"/> :
                            <IconTextScan2/>
                    }
                </Button>
                <Button onClick={() => { (callback[0] || console.log)(""); setScannerVisible(false); }} className="skipButton">
                    <IconCodeOff/>&nbsp;{t("ACTION_SKIP")}
                </Button>
            </div>

        </Sidebar>
    );
}