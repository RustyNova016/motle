import React, {useContext} from "react";
import {AppContext} from "./game";

function Key({keyVal, bigKey, disabled}: { keyVal: string; bigKey?: boolean; disabled?: boolean }) {
    const {gameOver, onSelectLetter, onDelete, onEnter} =
        useContext(AppContext);

    const selectLetter = () => {
        if (gameOver.gameOver) return;
        if (keyVal === "ENTER") {
            onEnter();
        } else if (keyVal === "DELETE") {
            onDelete();
        } else {
            onSelectLetter(keyVal);
        }
    };
    return (
        <div
            className="key"
            onClick={selectLetter}
        >
            {keyVal}
        </div>
    );
}

export default Key;