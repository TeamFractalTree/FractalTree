import "../CSS/ProjectIcon.css";

export default function ProjectIcon(props) {
    return (
        <div className="projectIcon" style={{ backgroundImage: "url('" + (`/Images/Thumbnails/${props.projectState?.assets?.thumbnail || props.projectState?.language}.webp`) + "')" }}>
            <img src={props.projectState?.assets?.icon || `/Images/LangIcons/${props.projectState?.language}.webp`}></img>
        </div>
    );
}