import IsDevMode from "./Helpers/DevModeDetector";

// Modify this variable to change the main API URL
window.BaseURL = "https://api.fractal-tree.org";

if (IsDevMode()) {
    window.BaseURL = "";
}