export default function IsDevMode() {
    return window.location.href.includes(":5173");
}