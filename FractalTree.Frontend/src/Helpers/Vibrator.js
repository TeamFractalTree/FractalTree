export default function Vibrate() {
    try {
        navigator.vibrate(150);
    }
    catch {}
}