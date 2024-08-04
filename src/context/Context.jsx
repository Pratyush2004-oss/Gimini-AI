import { createContext, useState } from "react";
import runChat from "../config/Gimini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState('');
    const [recentPrompt, setrecentPrompt] = useState('');
    const [previousPrompt, setpreviousPrompt] = useState([]);
    const [showresult, setshowresult] = useState(false);
    const [loading, setloading] = useState(false);
    const [resultdata, setresultdata] = useState('');

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setresultdata(prev => prev + nextWord)
        }, 75 * index)
    }

    const newChat = () => {
        setloading(false)
        setshowresult(false)
    }

    const onSent = async (prompt) => {

        setresultdata('')
        setloading(true)
        setshowresult(true)
        let response;
        if (prompt !== undefined) {
            response = await runChat(prompt)
            setrecentPrompt(prompt)
        }
        else{
            setpreviousPrompt(prev => [...prev, input])
            setrecentPrompt(input)
            response = await runChat(input)
        }
        let responseArray = response.split("**");
        let newResponse = '';
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i]
            }
            else {
                newResponse += '<b>' + responseArray[i] + '</b>';
            }
        }
        let newResponse2 = newResponse.split('*').join('<br/>')
        let newResponseArray = newResponse2.split(' ')
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + ' ')
        }

        setloading(false)
        setInput('')
    }

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
        setInput,
        newChat
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider