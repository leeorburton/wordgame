import { useState, useEffect } from 'react';
import Key from '../Key';
import styles from "@/styles/Keyboard.module.scss";
import RandomWord from '../Generate';
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
        setCurrWord(RandomWord);
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

    const keyClassName = (key: string) => {
        if (wrongLetters.includes(key)) {
            return "incorrect";
        } else if (correctLetters.includes(key)) {
            return "correct";
        } else {
            return "inactive";
        }
    }

    return (
        <>
            <div className={styles['word']}>
                {currWord.map((letter) =>
                    <div key={Math.floor(Math.random() * 1000000)} className={correctLetters.includes(letter) ? `${styles['letter']}` : `${styles['letter']} ${styles['hidden']}`}> {letter} </div>
                )}
            </div>
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
                            className={selection === key ? `${styles['key-wrapper']} ${styles['selected']}` : `${styles['key-wrapper']} ${styles['unselected']}`}
                            key={key}
                            onClick={() => { setSelection(key) }}
                            disabled={wrongLetters.includes(key) || correctLetters.includes(key)}
                        >
                            <Key
                                value={key}
                                status={keyClassName(key)}
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
                            className={selection === key ? `${styles['key-wrapper']} ${styles['selected']}` : `${styles['key-wrapper']} ${styles['unselected']}`}
                            key={key}
                            onClick={() => { setSelection(key) }}
                            disabled={wrongLetters.includes(key)}
                        >
                            <Key
                                value={key}
                                status={keyClassName(key)}
                            />
                        </button>
                    )}
                </div>
                <div className={styles['row']} id={styles['bottomkeys']}>
                    {bottomkeys.map((key) =>
                        <button
                            className={selection === key ? `${styles['key-wrapper']} ${styles['selected']}` : `${styles['key-wrapper']} ${styles['unselected']}`}
                            key={key}
                            onClick={() => { setSelection(key) }}
                            disabled={wrongLetters.includes(key)}
                        >
                            <Key
                                value={key}
                                status={keyClassName(key)}
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
        </>
    );
}