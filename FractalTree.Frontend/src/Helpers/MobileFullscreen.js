import IsDevMode from "./DevModeDetector";

var triedToEnterFullscreen = false;

document.addEventListener("touchstart", () => {
    if (triedToEnterFullscreen) { return; }

    if (!!document.body.requestFullscreen && !window.matchMedia('(display-mode: standalone)').matches && !IsDevMode()) {
        document.body.requestFullscreen();
        triedToEnterFullscreen = true;
    }
});