import { useState, useEffect, SetStateAction } from 'react';
import Key from '../Key';
import { keyValues } from '@/data/keyValues';
import styles from "@/styles/Keyboard.module.scss";
import { useRightAnswersState } from '../../hooks/useRightAnswersState';
import { useWrongAnswersState } from '../../hooks/useWrongAnswersState';
import { Titan_One, Montserrat } from "next/font/google";

type Props = {
    currWord: string[];
    handleGameStatus: (data: boolean) => void;
    handleFeedbackResponse: (data: boolean | null) => void;
};

const titan = Titan_One({ weight: "400", subsets: ["latin"] });
const montserrat = Montserrat({ weight: "400", subsets: ["latin"] });

export default function Keyboard({ currWord, handleGameStatus, handleFeedbackResponse }: Props) {

    const wrongAnswersState = useWrongAnswersState();
    const rightAnswersState = useRightAnswersState();

    const availableGuesses = 10;

    const [selection, setSelection] = useState<string | null>(null);
    const [numGuesses, setNumGuesses] = useState<number>(0);
    const [remainingGuesses, setRemainingGuesses] = useState<number>(availableGuesses);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);

    useEffect(() => {
        // check if the game is over after each guess
        checkResult();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [numGuesses]);

    useEffect(() => {
        // Allow user to use keyboard to select letters
        const keyDownHandler = (e: KeyboardEvent) => {
            if (/^[a-z]$/i.test(e.key) && isActive(e.key) === undefined) { // check if the pressed key is a letter
                setSelection(e.key);
            };

            if (selection !== null && !isGameOver && e.code === "Enter") { // submit on enter
                handleClick(selection);
            };

            if (e.code === "Escape") { // clear selection on escape
                setSelection(null);
            };
        };

        document.addEventListener("keydown", keyDownHandler);

        return () => { // clean up
            document.removeEventListener("keydown", keyDownHandler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selection]);

    const handleClick = (value: string) => {
        // handle user input and check answer

        if (currWord.includes(value)) {
            rightAnswersState.addRightAnswer(value);
            handleFeedbackResponse(true);
        } else {
            setRemainingGuesses(remainingGuesses - 1);
            wrongAnswersState.addWrongAnswer(value);
            handleFeedbackResponse(false);
        }

        setNumGuesses(prev => prev + 1);
        setSelection(null);
    }

    const checkResult = () => {
        // check if the game is over and if the user has won or lost
        let filtered: string[] | null = currWord;
        let correctAnswers = rightAnswersState.getRightAnswers().slice();

        filtered = currWord.filter((item) => !correctAnswers.includes(item));

        if (correctAnswers.length > 0 && filtered.length === 0) {
            setIsGameOver(true);
            return handleGameStatus(true); // win and pass data to parent
        } else {
            return checkNumGuesses(); // did not win, check if lost
        }
    }

    const checkNumGuesses = () => {
        if (remainingGuesses > 0) {
            return "playing"; // still playing
        } else {
            setIsGameOver(true);
            return handleGameStatus(false); // lose and pass data to parent
        }
    }

    const isActive = (key: string) => {
        // indicate if key has been guessed and if it was correct or incorrect
        if (rightAnswersState.getRightAnswers().includes(key)) {
            return true;
        } else if (wrongAnswersState.getWrongAnswers().includes(key)) {
            return false;
        } else {
            null;
        }
    }

    const renderRow = () => {

        return (
            keyValues.map((row: row) => (
                <div key={row.type} className={styles['row']} id={styles[row.type]}>
                    {row.keys.map((key: string) => (
                        <button
                            className={selection === key ? `${styles['key-wrapper']} ${styles['selected']}` : `${styles['key-wrapper']} ${styles['unselected']}`}
                            key={key}
                            onClick={() => { setSelection(key) }}
                            disabled={isActive(key) !== undefined}
                        >
                            <Key
                                value={key}
                                status={isActive(key)}
                            />
                        </button>
                    ))}
                </div>
            ))
        );
    }

    return (
        <div className={`${styles['game-wrapper']}`}>
            <div>
                Remaining guesses: <strong>{remainingGuesses}</strong>
            </div>
            <div className={`${styles['keyboard']}`}>

                {renderRow()}

                <div className='submit-wrapper'>
                    {!isGameOver &&
                        <button
                            className={`${titan.className} ${'submit'} ${styles.submit}`}
                            onClick={() => { selection !== null ? handleClick(selection) : null }}
                            disabled={selection === null ? true : false}
                        >
                            submit
                        </button>
                    }

                    {isGameOver &&
                        <button
                            className={`${titan.className} ${'submit'} ${styles.submit}`}
                            onClick={() => { window.location.reload() }}
                        >
                            play again
                        </button>
                    }

                </div>

            </div>
        </div>
    );
}