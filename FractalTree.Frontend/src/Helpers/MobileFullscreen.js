import IsDevMode from "./DevModeDetector";

var triedToEnterFullscreen = false;

document.addEventListener("touchend", () => {
    if (triedToEnterFullscreen) { return; }

    if (!!document.body.requestFullscreen && !window.matchMedia('(display-mode: standalone)').matches && !IsDevMode()) {
        try {
            document.body.requestFullscreen();
            triedToEnterFullscreen = true;
        }
        catch {}
    }
});