import { loadPyodide } from "pyodide"

// Used by turtle module
function ElementFromProps(map) {
    const tag = map.get("tag");
    if (!tag) { return document.createTextNode(map.get("text")); }

    const node = document.createElement(map.get("tag"));

    for (const [key, value] of map.get("props")) { node.setAttribute(key, value); }
    for (const childProps of map.get("children")) { node.appendChild(ElementFromProps(childProps)); }

    return node;
}

window.addEventListener("load", async () => {
    window.pyodide = await loadPyodide({
        indexURL: "/Pyodide",
    });

    pyodide.setStdin({ stdin: () => prompt(window.pythonPromptString || "Python code is asking for a value:") });
    pyodide.registerJsModule("fractaltree", { 
        prePrompt: (promptString) => {
            window.pythonPromptString = promptString;
        }
    });

    pyodide.registerJsModule("basthon", {
        kernel: {
            display_event: (e) => { window.enableGUIOutput(); document.getElementById("guiOutputWindow").innerHTML = ElementFromProps(e.toJs().get("content")).outerHTML },
            locals: () => pyodide.runPython("globals()"),
        },
    });
    await pyodide.loadPackage("/Pyodide/turtle-0.0.1-py3-none-any.whl");

    window.doneInitStep();
});


var postInjectedPythonLib = `
import basthon
import sys

# If the user includes the turtle module, show the GUI window
if 'turtle' in sys.modules:
    print("[Python Engine] Displaying Turtle UI")
    import turtle # Reimport it in case the user imported with "from turtle import *" (which won't work for this)
    svg_dict = turtle.Screen().show_scene()
    basthon.kernel.display_event({ "display_type": "turtle", "content": svg_dict })
    turtle.restart()
    sys.modules.pop('turtle')
`

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
        await pyodide.runPythonAsync(injectedPythonLib + code + postInjectedPythonLib);
    }
    catch (ex) {
        stdOut("\x1b[38;5;196m"); // Set To Red
        stdOut(ex.toString());
    }
}