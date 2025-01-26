import JSZip from "jszip";
import { CompileApp } from "./AppCompiler";
import { saveAs } from "file-saver";
import BaseURL from "../BaseURL";

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
            else if (fileName.endsWith("strings.xml")) { 
                // Replace the strings.xml file
                var newStringsFile = `
                <resources>
                    <string name="app_name">${project.name}</string>
                </resources>
                `;
                zip.file(fileName, newStringsFile.trim());
            }
        });

        var compiledFile = await zip.generateAsync({ type:"blob" });
        
        var formData = new FormData();
        formData.append("apk", compiledFile);

        var result = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.addEventListener("load", () => resolve({ status: xhr.status, body: xhr.response }));
            xhr.addEventListener("error", () => reject(new Error("File Upload Failed")));
            xhr.addEventListener("abort", () => reject(new Error("File Upload Aborted")));
            xhr.open("POST", BaseURL + "/api/sign", true);
            xhr.responseType = "blob";
            xhr.send(formData);
        });

        saveAs(result.body, project.name + ".apk");
    }
    catch (ex) {
        console.log(ex);
    }
}