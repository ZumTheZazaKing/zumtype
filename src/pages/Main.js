import { useState, useEffect, useRef, useContext } from "react";
import { Context } from "../context";
import { useNavigate } from "react-router-dom";

export const Main = () => {

    const [sentences, setSentences] = useState(JSON.parse(localStorage.getItem("sentences")) || null);
    const acceptedKeys = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-,;.!?()[]{}/"\'Backspace'
    const [chosenSentences, setChosenSentences] = useState("");
    const navigate = useNavigate();
    let {wrong,charCount,setWrong,setCharCount} = useContext(Context)
    let typed = [];
    let [timerCount, setTimerCount] = useState(30);
    let started = false;
    const paraRef = useRef();
    const timerRef= useRef();
    
    let timer = setInterval(()=>{
        if(started){
            timerRef.current.innerHTML = timerCount;
            setTimerCount(--timerCount)
        }
        if(timerCount===0){
            clearInterval(timer);
            navigate('/results')
        }
    },1000)

    useEffect(() => {
        if(!sentences){
            fetch("https://cors-anywhere.herokuapp.com/http://metaphorpsum.com/sentences/1000000")
            .then(res => res.text())
            .then(data => {
                localStorage.setItem("sentences",JSON.stringify(data.split(". ")));
                setSentences(data.split(". "))
            })
        }

        document.addEventListener('keydown',detectKeyDown,true)

    },[])

    useEffect(()=>{
       if(!sentences)return;
       const start = Math.floor(Math.random()*(sentences.length-5))
       setChosenSentences((sentences.slice(start, start+2)).join(". "))
    },[sentences])

    const detectKeyDown = e => {
        if(!acceptedKeys.includes(e.key))return;
        if(e.key === "Backspace"){
            if(paraRef.current.children[typed.length-1].classList.contains('wrong')){
                setWrong(--wrong);
            }
            if(paraRef.current.children[typed.length-1].innerHTML===" "){
                typed.pop();
                if(paraRef.current.children[typed.length-1].classList.contains('wrong'))setWrong(--wrong);
            }
            typed.pop();
            setCharCount(--charCount);
            console.log(charCount);
            paraRef.current.children[typed.length].classList.remove('wrong');
            paraRef.current.children[typed.length].classList.remove('polish');
            paraRef.current.children[typed.length].classList.add('unpolish');
        }else{
            if(!started)started=true;
            if(typed.length===[...paraRef.current.children].length)return;
            if(paraRef.current.children[typed.length].innerHTML===" ")typed.push(" ");
            typed.push(e.key)
            setCharCount(++charCount);
            if(typed[typed.length-1]===paraRef.current.children[typed.length-1].innerHTML){
                paraRef.current.children[typed.length-1].classList.remove('unpolish');
                paraRef.current.children[typed.length-1].classList.add('polish');
                if(typed.length===[...paraRef.current.children].length && wrong===0){
                    const start = Math.floor(Math.random()*(sentences.length-5))
                    setChosenSentences((sentences.slice(start, start+2)).join(". "))
                    typed=[];
                    [...paraRef.current.children].map((child,i)=>{
                        child.classList.remove('wrong');
                        child.classList.remove('polish');
                        child.classList.add('unpolish');
                    })
                }
            }else{
                paraRef.current.children[typed.length-1].classList.remove('unpolish');
                paraRef.current.children[typed.length-1].classList.add('wrong');
                setWrong(++wrong);
            }
            if(paraRef.current.children[typed.length].innerHTML===" "){
                typed.push(" ")
            }
        }
    }

    return (
        <div 
            className="d
                h-screen w-screen flex items-center
                justify-center font-mono flex-col
            "
        >
            {chosenSentences ? 
            <div className="text-justify px-10 w-screen sm:w-3/4 leading-normal">
                <p ref={timerRef} className="accent sm:text-2xl cursor-default text-center">
                    Start Typing
                </p>
                <br/>
                <p ref={paraRef} className="sm:text-3xl">
                    {[...chosenSentences].map((sentence,i) => 
                        <span className={`unpolish`} key={i}>{sentence}</span>
                    )}
                </p>
                <button onClick={()=>navigate("/leaderboard")} className="bg-rose-700 px-5 py-2 m-5 text-white rounded-md fixed top-0 left-0">
                    Leaderboard
                </button>
            </div>
            :<div className="loading"></div>}
        </div>
    )
}