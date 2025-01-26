window.tauriHandleBackButton = () => {
    // Simulates A Double Click On The Top Left Corner
    // The <Header> Component Will Handle This
    var virtualBackButton = document.elementFromPoint(0, 0);
    
    var event = new MouseEvent("dblclick", {
        bubbles: true,
        cancelable: true,
    });
    virtualBackButton.dispatchEvent(event);
};
