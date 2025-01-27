import BottomBar from "./BottomBar";
import Header from "./Header";
import "../CSS/SandboxPage.css";
import { IconSandbox } from "@tabler/icons-react";
import { Button } from "primereact/button";
import { IconTextScan2 } from "@tabler/icons-react";
import { useState } from "react";


export default function SandboxPage() {

    var onContinue = () => {
        window.openLanguageSelector("BEFORE_SCAN", (lang) => {
            window.openScanner({}, (code) => {
                window.openCodeEditor({
                    language: lang,
                    code: code
                });
            });
        });
    };

    return (
        <>
            <Header>{t("SECTION_SANDBOX")}</Header>

            <div className="page sandboxPage">
                <div className="sandboxSplash">
                    <IconSandbox></IconSandbox>
                </div>
                <p className="sandboxDescription">{t("SECTION_SANDBOX_DESCRIPTION")}</p>

                <Button onClick={onContinue} className="sandboxContinue">
                    <IconTextScan2/>
                    &nbsp;
                    {t("ACTION_GO")}
                </Button>
            </div>


            <BottomBar></BottomBar>
        </>
    );
}