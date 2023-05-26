import React, { useEffect,useState,useRef } from "react";

var randomWords = require('random-words');

const TypingBox = () => {

    const inputRef = useRef(null)
    const [wordsArray, setWordsArray] = useState(()=>{
        return randomWords(50);
    });

    const handleUserInput = (e) =>{
        console.log(e)
    }

    const focusInput = () =>{
        inputRef.current.focus();
    }

    useEffect(() => {
        focusInput();
    }, []);

    return(
        <React.Fragment>
            <div className='type-box' onClick={focusInput}>
                <div className='words'>
                    {
                        wordsArray.map(word=>(
                            <span className='word'>
                                {word.split('').map(char=>(
                                    <span>{char}</span>
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