import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { useState } from 'react';
import "../CSS/Scanner.css"
import { useRef } from 'react';
import Webcam from "react-webcam";
import { IconTextScan2, IconX } from '@tabler/icons-react';
import { ProgressSpinner } from 'primereact/progressspinner';
import Vibrate from '../Helpers/Vibrator';
import Image from "image-js"
import { saveAs } from 'file-saver';

export default function Scanner() {

    var [scannerVisible, setScannerVisible] = useState(false);
    var [scanState, setScanState] = useState("none");
    var [callback, setCallback] = useState([]);
    window.openScanner = (newCallback) => { setCallback([newCallback]); setScannerVisible(true); }

    var cameraRef = useRef(null);
    var targetRef = useRef(null);

    var startScan = () => {
        if (!cameraRef.current) { return; }

        setScanState("loading");
        Vibrate();

        setTimeout(async () => {
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

            var savedImage = await image.toBlob("image/png");
            
            var formData = new FormData();
            formData.append("image", savedImage);

            var result = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.addEventListener('load', () => resolve({ status: xhr.status, body: xhr.responseText }));
                xhr.addEventListener('error', () => reject(new Error('File Upload Failed')));
                xhr.addEventListener('abort', () => reject(new Error('File Upload Aborted')));
                xhr.open('POST', "https://node.samsidparty.com/api/scan", true);
                xhr.send(formData);
            });

            console.log("Scan result: " + result.body);

            // ChatGPT is supposed to just return the string "error" when there's an error
            // But sometimes it adds random characters around it like ".aerror_", probably from the thing it's trying to scan
            // Just check if it contains the "error" string and is short enough
            if (result.body.length < 10 && result.body.toLowerCase().includes("error")) {
                alert("We couldn't scan your code, please try again with a clearer picture or better handwriting.");
                setScanState("error");
                return;
            }

            var callbackToRun = callback[0] || console.log;
            callbackToRun(result.body);

            setScanState("none");
            setTimeout(() => setScannerVisible(false), 0);
        });
    }

    return (
        <Sidebar style={{ height: "100%" }} position="bottom" className="scannerContainer" visible={scannerVisible} onHide={() => setScannerVisible(false)}>

            <Button onClick={() => setScannerVisible(false)} className="scannerCloseButton">
                <IconX></IconX>
            </Button>

            <Webcam forceScreenshotSourceSize={true} screenshotQuality={1} screenshotFormat="image/png" ref={cameraRef} className="camera" audio={false} videoConstraints={{ facingMode: "environment" }} ></Webcam>
            <img src="/Images/ScannerOverlayBackground.png" className="scannerOverlay"></img>
            <div ref={targetRef} className="scannerTarget"></div>

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