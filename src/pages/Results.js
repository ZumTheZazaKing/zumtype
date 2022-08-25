import { Context } from "../context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LeaderPopup from "../components/LeaderPopup";

export const Results = () => {
    const navigate = useNavigate();
    let {charCount,wrong, setWrong,setCharCount,setPreviousUrl,wentToLeaderboard, setWentToLeaderboard} = useContext(Context);
    let wpm = Math.ceil((charCount / 5) / 0.5);
    let accuracy = Math.floor(((charCount-wrong)/charCount)*100);

    const tryAgain = () => {
        setCharCount(0);
        setWrong(0)
        navigate("/");
        setWentToLeaderboard(false);
    }

    const leaderboard = () => {
        navigate("/leaderboard");
        setPreviousUrl("/results");
        setWentToLeaderboard(true);
    }

    return (
        <div className="text-white font-mono leading-normal h-screen w-screen flex flex-col items-center justify-center">
            <p className="text-8xl text-center">
                <span className="text-2xl">Your WPM is:</span>
                <br/>
                <span className="text-yellow-400">{wpm}</span>
            </p>
            <br/>
            <p className="text-xl text-center">
                Word Count: {charCount}<br/>
                Time: 30s<br/>
                Accuracy: {accuracy}%<br/>
                <span className="text-rose-400">Wrong Count: {wrong}</span>
            </p>
            <br/>
            <div className="flex flex-col sm:flex-row justify-center items-center">
                <button onClick={()=>leaderboard()} className="bg-rose-700 px-5 py-2 sm:mx-2 my-2 sm:my-0  rounded-md">
                    Leaderboard
                </button>
                <button onClick={()=>tryAgain()} className="bg-sky-700 px-5 py-2 sm:mx-2 my-2 sm:my-0 rounded-md">
                    Try again
                </button>
                <LeaderPopup wpm={wpm} wrong={wrong} wentToLeaderboard={wentToLeaderboard}/>
            </div>
        </div>
    )
}
