// Get the word from the API
import {createContext, useEffect, useState} from "react";
import Keyboard from "./keyboard";
import axios from "axios";
import {PlayGrid} from "./PlayGrid";
import {GameOver} from "./gameover";

function getServerSideProps() {

}

export const AppContext = createContext({});

const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

function Game() {
    const [board, setBoard] = useState(boardDefault);
    const [currAttempt, setCurrAttempt] = useState({attempt: 0, letter: 0});
    const [wordSet, setWordSet] = useState(new Set());
    const [correctWord, setCorrectWord] = useState("");
    const [disabledLetters, setDisabledLetters] = useState([]);
    const [gameOver, setGameOver] = useState({
        gameOver: false,
        guessedWord: false,
    });

    useEffect(() => {
        const wordAPIS = [
            "http://localhost:3000/api/frenchWord",
            "http://localhost:3000/api/englishWord"
        ]

        //get a random word from the API
        axios.get(wordAPIS[Math.floor(Math.random() * wordAPIS.length)]).then((word) => {
            setCorrectWord(word.data);
        });
    }, []);

    const onEnter = () => {
        if (currAttempt.letter !== 5) return;

        let currWord = "";
        for (let i = 0; i < 5; i++) {
            currWord += board[currAttempt.attempt][i];
        }

        setCurrAttempt({attempt: currAttempt.attempt + 1, letter: 0});


        if (currWord === correctWord) {
            setGameOver({gameOver: true, guessedWord: true});
            return;
        }
        console.log(currAttempt);
        if (currAttempt.attempt === 5) {
            setGameOver({gameOver: true, guessedWord: false});
            return;
        }
    };

    const onDelete = () => {
        if (currAttempt.letter === 0) return;
        const newBoard = [...board];
        newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
        setBoard(newBoard);
        setCurrAttempt({...currAttempt, letter: currAttempt.letter - 1});
    };

    const onSelectLetter = (key: string) => {
        if (currAttempt.letter > 4) return;
        const newBoard = [...board];
        newBoard[currAttempt.attempt][currAttempt.letter] = key;
        setBoard(newBoard);
        setCurrAttempt({
            attempt: currAttempt.attempt,
            letter: currAttempt.letter + 1,
        });
    };

    return (
        <div className="App">
            <AppContext.Provider
                value={{
                    board,
                    setBoard,
                    currAttempt,
                    setCurrAttempt,
                    correctWord,
                    onSelectLetter,
                    onDelete,
                    onEnter,
                    setDisabledLetters,
                    disabledLetters,
                    gameOver,
                }}
            >
                <div className="game">
                    <PlayGrid/>
                    {gameOver.gameOver ? <GameOver /> : <Keyboard />}
                </div>
            </AppContext.Provider>
        </div>
    );
}

export default Game;