import JSZip, { file } from "jszip";
import { CompileApp } from "./AppCompiler";
import { saveAs } from "file-saver";
import { Image as ImageJS } from "image-js";
import { openUrl } from "@tauri-apps/plugin-opener";

// Replaces the bytes in a UInt8Array with other bytes
function ReplaceBytes(fileData, dataFrom, dataTo) {
    var loc = 0, sz = fileData.length;
    var checksComplete = 0, totalChecks = dataFrom.length;
    while(loc < sz && checksComplete < totalChecks) {
        if(dataFrom[checksComplete] === fileData[loc++])
            checksComplete++;
        else checksComplete = 0;
    }
    if(checksComplete === totalChecks) {
        Array.prototype.splice.apply(
            fileData = Array.prototype.slice.call(fileData),
            [loc - totalChecks, totalChecks].concat(dataTo)
        );
    }
    return fileData;
};

// Converts a string to UTF-16 bytes, which are used inside the android APK file
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
    var appID = ("org.fractal_tree.my_" + project.hubId.replaceAll("-", "_")).padEnd(127, "_");

    // Replace the app name (must be padded to exactly 64 length (128 bytes))
    for (let i = 0; i < 10; i++) {
        newManifestFile = ReplaceBytes(newManifestFile, [...utf16Bytes("%APP_NAME%______________________________________________________")], [...utf16Bytes(project.name.padEnd(64, " "))]);
    }


    // Replace the app ID (must be padded to exactly 127 length (254 bytes))
    for (let i = 0; i < 10; i++) {
        newManifestFile = ReplaceBytes(newManifestFile, [...utf16Bytes("org.fractal_tree.my____________________________________________________________________________________________________________")], [...utf16Bytes(appID)]);
    }

    zip.file(fileName, newManifestFile);
}

async function GetProjectBackgroundImage(project) {
    // Replace the icon background
    var backgroundPath = (`/Images/Thumbnails/${project.assets?.thumbnail || project.language}.webp`);

    // Crop the image now
    var image = await ImageJS.load(backgroundPath);
    image = image.crop({
        x: (image.width / 2) - 214, 
        y: 0, 
        width: 428, 
        height: 428
    });
    image = image.resize({ width: 462, height: 462 });
    image = image.multiply(0.85);

    return image;
}

async function GetProjectIconImage(project) {
    var foregroundPath = (project.assets?.icon || `/Images/LangIcons/${project.language}.webp`);

    var canvas = document.createElement("canvas");

    canvas.id = "TempImageExport";
    canvas.width = 432;
    canvas.height = 432;
    canvas.style.zIndex = -100;
    canvas.style.position = "absolute";
    
    document.body.appendChild(canvas);

    var ctx = canvas.getContext("2d");
    var img = new Image();

    await new Promise((resolve, _) => {
        img.onload = function () {
            ctx.drawImage(img, 96, 96);
            resolve();
        };

        img.src = foregroundPath;
    });

    setTimeout(() => canvas.remove(), 5000);

    return await ImageJS.fromCanvas(canvas);
}

// Very long and complex function
// TLDR: 
// Fetches a precompiled APK for the runtime
// Modifies it by carefully replacing the bytes inside, without changing the length
// Sending it to the server to sign the APK and make it installable
// Downloads the APK
export default async function CompileProjectForAndroid(project) {

    var quitLoading = window.startGlobalLoading();

    try {
        var req = await fetch("/Runtime/runtime.apk");
        var res = await req.arrayBuffer();
        var zip = await JSZip.loadAsync(res);
        
        var zipContents = Object.keys(zip.files);
        for (var i = 0; i < zipContents.length; i++) {
            var fileName = zipContents[i];

            await ReplaceValues(zip, fileName, project);

            // There is only 1 html resource file, find it
            if (fileName.startsWith("res/") && fileName.endsWith(".html")) {
                // Found it, now replace its contents with the compiled html file
                var compiledApp = await CompileApp(project);
                var androidShim = await (await fetch("/Runtime/shim_android.html")).text();

                // Fill in params in the shim
                androidShim = androidShim.replaceAll("%APP_CODE_B64%", btoa(compiledApp));
                androidShim = androidShim.replaceAll("%APP_BACKGROUND%", ((await GetProjectBackgroundImage(project)).toDataURL()));
                androidShim = androidShim.replaceAll("%APP_ICON%", ((await GetProjectIconImage(project)).toDataURL()));

                zip.file(fileName, androidShim);
            }
            else if (fileName.endsWith("ic_launcher_background.png")) { 
                // Replace the icon background
                var image = await GetProjectBackgroundImage(project);
                zip.file(fileName, image.toBuffer());
            }
            else if (fileName.endsWith("ic_launcher_foreground.png")) { 
                // Replace the icon foreground
                var image = await GetProjectIconImage(project);
                zip.file(fileName, image.toBuffer());
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
            xhr.responseType = "text";
            xhr.send(formData);
        });

        var apkID = result.body;
        var apkURL = BaseURL + "/api/sign?apkID=" + apkID;

        if (window.__TAURI__) {
            await openUrl(apkURL);
        }
        else {
            var apkRequest = await fetch(apkURL);
            saveAs(await apkRequest.blob(), project.name + ".apk");
        }

    }
    catch (ex) {
        console.log(ex);
    }

    quitLoading();
}