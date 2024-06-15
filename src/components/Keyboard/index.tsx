import { useState, useEffect } from 'react';
import Key from '../Key';
import styles from "@/styles/Keyboard.module.scss";

export default function Keyboard() {

    const topkeys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
    const middlekeys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
    const bottomkeys = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

    const [currWord, setCurrWord] = useState<string[]>([]);
    const [selection, setSelection] = useState<string | null>(null);
    const [wrongLetters, setWrongLetters] = useState<string[]>([]);
    const [correctLetters, setCorrectLetters] = useState<string[]>([]);
    const [numGuesses, setNumGuesses] = useState<number>(0);

    useEffect(() => {
        const storedWord = sessionStorage.getItem('currWord');

        if (storedWord) {
            try {
                const wordArray = JSON.parse(storedWord);
                if (Array.isArray(wordArray)) {
                    setCurrWord(wordArray);
                } else {
                    console.error('Stored word is not an array:', storedWord);
                }
            } catch (error) {
                console.error('Error parsing stored word:', error);
            }
        }

        console.log(storedWord);

    }, []);

    const handleClick = (value: string) => {
        if (currWord.includes(value)) {
            setCorrectLetters(correctLetters => [...correctLetters, value]);
            setSelection(null);
            console.log("true");
        } else {
            setWrongLetters(wrongLetters => [...wrongLetters, value]);
            setSelection(null);
            console.log("false");
        }

        setNumGuesses(numGuesses => numGuesses + 1);
    }

    return (
        <div className={styles['keyboard']}>
            <div>
                <span>Correct: </span>
                {correctLetters}
            </div>
            <div>
                <span>Wrong: </span>
                {wrongLetters}
            </div>
            <div>
                <span> Guesses: </span>
                {numGuesses}
            </div>
            <div
                className={styles['row']}
                id={styles['topkeys']}
            >
                {topkeys.map((key) =>
                    <button
                        className={selection === key ? styles['selected'] : styles['unselected']}
                        key={key}
                        onClick={() => { setSelection(key) }}
                        disabled={wrongLetters.includes(key)}

                    >
                        <Key
                            value={key}
                            active={!wrongLetters.includes(key)}
                        />
                    </button>
                )}
            </div>
            <div
                className={styles['row']}
                id={styles['middlekeys']}
            >
                {middlekeys.map((key) =>
                    <button
                        className={selection === key ? styles['selected'] : styles['unselected']}
                        key={key}
                        onClick={() => { setSelection(key) }}
                        disabled={wrongLetters.includes(key)}
                    >
                        <Key
                            value={key}
                            active={!wrongLetters.includes(key)}
                        />
                    </button>
                )}
            </div>
            <div className={styles['row']} id={styles['bottomkeys']}>
                {bottomkeys.map((key) =>
                    <button
                        className={selection === key ? styles['selected'] : styles['unselected']}
                        key={key}
                        onClick={() => { setSelection(key) }}
                        disabled={wrongLetters.includes(key)}
                    >
                        <Key
                            value={key}
                            active={!wrongLetters.includes(key)}
                        />
                    </button>
                )}
            </div>

            <button
                onClick={() => { selection !== null ? handleClick(selection) : null }}
                disabled={selection === null ? true : false}
            >
                Submit
            </button>

        </div>
    );
}