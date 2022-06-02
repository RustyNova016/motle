import {useState} from "react";
import {MenuState} from "../typings/menuState";
import styles from "../../styles/Home.module.css";
import Game from "./game";


export default function Menu(props: { languages: any }) {
    const [menuState, setMenuState] = useState(MenuState.idle);
    const [language, setLanguage] = useState("");

    switch (menuState) {
        case MenuState.idle: {
            return <button className={styles.button} onClick={() => {
                setMenuState(MenuState.game);
                return true
            }}>Start!</button>
        }

        case MenuState.game: {
            return <Game />
        }

        case MenuState.gameOver: {
            return <div className={styles.menu}/>
        }

        default: {
            return null;
        }
    }
}