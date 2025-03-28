import BottomBar from "./BottomBar";
import Header from "./Header";
import { Sidebar } from "primereact/sidebar";
import "../CSS/LessonsPage.css";
import { Button } from "primereact/button";
import { useState } from "react";
import { ProgressBar } from "primereact/progressbar";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Markdown from "react-markdown";
import { IconPlayerPlayFilled, IconSettings, IconShare } from "@tabler/icons-react";
import LanguageIcon from "./LanguageIcon";
import SettingsPage from "./SettingsPage";
import { GetInterfaceLanguage, GetSidebarPosition } from "../Helpers/InterfaceLanguageManager";
import Share from "../Helpers/SharingManager,js";

if (!window.lessonList) {
    window.lessonList = [];
}


export default function LessonsPage() {

    var [segmentPickerVisible, setSegmentPickerVisible] = useState(false);
    var [selectedLesson, setSelectedLesson] = useState(null);

    var shareLesson = (lessonToShare) => {
        Share(lessonToShare.name, JSON.stringify(lessonToShare));
    };

    return (
        <>
            <Button onClick={() => window.openSettingsPage()} className="settingsButton"><IconSettings/></Button>

            <Header>{t("SECTION_LESSONS")}</Header>

            <div className="page lessonsPage">
                {
                    lessonList.filter((l) => l.lang == GetInterfaceLanguage()).map((lesson, i) => {
                        return (<LessonCard onClick={() => { setSelectedLesson(lesson); setSegmentPickerVisible(true); }} key={i} {...lesson}></LessonCard>);
                    })
                }
            </div>

            <Sidebar style={{ width: "100%" }} position={GetSidebarPosition()} className="segmentPickerContainer" visible={segmentPickerVisible} onHide={() => setSegmentPickerVisible(false)}>
                <Header onBack={() => setSegmentPickerVisible(false)}>{selectedLesson?.name}</Header>
                <Button className="lessonShareButton" onClick={() => shareLesson(selectedLesson)}><IconShare/></Button>
                {
                    selectedLesson?.segments?.map((segment, i) => {
                        return <LessonSegment key={i} segment={segment}></LessonSegment>;
                    })
                }
            </Sidebar>

            <BottomBar></BottomBar>
        </>
    );
}

function LessonSegment(props) {

    var [segmentVisible, setSegmentVisible] = useState(false);

    return (
        <>
            <div className="lessonSegment" onClick={() => setSegmentVisible(true)}>
                <h2>{props.segment.split("\n")[0].replace("# ", "")}</h2>
                <p>{props.segment.split("\n")[1]?.replace("# ", "")}</p>
            </div>

            <Sidebar style={{ width: "100%" }} position={GetSidebarPosition()} className="segmentContainer" visible={segmentVisible} onHide={() => setSegmentVisible(false)}>
                <Header onBack={() => setSegmentVisible(false)}>{props.segment.split("\n")[0].replace("# ", "")}</Header>
                <div className="segmentViewer overrideFont">
                    <Markdown
                        components={{
                            code(props) {
                                const {children, className, node, ...rest} = props;
                                const match = /language-(\w+)/.exec(className || "");
                                return match ? (
                                    <div dir="ltr" className="runnableCodeContainer">
                                        <Button onClick={() => window.openCodeEditor({ code: children, language: className.replace("language-", "") }, null)} className="codeRunButton"><IconPlayerPlayFilled/>&nbsp;{t("ACTION_TRY")}</Button>
                                        <SyntaxHighlighter
                                            {...rest}
                                            PreTag="div"
                                            codeTagProps={{ dir: "ltr" }}
                                            children={String(children).replace(/\n$/, "")}
                                            language={match[1]}
                                        />
                                    </div>
                                ) : (
                                    <code dir="ltr" {...rest} className={className}>
                                        {children}
                                    </code>
                                );
                            }
                        }}
                    >{props.segment.split("\n").toSpliced(0, 2).join("\n")}</Markdown>
                </div>
            </Sidebar>
        </>
    );
}

function LessonCard(props) {
    return (
        <div {...props} className="lessonCard">
            <h2 className="lessonTitle">{props.name}</h2>
            <p className="lessonDescription">{props.description}</p>
            <LanguageIcon {...props}/>
        </div>
    );
}