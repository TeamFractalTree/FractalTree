import "../CSS/PhoneWrapper.css"

// Loads a frame that looks like a phone where the app resides
export default function PhoneWrapper() {

    return (
        <>
            <div className="phoneWrapper">
                <iframe width={100} height={300} src="./"></iframe>
            </div>
            <div className="phoneWrapperFrame">
                <img src="/Images/PhoneWrapperFrame.png"></img>
            </div>
        </>
    )
}