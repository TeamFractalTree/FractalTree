import { loadPyodide } from "pyodide"

window.pyodide = await loadPyodide({
    indexURL: "/Pyodide",
});

pyodide.setStdin({ stdin: () => prompt(window.pythonPromptString || "Python code is asking for a value:") });
pyodide.registerJsModule("fractaltree", { 
    prePrompt: (promptString) => {
        window.pythonPromptString = promptString;
    }
});

var injectedPythonLib = `
import builtins
import time
from fractaltree import prePrompt

def input(prompt):
    prePrompt(prompt)
    time.sleep(0)
    value = builtins.input(prompt)
    print("")
    return value

`;

export default async function ExecutePython(code, stdOut) {

    stdOut("\x1b[2J\x1b[H"); // Clear Terminal
    stdOut("\x1b[38;5;232m"); // Set To Black

    pyodide.setStdout({ batched: (d) => stdOut(d + "\r\n") });

    try {
        await pyodide.runPythonAsync(injectedPythonLib + code);
    }
    catch (ex) {
        stdOut("\x1b[38;5;196m"); // Set To Red
        stdOut(ex.toString());
    }
}