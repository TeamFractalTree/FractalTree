import { loadPyodide } from "pyodide"

window.pyodide = await loadPyodide({
    indexURL: "/Pyodide",
});

pyodide.setStdin({ stdin: () => prompt() });

export default async function ExecutePython(code, stdOut) {

    stdOut("\x1b[2J\x1b[H"); // Clear Terminal
    stdOut("\x1b[38;5;232m"); // Set To Black

    pyodide.setStdout({ batched: (d) => stdOut(d + "\r\n") });

    try {
        await pyodide.runPythonAsync(code);
    }
    catch (ex) {
        stdOut("\x1b[38;5;196m"); // Set To Red
        stdOut(ex.toString());
    }
}