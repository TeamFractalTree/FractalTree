import { PrepareHTMLCode } from "./HTMLEngine";


export async function CompileApp(codeState) {
    var runtimePath = "/Runtime/runtime_" + codeState.language + ".html";
    
    var getResource = async (path) => { return await (await fetch(path)).text(); };

    try {
        var res = await getResource(runtimePath);

        var prepareCodeFunction = (c) => c;

        if (codeState.language == "html") {
            prepareCodeFunction = (code) => {
                var injectedHead = res;

                code = PrepareHTMLCode(code);
                code = code.replace("</head>", injectedHead + "\n</head>");

                res = "%APP_CODE%";
                return code;
            };
        }

        // Replace all dynamic variables
        var appCode = prepareCodeFunction(codeState.code);
        res = res.replaceAll("%APP_CODE%", appCode);
        res = res.replaceAll("%APP_NAME%", codeState.name);
        res = res.replaceAll("%APP_DESCRIPTION%", codeState.description || "No description.");
        res = res.replaceAll("%REACT_LIB%", await getResource("/Runtime/reactlibs.js"));
        res = res.replaceAll("%JQUERY%", await getResource("/Runtime/jquery.js"));
        res = res.replaceAll("%TAILWIND%", await getResource("/Runtime/tailwind.css"));

        return res;
    }
    catch {
        alert("Failed to compile your app");
    }
}