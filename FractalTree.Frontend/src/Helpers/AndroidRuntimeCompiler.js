import JSZip, { file } from "jszip";
import { CompileApp } from "./AppCompiler";
import { saveAs } from "file-saver";

function ReplaceBytes(fileData, dataFrom, dataTo) {
    var loc = 0, sz = fileData.length;
    var checksComplete = 0, totalChecks = dataFrom.length;
    while(loc < sz && checksComplete < totalChecks) {
        if(dataFrom[checksComplete] === fileData[loc++])
            checksComplete++;
        else checksComplete = 0;
        }
    if(checksComplete === totalChecks) {
        // Match found -- creates a new (regular) array to return
        Array.prototype.splice.apply(
            fileData = Array.prototype.slice.call(fileData),
            [loc - totalChecks, totalChecks].concat(dataTo)
            );
        }
    return fileData;
};

function* utf16Bytes(str) {
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      yield (charCode & 0xff00) >> 8;
      yield charCode & 0x00ff;
    }
}

// Replaces UTF-16 values that identify the app
async function ReplaceValues(zip, fileName, project) {
    // Replace the AndroidManifest.xml file
    var newManifestFile = await zip.file(fileName).async("uint8array");

    // Replace the app name (must be padded to exactly 64 length (128 bytes))
    newManifestFile = ReplaceBytes(newManifestFile, [...utf16Bytes("%APP_NAME%______________________________________________________")], [...utf16Bytes(project.name.padEnd(64, " "))]);
    // Replace the app ID (must be padded to exactly 127 length (254 bytes))
    var appID = ("org.fractal_tree.my_" + project.hubID.replaceAll("-", "_")).padEnd(127, "_");
    newManifestFile = ReplaceBytes(newManifestFile, [...utf16Bytes("org.fractal_tree.my____________________________________________________________________________________________________________")], [...utf16Bytes(appID)]);
    zip.file(fileName, newManifestFile);
}

export default async function CompileProjectForAndroid(project) {
    try {
        var req = await fetch("/Runtime/runtime.apk");
        var res = await req.arrayBuffer();
        var zip = await JSZip.loadAsync(res);
        
        var zipContents = Object.keys(zip.files);
        for (var i = 0; i < zipContents.length; i++) {
            var fileName = zipContents[i];
            // There is only 1 html resource file, find it
            if (fileName.startsWith("res/") && fileName.endsWith(".html")) {
                // Found it, now replace its contents with the compiled html file
                zip.file(fileName, CompileApp(project));
            }
            else if (fileName.endsWith("AndroidManifest.xml") || fileName.endsWith("resources.arsc")) { 
                await ReplaceValues(zip, fileName, project);
            }
        }

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