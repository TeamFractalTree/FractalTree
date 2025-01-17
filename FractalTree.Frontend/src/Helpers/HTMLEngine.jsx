import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import "../CSS/HTMLEngine.css";

export function HTMLHost() {

    var [websiteVisible, setWebsiteVisible] = useState(false);
    var [websiteCode, setWebsiteCode] = useState("");
    var [websiteNonce, setWebsiteNonce] = useState(0); // iframe will reload when this changes

    window.invokeHTMLHost = (code) => {
        setWebsiteCode(code);
        setWebsiteNonce(websiteNonce + 1);
        setWebsiteVisible(true);
    }

    return (
        <Sidebar className="htmlHost" style={{ height: "100vh" }} position="bottom" visible={websiteVisible} onHide={() => setWebsiteVisible(false)}>
            <iframe onLoad={(e) => e.target.contentWindow.replaceDOM(websiteCode)} src={"/Runtime/shim.html?" + websiteNonce.toString()}></iframe>
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

    button, input {
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

    var jquery = document.createElement('script');
    jquery.src = origin + "/Runtime/jquery.js";
    document.head.append(jquery);

    if (!!window.framework && window.framework == "react") {
        var babel = document.createElement('script');
        babel.src = origin + "/Runtime/reactlibs.js";
        babel.onload = () => {
            var output = Babel.transform(document.getElementById("ft_dispatch").innerHTML, {
                presets: ["react"]
            });
            eval(output.code);
        }
        document.head.append(babel);
    }

    var style = document.createElement('style');
    style.textContent = injectedCSS;
    document.head.append(style);
}

export default function ExecuteHTML(code, stdOut, injectedCode) {
    code = PrepareHTMLCode(code);

    // Inject Some Custom Code In The Body
    var onLoadCode = FrameInjectedCode.toString();
    onLoadCode = onLoadCode.slice(onLoadCode.indexOf("{") + 1, onLoadCode.lastIndexOf("}"));
    onLoadCode = (injectedCode || "") + "\n" + onLoadCode;
    code = code.replace("<body", `<body onload="eval(atob('${btoa(onLoadCode)}'))"`)

    window.invokeHTMLHost(code);
}

export function PrepareHTMLCode(code) {

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
    code = code.replace("<head", `<head hostOrigin="${window.location.origin}"`);

    return code;
}

export function ExecuteJSX(code, stdOut) {

    if (!code.includes("function Main(")) {
        alert(t("ERROR_REACT_NEEDSMAIN"));
        return;
    }

    code = code.replaceAll("</script>", "// Not allowed");
    code += "\nReactDOM.createRoot(document.getElementById('ft_root')).render(<Main/>);";

    return ExecuteHTML(`<head><script id="ft_dispatch" type="text/stub">${code}</script></head><body><div id="ft_root"></div></body>`, stdOut, "window.framework = 'react';");
}