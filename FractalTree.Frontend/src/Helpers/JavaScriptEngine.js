export default function ExecuteJavaScript(code, stdOut) {
    stdOut("\x1b[2J\x1b[H"); // Clear Terminal
    stdOut("\x1b[38;5;232m"); // Set To Black

    window.jsStubOut = (d) => stdOut(d.toString());

    window.input = prompt;
    window.print = jsStubOut;

    code = code.replaceAll("console.log", "window.jsStubOut"); // Replace calls to console.log with the stdOut

    try {
        eval(code);
    }
    catch (ex) {
        stdOut("\x1b[38;5;196m"); // Set To Red
        stdOut(ex.toString());
    }
}