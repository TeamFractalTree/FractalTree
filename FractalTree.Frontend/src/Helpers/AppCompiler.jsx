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

        res = res.replaceAll("%APP_NAME%", codeState.name);
        res = res.replaceAll("%APP_CODE%", prepareCodeFunction(codeState.code));

        return res;
    }
    catch {
        alert("Failed to compile your app");
    }
}