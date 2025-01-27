import "../CSS/LanguageIcon.css";

export default function LanguageIcon(props) {
    return (
        <div className="languageIcon" style={props.icon == "javascript.webp" ? { backgroundColor: "#F0DB4F" } : {}}>
            <img alt={props.icon + " Logo"} src={"/Images/LangIcons/" + props.icon}></img>
        </div>
    );
}