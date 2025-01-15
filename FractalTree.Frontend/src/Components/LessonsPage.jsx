import BottomBar from "./BottomBar";
import Header from "./Header";
import { Sidebar } from 'primereact/sidebar';
import "../CSS/LessonsPage.css";
import { Button } from 'primereact/button';
import { useState } from "react";
import { ProgressBar } from 'primereact/progressbar';

if (!window.lessonList) {
    window.lessonList = [];
}


export default function LessonsPage() {

    var [segmentPickerVisible, setSegmentPickerVisible] = useState(false);
    var [selectedLesson, setSelectedLesson] = useState(null);

    return (
        <>
            <Header>{t("SECTION_LESSONS")}</Header>

            <div className="lessonsPage">
                {
                    lessonList.filter((l) => l.lang == localStorage.i18nextLng).map((lesson, i) => {
                        return (<LessonCard onClick={() => { setSelectedLesson(lesson); setSegmentPickerVisible(true); }} key={i} {...lesson}></LessonCard>)
                    })
                }
            </div>

            <Sidebar style={{ width: "100%" }} position="right" className="segmentPickerContainer" visible={segmentPickerVisible} onHide={() => setSegmentPickerVisible(false)}>
                <Header onBack={() => setSegmentPickerVisible(false)}>{selectedLesson?.name}</Header>
                {
                    selectedLesson?.segments?.map((segment) => {
                        return (
                            <div className="lessonSegment">
                                <h2>{segment.split("\n")[0].replace("# ", "")}</h2>
                                <p>{segment.split("\n")[1]?.replace("# ", "")}</p>
                            </div>
                        )
                    })
                }
            </Sidebar>

            <BottomBar></BottomBar>
        </>
    )
}

function LessonCard(props) {
    return (
        <div {...props} className="lessonCard">
            <h2 className="lessonTitle">{props.name}</h2>
            <p className="lessonDescription">{props.description}</p>
            <div className="lessonIcon" style={props.icon == "JavaScript.webp" ? { backgroundColor: "#F0DB4F" } : {}}>
                <img alt={props.icon + " Logo"} src={"/Images/LangIcons/" + props.icon}></img>
            </div>
            <ProgressBar value={50}></ProgressBar>
        </div>
    )
}