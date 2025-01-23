import IsDevMode from "./DevModeDetector";

var triedToEnterFullscreen = false;

document.body.addEventListener("click", () => {
    if (triedToEnterFullscreen) { return; }

    console.log("Debug: Try To Enter Fullscreen");

    if (!!document.body.requestFullscreen && !window.matchMedia('(display-mode: standalone)').matches && !IsDevMode() && window.self === window.top) {
        try {
            document.body.requestFullscreen();
            triedToEnterFullscreen = true;
        }
        catch {}
    }
});