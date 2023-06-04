import React, { createRef, useEffect, useState, useRef, useMemo } from "react";
import { UpperMenu } from "./UpperMenu";
import { useTestMode } from "../Context/TestModeContext";
import Stats from "./Stats"

var randomWords = require('random-words');

const TypingBox = () => {

    const inputRef = useRef(null)

    const { testTime } = useTestMode();

    const [countDown, setCountDown] = useState(testTime);
    const [testStart, setTestStart] = useState(false);
    const [testEnd, setTestEnd] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    const [correctChars, setCorrectChars] = useState(0);
    const [incorrectChars, setIncorrectChars] = useState(0);
    const [missedChars, setMissedChars] = useState(0);
    const [extraChars, setExtraChars] = useState(0);
    const [correctWords, setCorrectWords] = useState(0);


    const [wordsArray, setWordsArray] = useState(() => {
        return randomWords(50);
    });

    const [currWordIndex, setCurrWordIndex] = useState(0);
    const [currCharIndex, setCurrCharIndex] = useState(0);

    const wordsSpanRef = useMemo(() => {
        return Array(wordsArray.length).fill(0).map(i => createRef(null));
    }, [wordsArray]);


    const [graphData, setGraphData] = useState([]);

    const startTimer = () => {

        const intervalId = setInterval(timer, 1000);

        setIntervalId(intervalId);

        function timer() {
            setCountDown((latestCountDown) => {

                setCorrectChars((correctChars)=>{
                    setGraphData((graphData)=>{
                        return [...graphData, [
                            testTime - latestCountDown + 1,
                            (correctChars/5)/((testTime-latestCountDown+1)/60)
                        ]];
                    })

                    return correctChars;
                })

                if (latestCountDown === 1) {
                    setTestEnd(true);
                    clearInterval(intervalId);
                    return 0;
                }

                return latestCountDown - 1;
            });
        }
    }

    // if change the time for test then reset the test
    const resetTest = () => {

        clearInterval(intervalId);
        setCountDown(testTime);
        setCurrWordIndex(0);
        setCurrCharIndex(0);
        setTestStart(false);
        setTestEnd(false);
        setWordsArray(randomWords(50));
        resetWordSpanRefClassname();
        focusInput();
    }

    const resetWordSpanRefClassname = () => {
        wordsSpanRef.map(i => {
            // conver nodes into arrays
            Array.from(i.current.childNodes).map(j => {
                j.className = '';
            })
        })

        wordsSpanRef[0].current.childNodes[0].className = "current";
    }

    const handleUserInput = (e) => {

        if (!testStart) {
            startTimer();
            setTestStart(true);
        }

        if (!testEnd) {

            const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;
            // console.log(allCurrChars[0].innerText)

            if (e.keyCode === 32) { //32 keyCode is for space
                // logic for space

                let correctCharInWord = wordsSpanRef[currWordIndex].current.querySelectorAll('.correct');

                if (correctCharInWord.length === allCurrChars.length) {
                    setCorrectWords(correctWords + 1);
                }

                if (allCurrChars.length <= currCharIndex) {
                    // remove cursor from last place in a word
                    allCurrChars[currCharIndex - 1].classList.remove("current-right")
                }
                else {
                    // remove cursor from in between in the word
                    setMissedChars(missedChars + (allCurrChars.length - currCharIndex));
                    allCurrChars[currCharIndex].classList.remove("current")
                }

                // move the cursor blinking to next word
                wordsSpanRef[currWordIndex + 1].current.childNodes[0].className = "current";
                setCurrWordIndex(currWordIndex + 1);
                setCurrCharIndex(0);
                return;
            }

            if (e.keyCode === 8) { //keyCode = 8 is for backspace
                // logic for backspace

                if (currCharIndex !== 0) {

                    if (allCurrChars.length === currCharIndex) {

                        if (allCurrChars[currCharIndex - 1].className.includes('extra')) {
                            allCurrChars[currCharIndex - 1].remove();
                            allCurrChars[currCharIndex - 2].className += " current-right";
                        }
                        else {
                            allCurrChars[currCharIndex - 1].className = "current";
                        }

                        setCurrCharIndex(currCharIndex - 1);
                        return;
                    }

                    allCurrChars[currCharIndex].className = "";
                    allCurrChars[currCharIndex - 1].className = "current";
                    setCurrCharIndex(currCharIndex - 1);
                }

                return;

            }

            if (currCharIndex === allCurrChars.length) {

                let newSpan = document.createElement('span');
                newSpan.innerText = e.key;
                newSpan.className = "incorrect extra current-right";
                allCurrChars[currCharIndex - 1].classList.remove('current-right');
                wordsSpanRef[currWordIndex].current.append(newSpan);
                setCurrCharIndex(currCharIndex + 1);
                setExtraChars(extraChars + 1);
                return;
            }

            if (e.key === allCurrChars[currCharIndex].innerText) {
                // console.log("correct input")
                allCurrChars[currCharIndex].className = "correct";
                setCorrectChars(correctChars + 1);
            }
            else {
                // console.log("incorrect");
                allCurrChars[currCharIndex].className = "incorrect";
                setIncorrectChars(incorrectChars + 1);
            }

            if (currCharIndex + 1 === allCurrChars.length) {
                allCurrChars[currCharIndex].className += " current-right";
            }
            else {
                allCurrChars[currCharIndex + 1].className = "current";
            }


            setCurrCharIndex(currCharIndex + 1);
        }
    }

    const calculateWPM = () => {
        return Math.round((correctChars / 5) / (testTime / 60))
    }

    const calculateAcc = () => {
        return Math.round((correctWords / currWordIndex) * 100);
    }

    const focusInput = () => {
        inputRef.current.focus();
    }

    useEffect(() => {
        resetTest();
    }, [testTime]);

    useEffect(() => {
        focusInput();
        wordsSpanRef[0].current.childNodes[0].className = "current";
    }, []);

    return (
        <div>
            <UpperMenu countDown={countDown} />
            {(testEnd) ?
                (
                    <Stats 
                        wpm={calculateWPM()} 
                        accuracy={calculateAcc()} 
                        correctChars={correctChars} 
                        incorrectChars={incorrectChars} 
                        missedChars={missedChars}
                        extraChars={extraChars}
                        graphData={graphData}
                    />
                )
                :
                (<div className='type-box' onClick={focusInput}>
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
                type='text'
                className='hidden-input'
                ref={inputRef}
                onKeyDown={handleUserInput}
            />
        </div>
    )
}


export default TypingBox;