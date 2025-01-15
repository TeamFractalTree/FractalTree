import { IconArrowLeft } from "@tabler/icons-react";
import "../CSS/Header.css"
import { Divider } from 'primereact/divider';

export default function Header(props) {
    return (
        <div className="header">
            {
                !!props.onBack ? 
                <IconArrowLeft onClick={props.onBack}></IconArrowLeft> : null
            }
            <h1>{props.children}</h1>
        </div>
    )
}