import { useState, useEffect } from 'react';
import styles from "@/styles/Keyboard.module.scss";

type Props = {
    value: string;
    active: boolean;
};

export default function Key({ value, active }: Props) {

    return (
        <div
            className={active ? `${styles.key}` : `${styles.key} ${styles.inactive}`}
            id={value}
        >
            {value}
        </div>
    );
}