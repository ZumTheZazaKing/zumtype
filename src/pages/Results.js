import { Context } from "../context";
import { useContext } from "react";

export const Results = () => {
    let {wordCount} = useContext(Context);
    return (
        <h1>Word Count: {wordCount}</h1>
    )
}
