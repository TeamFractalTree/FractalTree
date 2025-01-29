import JSZip, { file } from "jszip";
import { CompileApp } from "./AppCompiler";
import { saveAs } from "file-saver";
import { Image as ImageJS } from "image-js";

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

    var quitLoading = window.startGlobalLoading();

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
            else if (fileName.endsWith("ic_launcher_background.png")) { 
                // Replace the icon background
                var foregroundPath = (`/Images/Thumbnails/${project.assets?.thumbnail || project.language}.webp`);

                // Crop the image now
                var image = await ImageJS.load(foregroundPath);
                image = image.crop({
                    x: (image.width / 2) - 214, 
                    y: 0, 
                    width: 428, 
                    height: 428
                });
                image = image.resize({ width: 462, height: 462 })
                image = image.multiply(0.85)

                zip.file(fileName, image.toBuffer());
            }
            else if (fileName.endsWith("ic_launcher_foreground.png")) { 
                // Replace the icon foreground
                var foregroundPath = (project.assets?.icon || `/Images/LangIcons/${project.language}.webp`);

                var canvas = document.createElement('canvas');

                canvas.id = "TempImageExport";
                canvas.width = 432;
                canvas.height = 432;
                canvas.style.zIndex = -100;
                canvas.style.position = "absolute";
                
                document.body.appendChild(canvas);

                var ctx = canvas.getContext('2d');
                var img = new Image();

                await new Promise((resolve, _) => {
                    img.onload = function () {
                        ctx.drawImage(img, 96, 96);
                        resolve();
                    };

                    img.src = foregroundPath;
                });

                var image = await ImageJS.fromCanvas(canvas);
                zip.file(fileName, image.toBuffer());

                canvas.remove();
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

    quitLoading();
}