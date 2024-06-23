import { useState, useEffect } from 'react';
import styles from "@/styles/Keyboard.module.scss";

import { useRightAnswersState } from '../../hooks/useRightAnswersState';

type Props = {
    currWord: string[];
};

export default function Word({ currWord }: Props) {

    const rightAnswersState = useRightAnswersState();

    return (
        <div className={styles['word']}>
            {currWord.map((letter) =>
                <div key={Math.floor(Math.random() * 1000000)} className={rightAnswersState.getRightAnswers().includes(letter) ? `${styles['letter']}` : `${styles['letter']} ${styles['hidden']}`}> {letter} </div>
            )}
        </div>
    );
}