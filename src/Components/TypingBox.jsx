import React, { createRef,useEffect,useState,useRef,useMemo } from "react";
import { UpperMenu } from "./UpperMenu";

var randomWords = require('random-words');

const TypingBox = () => {

    const inputRef = useRef(null)
    const [countDown, setCountDown] = useState(15);
    const [testStart, setTestStart] = useState(false);   
    const [testEnd, setTestEnd] = useState(false);  

    const [wordsArray, setWordsArray] = useState(()=>{
        return randomWords(50);
    });

    const [currWordIndex, setCurrWordIndex] = useState(0);
    const [currCharIndex, setCurrCharIndex] = useState(0);

    const wordsSpanRef = useMemo(() => {
        return Array(wordsArray.length).fill(0).map(i=>createRef(null));
    }, [wordsArray]);


    const startTimer = () =>{

        const intervalId = setInterval(timer, 1000);

        function timer(){
            setCountDown((latestCountDown)=>{

                if (latestCountDown === 1) {
                    setTestEnd(true);
                    clearInterval(intervalId);
                    return 0;
                }

                return latestCountDown-1;
            });
        }
    }

    const handleUserInput = (e) =>{

        if(!testStart){
            startTimer();
            setTestStart(true);
        }

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

        if(e.keyCode === 8){ //keyCode = 8 is for backspace
            // logic for backspace

            if(currCharIndex !== 0){

                if(allCurrChars.length === currCharIndex){

                    if(allCurrChars[currCharIndex-1].className.includes('extra')){
                        allCurrChars[currCharIndex-1].remove();
                        allCurrChars[currCharIndex-2].className += " current-right";
                    }
                    else{
                        allCurrChars[currCharIndex-1].className = "current";
                    }

                    setCurrCharIndex(currCharIndex-1);
                    return;
                }
                  
                allCurrChars[currCharIndex].className = "";
                allCurrChars[currCharIndex-1].className = "current";
                setCurrCharIndex(currCharIndex-1);
            }

            return;

        }

        if(currCharIndex === allCurrChars.length){
            
            let newSpan = document.createElement('span');
            newSpan.innerText = e.key;
            newSpan.className = "incorrect extra current-right";
            allCurrChars[currCharIndex-1].classList.remove('current-right');
            wordsSpanRef[currWordIndex].current.append(newSpan);
            setCurrCharIndex(currCharIndex+1);
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
        <div>
            <UpperMenu countDown={countDown}/>
            {(testEnd) ? (<h1>Test Over</h1>) : (<div className='type-box' onClick={focusInput}>
                <div className='words'>
                    {
                        wordsArray.map((word, index) => (
                            <span className='word' ref={wordsSpanRef[index]}>
                                {word.split('').map(char => (
                                    <span >{char}</span>
                                ))}
                            </span>
                        ))
                    }
                </div>
            </div>)}
            <input
                type ='text'
                className = 'hidden-input'
                ref = {inputRef}
                onKeyDown = {handleUserInput}
            />
        </div>
    )
}


export default TypingBox;