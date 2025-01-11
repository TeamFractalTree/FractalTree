import { loadPyodide } from "pyodide"

window.pyodide = await loadPyodide({
    indexURL: "/Pyodide",
});

pyodide.setStdin({ stdin: () => prompt() });

export default async function ExecutePython(code, stdOut) {
    pyodide.setStdout({ batched: stdOut });
    await pyodide.runPythonAsync(code);
}