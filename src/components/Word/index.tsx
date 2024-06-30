import { useState, useEffect } from 'react';
import styles from "@/styles/Word.module.scss";

import { useRightAnswersState } from '../../hooks/useRightAnswersState';

type Props = {
    currWord: string[];
    isGameOver: boolean;
};

export default function Word({ currWord, isGameOver }: Props) {

    const rightAnswersState = useRightAnswersState();

    const getClassName = (letter: string) => {
        let className = `${styles['letter']}`; // Default class

        switch (rightAnswersState.getRightAnswers().includes(letter)) {
            case false:
                className += ` ${styles['hidden']}`;
                break;
            default:
                break;
        }

        switch (isGameOver) {
            case true:
                className = ` ${styles['letter']}`;
                break;
            default:
                break;
        }

        return className;
    }

    return (
        <div className={styles['word']}>
            {currWord.map((letter) =>
                <div key={Math.floor(Math.random() * 1000000)} className={getClassName(letter)}> {letter} </div>
            )}
        </div>
    );
}