import { PrepareHTMLCode } from "./HTMLEngine";


export async function CompileApp(codeState) {
    var runtimePath = "/Runtime/runtime_" + codeState.language + ".html";
    
    try {
        var req = await fetch(runtimePath);
        var res = await req.text();

        var prepareCodeFunction = (c) => c;

        if (codeState.language == "html") {
            prepareCodeFunction = PrepareHTMLCode;
        }

        // Replace all dynamic variables
        res = res.replaceAll("%APP_NAME%", codeState.name);
        res = res.replaceAll("%APP_DESCRIPTION%", codeState.description || "No description.");
        res = res.replaceAll("%APP_CODE%", prepareCodeFunction(codeState.code));
        res = res.replaceAll("%REACT_LIB%", await fetch("/Runtime/reactlib.js"));
        res = res.replaceAll("%JQUERY%", await fetch("/Runtime/jquery.js"));
        res = res.replaceAll("%TAILWIND%", await fetch("/Runtime/tailwind.css"));

        return res;
    }
    catch {
        alert("Failed to compile your app");
    }
}