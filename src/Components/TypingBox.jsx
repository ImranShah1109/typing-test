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

        if(e.keyCode === 32){ //32 keyCode is for space
            // logic for space

            if(allCurrChars.length <= currCharIndex){
                // remove cursor from last place in a word
                allCurrChars[currCharIndex-1].classList.remove("current-right")
            }
            else{
                // remove cursor from in between in the word
                allCurrChars[currCharIndex].classList.remove("current")
            }

            // move the cursor blinking to next word
            wordsSpanRef[currWordIndex+1].current.childNodes[0].className = "current";
            setCurrWordIndex(currWordIndex+1);
            setCurrCharIndex(0);
            return;
        }

        if(e.key === allCurrChars[currCharIndex].innerText){
            // console.log("correct input")
            allCurrChars[currCharIndex].className = "correct"; 
        }
        else{
            // console.log("incorrect");
            allCurrChars[currCharIndex].className = "incorrect"; 
        }

        if(currCharIndex+1 === allCurrChars.length){
            allCurrChars[currCharIndex].className += " current-right";
        }
        else{
            allCurrChars[currCharIndex+1].className = "current";
        }
        

        setCurrCharIndex(currCharIndex+1);
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