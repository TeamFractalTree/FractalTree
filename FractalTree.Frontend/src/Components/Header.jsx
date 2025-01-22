import { IconArrowLeft } from "@tabler/icons-react";
import "../CSS/Header.css"
import { Divider } from 'primereact/divider';

export default function Header(props) {
    return (
        <div onDoubleClick={props.onBack || console.log} className="header">
            {
                !!props.onBack ? 
                <IconArrowLeft onClick={props.onBack || console.log}></IconArrowLeft> : null
            }
            <h1>{props.children}</h1>
        </div>
    )
}