import IsDevMode from "./DevModeDetector";

var triedToEnterFullscreen = false;

document.body.addEventListener("click", () => {
    if (triedToEnterFullscreen) { return; }

    if (!!document.body.requestFullscreen && !window.matchMedia("(display-mode: standalone)").matches && !IsDevMode() && window.self === window.top) {
        try {
            document.body.requestFullscreen();
            triedToEnterFullscreen = true;
        }
        catch {}
    }
});