import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { useState } from 'react';
import "../CSS/Scanner.css"
import { IconBrandPython } from '@tabler/icons-react';
import { IconBrandJavascript } from '@tabler/icons-react';

export default function Scanner() {

    var [scannerVisible, setScannerVisible] = useState(false);
    window.openScanner = () => setScannerVisible(true);

    return (
        <Sidebar fullScreen position="bottom" className="scannerContainer" visible={scannerVisible} onHide={() => setScannerVisible(false)}>
            
        </Sidebar>
    )
}