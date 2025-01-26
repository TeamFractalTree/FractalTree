import { IconCircleFilled } from "@tabler/icons-react";
import "../CSS/ServerStatusText.css";

export default function ServerStatusText() {
    return (
        <div className="serverStatusText">
            <IconCircleFilled className={window.serverStatus}></IconCircleFilled>
            {t(`SERVER_STATUS_${window.serverStatus}`)}
        </div>
    );
}