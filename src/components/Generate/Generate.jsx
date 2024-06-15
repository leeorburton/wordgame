import { useState, useEffect } from 'react';
import wordsData from '../../data/words.json';
import styles from "@/styles/word.module.scss";

export default function GenerateWord() {

    const [randomWord, setRandomWord] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const generateRandomWord = () => {
            const randomIndex = Math.floor(Math.random() * wordsData.words.length);
            const word = wordsData.words[randomIndex].split("");
            const list = [];

            word.forEach((letter) => { list.push(letter) });

            setRandomWord(list);
            sessionStorage.setItem('currWord', JSON.stringify(list));
            setIsLoaded(true);
        };

        setIsLoaded(false);
        generateRandomWord();

    }, []);

    if (!isLoaded) {
        return (
            <div>
                Loading
            </div>
        );
    } else {
        return (
            <div className={styles['letter-wrapper']}>
                {randomWord.map((letter) =>
                    <div className={styles['letter']} key={Math.floor(Math.random() * wordsData.words.length)}>{letter}</div>
                )}
            </div>
        );
    }

}