import BaseURL from "../BaseURL";

window.StartUpdateCycle = () => {
    setInterval(UpdateStatus, 5000);
    UpdateStatus();
}

async function UpdateStatus() {
    try {
        var req = await fetch(BaseURL + "/api/ping");

        if (req.status == 200) {
            window.serverStatus = "ONLINE";
        }
        else {
            window.serverStatus = "OFFLINE";
        }
    }
    catch {
        window.serverStatus = "OFFLINE";
    }
}