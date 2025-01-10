import "../CSS/Header.css"
import { Divider } from 'primereact/divider';

export default function Header(props) {
    return (
        <div className="header">
            <h1 className="header">{props.children}</h1>
            <Divider/>
        </div>
    )
}