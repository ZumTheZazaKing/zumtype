import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, limit, orderBy, query, addDoc } from "firebase/firestore";
import uniqid from 'uniqid'

const LeaderPopup = (props) => {

    const {wpm, wrong, wentToLeaderboard} = props;
    const popupRef = useRef();
    const [typerName, setTyperName] = useState(uniqid.time("typer#"));
    const [disabled, setDisabled] = useState(false);

    useEffect(()=>{
        let typersRef = query(collection(db,"typer"), orderBy("wpm","desc"), limit(10));
        onSnapshot(typersRef,querySnapshot=>{
            for(let i=0;i<querySnapshot.size;i++){
                if(wrong === 0 && wpm > querySnapshot.docs[i].data().wpm && wentToLeaderboard===false){
                    popupRef.current.classList.remove('hide');
                    break;
                }
            }
        })
    },[])

    const submit = async() => {
        setDisabled(true);
        await addDoc(collection(db,"typer"),{
            name: typerName,
            wpm: wpm
        })
        .then(()=>{
            popupRef.current.classList.add('hide');
            setDisabled(false);
        })
    }

    return (
        <div ref={popupRef} className="leaderpopup hide">
            <div className="p-5 bg-sky-700 text-center rounded">
                You got yourself in the leaderboard!
                <br/><br/>
                Your Name:
                <br/>
                <input 
                    type="text" 
                    value={typerName} 
                    onChange={(e)=>setTyperName(e.target.value)}
                    className="text-black p-2 outline-0 border-0"
                    maxLength={20}
                />
                <br/><br/>
                <button 
                    disabled={disabled} 
                    onClick={()=>submit()} 
                    className="bg-sky-900 px-6 py-2 rounded"
                >
                        Submit
                </button>
            </div>
        </div>
    )
}; export default LeaderPopup;