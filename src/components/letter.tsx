import React, {useContext, useEffect} from "react";
import {AppContext} from "./game";

interface letterParams {
    letterPos: number,
    attemptVal: number
}

function Letter({attemptVal, letterPos}: letterParams) {
    const {board, setDisabledLetters, currAttempt, correctWord} = useContext(AppContext);
    const letter = board[attemptVal][letterPos];
    const correct = correctWord.toUpperCase()[letterPos] === letter;
    const almost = !correct && letter !== "" && correctWord.toUpperCase().includes(letter);
    const letterState =
        currAttempt.attempt > attemptVal &&
        (correct ? "correct" : almost ? "almost" : "error");

    useEffect(() => {
        if (letter !== "" && !correct && !almost) {
            console.log(letter);
            setDisabledLetters((prev: any) => [...prev, letter]);
        }
    }, [currAttempt.attempt]);

    return (
        <div className="letter"  id={letterState}>
            {letter}
        </div>
    );
}

export default Letter;