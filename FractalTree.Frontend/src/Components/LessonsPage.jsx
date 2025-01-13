import BottomBar from "./BottomBar";
import Header from "./Header";
import "../CSS/LessonsPage.css";
import { Button } from 'primereact/button';
import { useState } from "react";


export default function LessonsPage() {
    const lessons = [
        { title: "Test", description: "" },
        { title: "test", description: "" },
        { title: "tse2", description: "" }
    ];


    return (
        <>
            <Header>{t("SECTION_LESSONS")}</Header>

            <div className="lessonsPage">
                {
                    lessons.map((lesson, i) => {
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
            <h2 className="lessonTitle">{props.title}</h2>
        </div>
    )
}