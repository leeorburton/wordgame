import { useState, useEffect } from 'react';
import styles from "@/styles/Keyboard.module.scss";
import { useRightAnswersState } from '../../hooks/useRightAnswersState';
import { useWrongAnswersState } from '../../hooks/useWrongAnswersState';

type Props = {
    value: string;
    status?: boolean;
};

export default function Key({ value, status }: Props) {

    const wrongAnswersState = useWrongAnswersState();
    const rightAnswersState = useRightAnswersState();

    let className = styles['key']; // Default class

    switch (status) {
        case true:
            className += ` ${styles['correct']}`;
            break;
        case false:
            className += ` ${styles['incorrect']}`;
            break;
        default:
            break;
    }

    return (
        <div
            className={className}
            id={value}
        >
            {value}
        </div>
    );
}