import { useState, useEffect } from 'react';
import styles from "@/styles/Modal.module.scss";
import { Titan_One, Montserrat } from "next/font/google";
import Confetti from '@/components/Confetti';
import CloseIcon from '../CloseIcon';

type Props = {
    result: boolean;
    currWord: string[];
    handleClose: (data: boolean) => void;
};

const titan = Titan_One({ weight: "400", subsets: ["latin"] });
const montserrat = Montserrat({ weight: ["300", "600"], subsets: ["latin"] });

export default function Word({ result, currWord, handleClose }: Props) {

    const handleCloseClick = () => {
        return handleClose(true);
    };

    return (
        <>
            <div className={`${styles.backdrop}`}></div>
            <div className={`${styles.modal} ${montserrat.className}`}>
                <button
                    className={`${styles.close}`}
                    onClick={handleCloseClick}
                >
                    <CloseIcon />
                </button>
                {result &&
                    <Confetti />
                }
                <div className={`${styles.titleWrapper}`}>
                    <div className={`${titan.className} ${styles.title}`}>{result ? "Winner!" : "Game Over"}</div>
                    {result &&
                        <div>Yay! You got the word!</div>
                    }
                    {!result &&
                        <div>Oh no! You lost, try again. &#128557;</div>
                    }
                </div>
                <div className={`${styles.wordWrapper}`}>
                    <div>The word was:</div>
                    <div className={`${titan.className} ${styles.title}`}>{currWord}</div>
                </div>
                <div className='submit-wrapper'>
                    <button
                        className={`${titan.className} ${'submit'}`}
                        onClick={() => window.location.reload()}
                    >
                        play again
                    </button>
                </div>
            </div >

        </>
    );
}