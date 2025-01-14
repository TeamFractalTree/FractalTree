import BottomBar from "./BottomBar";
import Header from "./Header";
import "../CSS/LessonsPage.css";
import { Button } from 'primereact/button';
import { useState } from "react";
import { ProgressBar } from 'primereact/progressbar';

window.lessonList = [];

export default function LessonsPage() {


    return (
        <>
            <Header>{t("SECTION_LESSONS")}</Header>

            <div className="lessonsPage">
                {
                    lessonList.filter((l) => l.lang == localStorage.i18nextLng).map((lesson, i) => {
                        return (<LessonCard key={i} {...lesson}></LessonCard>)
                    })
                }
            </div>

            <BottomBar></BottomBar>
        </>
    )
}

function LessonCard(props) {
    return (
        <div className="lessonCard">
            <h2 className="lessonTitle">{props.name}</h2>
            <p className="lessonDescription">{props.description}</p>
            <div className="lessonIcon" style={props.icon == "JavaScript.webp" ? { backgroundColor: "#F0DB4F" } : {}}>
                <img src={"/Images/LangIcons/" + props.icon}></img>
            </div>
            <ProgressBar value={50}></ProgressBar>
        </div>
    )
}