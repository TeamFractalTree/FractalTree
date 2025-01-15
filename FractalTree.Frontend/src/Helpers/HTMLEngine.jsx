import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import "../CSS/HTMLEngine.css";

export function HTMLHost() {

    var [websiteVisible, setWebsiteVisible] = useState(false);
    var [websiteCode, setWebsiteCode] = useState("");

    window.invokeHTMLHost = (code) => {
        setWebsiteCode(code);
        setWebsiteVisible(true);
    }

    return (
        <Sidebar className="htmlHost" style={{ height: "100vh" }} position="bottom" visible={websiteVisible} onHide={() => setWebsiteVisible(false)}>
            <iframe src={"data:text/html;base64," + btoa(websiteCode)}></iframe>
        </Sidebar>
    )
}

// This function will be injected into the iframe and run on the document's load
function FrameInjectedCode() {
    var origin = document.head.getAttribute("hostOrigin");
    var fontPath = origin + "/Fonts/InterVariable.woff2";

    var injectedCSS = `
    @font-face {
        font-family: FractalTreeInjected;
        src: url("${fontPath}") format('woff2');
    }

    body {
        font-family: FractalTreeInjected;
        font-size: 1.5rem;
    }

    * {
        -webkit-tap-highlight-color: transparent;
    }

    button {
        border: none;
        padding: 1rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        border-radius: 5px;
        font-size: 1rem;
        background-color: #f1eff0;
    }
    `;

    var tailwind = document.createElement('link');
    tailwind.rel = "stylesheet";
    tailwind.href = origin + "/Runtime/tailwind.css";
    document.head.append(tailwind);

    var style = document.createElement('style');
    style.textContent = injectedCSS;
    document.head.append(style);
}

export default function ExecuteHTML(code, stdOut) {

    // Wrap It In A Body
    if (!code.includes("<body")) {
        code = "<body>\n" + code + "\n</body>";
    }

    // Prepend Head Tag
    if (!code.includes("<head")) {
        code = "<head></head>" + code;
    }

    // Wrap It In A HTML Tag
    if (!code.includes("<html")) {
        code = "<!DOCTYPE html>\n<html>\n" + code + "\n</html>";
    }

    // Inject A Tag Into The Head To Tell It The Host Origin
    code = code.replace("<head", `<head hostOrigin="${window.location.origin}"`)

    // Inject Some Custom Code In The Body
    var onLoadCode = FrameInjectedCode.toString();
    onLoadCode = onLoadCode.slice(onLoadCode.indexOf("{") + 1, onLoadCode.lastIndexOf("}"));
    code = code.replace("<body", `<body onload="eval(atob('${btoa(onLoadCode)}'))"`)

    window.invokeHTMLHost(code);
}