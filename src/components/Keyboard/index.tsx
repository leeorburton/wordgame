import { useState, useEffect } from 'react';
import Key from '../Key';
import keyValues from '@/data/keyValues';
import styles from "@/styles/Keyboard.module.scss";
import { useRightAnswersState } from '../../hooks/useRightAnswersState';
import { useWrongAnswersState } from '../../hooks/useWrongAnswersState';

type Props = {
    currWord: string[];
    onData: (data: boolean) => void;
};

export default function Keyboard({ currWord, onData }: Props) {
    const wrongAnswersState = useWrongAnswersState();
    const rightAnswersState = useRightAnswersState();

    const availableGuesses = 8;

    const [selection, setSelection] = useState<string | null>(null);
    const [numGuesses, setNumGuesses] = useState<number>(0);

    useEffect(() => {
        checkResult();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [numGuesses]);

    const handleClick = (value: string) => {
        if (currWord.includes(value)) {
            rightAnswersState.addRightAnswer(value);
        } else {
            wrongAnswersState.addWrongAnswer(value);
        }

        setNumGuesses(numGuesses + 1);
        setSelection(null);
    }

    const checkResult = () => {
        let filtered: string[] | null = currWord;
        let correctAnswers = rightAnswersState.getRightAnswers().slice();

        filtered = currWord.filter((item) => !correctAnswers.includes(item));

        return correctAnswers.length > 0 && filtered.length === 0 ? onData(true) : checkNumGuesses();
    }

    const checkNumGuesses = () => {
        return numGuesses < availableGuesses ? "playing" : onData(false);
    }

    const isActive = (key: string) => {
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
        <>
            <div>Num Guesses: {numGuesses} </div>
            <div>Wrong answers: {wrongAnswersState.getWrongAnswers()}</div>
            <div>Right answers: {rightAnswersState.getRightAnswers()}</div>
            <div className={styles['keyboard']}>

                {renderRow()}

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