import { useState } from "react";

export const Main = () => {

    const [fetchedPara, setFetchedPara] = useState("");

    fetch("http://metaphorpsum.com/sentences/5")
    .then(res => res.text())
    .then(data => console.log(data))

    return (
        <div 
            className="
                border border-black h-screen w-screen flex items-center
                justify-center font-mono flex-col
            "
        >
            <p className="accent text-xl">
                Start Typing
            </p>
            <br/>
            <p className="text-3xl secondary">
                Main
            </p>
        </div>
    )
}