import { Context } from "../context";
import { useContext } from "react";

export const Results = () => {
    let {charCount,wrong} = useContext(Context);
    return (
        <div className="text-white leading-normal">
            Word Count: {charCount}<br/>
            Wrong: {wrong}
        </div>
    )
}
