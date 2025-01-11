import BottomBar from "./BottomBar";
import Header from "./Header";
import "../CSS/SandboxPage.css"
import { IconSandbox } from "@tabler/icons-react";
import { Button } from 'primereact/button';
import { IconTextScan2 } from "@tabler/icons-react";
import { useState } from "react";


export default function SandboxPage() {

    var onContinue = () => {
        window.openLanguageSelector((lang) => {
            window.openScanner();
        });
    }

    return (
        <>
            <Header>Sandbox</Header>

            <div className="sandboxPage">
                <div className="sandboxSplash">
                    <IconSandbox></IconSandbox>
                </div>
                <p className="sandboxDescription">Sandbox mode allows you to quickly scan and run code without saving it.</p>

                <Button onClick={onContinue} className="sandboxContinue">
                    <IconTextScan2/>
                    &nbsp;
                    Go
                </Button>
            </div>


            <BottomBar></BottomBar>
        </>
    )
}