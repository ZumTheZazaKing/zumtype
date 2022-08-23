import { useState, useEffect, useRef } from "react";

export const Main = () => {

    const [sentences, setSentences] = useState(JSON.parse(localStorage.getItem("sentences")) || null);
    const acceptedKeys = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,;.!?()[]{}/"\'Backspace'
    const [chosenSentences, setChosenSentences] = useState("");
    let typed = [];
    let wrong = 0;
    const paraRef = useRef();

    useEffect(() => {
        if(!sentences){
            fetch("http://metaphorpsum.com/sentences/1000000")
            .then(res => res.text())
            .then(data => {
                localStorage.setItem("sentences",JSON.stringify(data.split(". ")));
                setSentences(data.split(". "))
            })
        }

        document.addEventListener('keydown',detectKeyDown,true);

    },[])

    useEffect(()=>{
       if(!sentences)return;
       const start = Math.floor(Math.random()*(sentences.length-5))
       setChosenSentences((sentences.slice(start, start+4)).join(". "))
    },[sentences])

    const detectKeyDown = e => {
        if(!acceptedKeys.includes(e.key))return;
        if(e.key === "Backspace"){
            if(paraRef.current.children[typed.length-1].classList.contains('wrong')){
                wrong--;
                console.log(wrong)
            }
            if(paraRef.current.children[typed.length-1].innerHTML===" "){
                typed.pop();
                if(paraRef.current.children[typed.length-1].classList.contains('wrong'))wrong--;
                console.log(wrong)
            }
            typed.pop();
            paraRef.current.children[typed.length].classList.remove('wrong');
            paraRef.current.children[typed.length].classList.remove('polish');
            paraRef.current.children[typed.length].classList.add('unpolish');
            if(typed[typed.length-1]===" "){typed.pop();}
        }else{
            if(typed.length===[...paraRef.current.children].length)return;
            if(paraRef.current.children[typed.length].innerHTML===" ")typed.push(" ");
            typed.push(e.key)
            if(typed[typed.length-1]===paraRef.current.children[typed.length-1].innerHTML){
                paraRef.current.children[typed.length-1].classList.remove('unpolish');
                paraRef.current.children[typed.length-1].classList.add('polish');
                if(typed.length===[...paraRef.current.children].length && wrong===0){
                    const start = Math.floor(Math.random()*(sentences.length-5))
                    setChosenSentences((sentences.slice(start, start+4)).join(". "))
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
                wrong++;
                console.log(wrong)
            }
            if(paraRef.current.children[typed.length].innerHTML===" "){
                typed.push(" ")
            }
        }
        
        console.log(typed);

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
                <p className="accent sm:text-xl cursor-default text-center">
                    Start Typing
                </p>
                <br/>
                <p ref={paraRef} className="sm:text-3xl">
                    {[...chosenSentences].map((sentence,i) => 
                        <span className={`unpolish`} key={i}>{sentence}</span>
                    )}
                </p>
            </div>
            :<div className="loading"></div>}
        </div>
    )
}