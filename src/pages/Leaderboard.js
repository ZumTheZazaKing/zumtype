import { useEffect, useState } from "react";
import { db } from "../firebase";
import { onSnapshot, collection, query, orderBy, limit } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const Leaderboard = () => {

    const navigate = useNavigate();
    const [typers,setTypers] = useState([]);
    const [typersExist, setTypersExist] = useState(false);

    useEffect(()=>{
        let typersRef = query(collection(db,"typer"), orderBy("wpm","desc"), limit(10));
        
        onSnapshot(typersRef,querySnapshot=>{
            if(querySnapshot.size===0)return;
            setTypersExist(true);
            querySnapshot.forEach(doc=>{
                typers.push(doc.data())
            })
        })
    },[])

    return (
       <div className="flex flex-col items-center justify-center h-screen w-screen text-white font-mono">
            <button onClick={()=>navigate("/")} className="bg-rose-700 px-5 py-2 m-5 rounded-md fixed top-0 left-0">
                Back
            </button>
            {!typersExist ? 
            <p className="text-2xl text-center p-3">
                No typers have been recorded. Be the first to type!
            </p> 
            :
            <div className="flex flex-col items-center justify-center h-screen w-screen">
                <h1 className="text-3xl font-bold">Leaderboard</h1>
                <br/>
                <table>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>WPM</th>
                    </tr>
                    {typers.map((typer,i)=>{
                        return (
                            <tr className={`${i===0?"bg-amber-400":""}`} key={i}>
                                <td>{i+1}</td>
                                <td>{typer.name}</td>
                                <td>{typer.wpm}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
            }
       </div>
    )
}