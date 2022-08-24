import { useRef } from "react";

const LeaderPopup = () => {

    const popupRef = useRef();

    return (
        <div ref={popupRef} className="leaderpopup hide">
            <div className="p-5 bg-sky-700 text-center rounded">
                You got yourself in the leaderboard!
                <br/><br/>
                <button className="bg-sky-900 px-6 py-2 rounded">OK</button>
            </div>
        </div>
    )
}; export default LeaderPopup;