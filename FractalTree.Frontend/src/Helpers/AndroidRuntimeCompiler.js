import JSZip from "jszip";
import { CompileApp } from "./AppCompiler";
import { saveAs } from "file-saver";

export default async function CompileProjectForAndroid(project) {
    try {
        var req = await fetch("/Runtime/runtime.apk");
        var res = await req.arrayBuffer();
        var zip = await JSZip.loadAsync(res);
        
        Object.keys(zip.files).forEach((fileName) => {
            // There is only 1 html resource file, find it
            if (fileName.startsWith("res/") && fileName.endsWith(".html")) {
                // Found it, now replace its contents with the compiled html file
                zip.file(fileName, CompileApp(project));
            }
        });

        var compiledFile = await zip.generateAsync({type:"blob"});
        saveAs(compiledFile, project.name + ".apk");
    }
    catch (ex) {
        console.log(ex);
    }
}