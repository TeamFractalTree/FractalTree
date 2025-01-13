import BottomBar from "./BottomBar";
import Header from "./Header";
import "../CSS/LessonsPage.css";
import { Button } from 'primereact/button';
import { useState } from "react";

const LessonCard = ({title, description, onClick}) =>{
    return (
        <div
        className="lessonCard" 
        onClick={onClick}>
            <h2 className="lessonCardTitle">{title}</h2>
            <p className="lessonCardDescription">{description}</p>
            

        </div>

    )
};
export default function LessonsPage() {
    const lessons = [

        {title: "Lecon un", description: "l'introduction de Java"},
        {
        title: "Lecon deux", description: "connaissance de methods"
        },
        {title:"Lecon trois", description: "l'abstraction"}
    ]; // les examples
    var onContinue = () => {
        window.openLessonsSelector((lesson) => {
            window.openLessonDetails({
                lesson: lesson
            });
        });
    }

    return (
        <>
            <Header>{t("SECTION_LESSONS")}</Header>

            <div className="lessonsPage">
                <div className="lessonsSplash">
                </div>
                <p className="lessonsDescription">{t("SECTION_LESSONS")}</p>

                <Button onClick={onContinue} className="lessonsContinue">
                    {t("ACTION_CHOOSE")}
                </Button>

                <div className = "lessonCard">
                    {lessons.map((lesson, index) => (

                        <LessonCard 
                        key={index}
                        title = {lesson.title}
                        description = {lesson.description}
                        onClick={()=> console.log(`Selected: ${lesson.title}`)}
                    />
                    ))}
                </div>
            </div>

            <BottomBar></BottomBar>
        </>
    )
}