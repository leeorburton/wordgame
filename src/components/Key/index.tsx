import { useState, useEffect } from 'react';
import styles from "@/styles/Keyboard.module.scss";

type Props = {
    value: string;
    status: string;
};

export default function Key({ value, status }: Props) {
    let className = styles['key']; // Default class

    switch (status) {
        case "correct":
            className += ` ${styles['correct']}`;
            break;
        case "incorrect":
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