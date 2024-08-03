import { createContext, useState } from "react";
import runChat from "../config/Gimini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input,setInput] = useState('');
    const [recentPrompt,setrecentPrompt] = useState('');
    const [previousPrompt,setpreviousPrompt] = useState([]);
    const[showresult,setshowresult] = useState(false);
    const [loading,setloading] = useState(false);
    const [resultdata,setresultdata] = useState('');



    const onSent = async (prompt) => {

        setresultdata('')
        setloading(true)
        setshowresult(true)
        const response = await runChat(input)
        setresultdata(response)
        setloading(false)
        setInput('')
    }

    onSent('What is react JS')

    const contextValue = {
        previousPrompt,
        setpreviousPrompt,
        onSent,
        setrecentPrompt,
        recentPrompt,
        showresult,
        loading,
        resultdata,
        input,
        setInput

    }
    return (
        <Context.Provider  value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider