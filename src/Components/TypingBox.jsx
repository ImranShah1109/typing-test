import React, { createRef,useEffect,useState,useRef,useMemo } from "react";

var randomWords = require('random-words');

const TypingBox = () => {

    const inputRef = useRef(null)
    const [wordsArray, setWordsArray] = useState(()=>{
        return randomWords(50);
    });

    const [currWordIndex, setCurrWordIndex] = useState(0);
    const [currCharIndex, setCurrCharIndex] = useState(0);

    const wordsSpanRef = useMemo(() => {
        return Array(wordsArray.length).fill(0).map(i=>createRef(null));
    }, [wordsArray]);


    const handleUserInput = (e) =>{
        const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;
        // console.log(allCurrChars[0].innerText)

        if(e.key === allCurrChars[currCharIndex].innerText){
            // console.log("correct input")
            allCurrChars[currCharIndex].className = "correct"; 
        }
        else{
            // console.log("incorrect");
            allCurrChars[currCharIndex].className = "incorrect"; 
        }
    }

    const focusInput = () =>{
        inputRef.current.focus();
    }

    useEffect(() => {
        focusInput();
        wordsSpanRef[0].current.childNodes[0].className = "current";
    }, []);

    return(
        <React.Fragment>
            <div className='type-box' onClick={focusInput}>
                <div className='words'>
                    {
                        wordsArray.map((word,index)=>(
                            <span className='word' ref={wordsSpanRef[index]}>
                                {word.split('').map(char=>(
                                    <span >{char}</span>
                                ))}
                            </span>
                        ))
                    }
                </div>
            </div>
            <input
                type ='text'
                className = 'hidden-input'
                ref = {inputRef}
                onKeyDown = {handleUserInput}
            />
        </React.Fragment>
    )
}


export default TypingBox;