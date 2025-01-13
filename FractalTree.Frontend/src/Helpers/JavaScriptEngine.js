export default function ExecuteJavaScript(code, stdOut) {
    stdOut("\x1b[2J\x1b[H"); // Clear Terminal
    stdOut("\x1b[38;5;232m"); // Set To Black

    window.jsStubOut = stdOut;
    code = code.replaceAll("console.log", "window.jsStubOut")

    try {
        eval(code);
    }
    catch (ex) {
        stdOut("\x1b[38;5;196m"); // Set To Red
        stdOut(ex.toString());
    }
}