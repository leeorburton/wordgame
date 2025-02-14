import { useState, useEffect } from 'react';
import Head from "next/head";
import { Titan_One, Montserrat } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import Keyboard from "../components/Keyboard";
import Word from "../components/Word";
import { useResponseState } from "@/hooks/useResponseState";
import Modal from '@/components/Modal';

const titan = Titan_One({ weight: "400", subsets: ["latin"] });
const montserrat = Montserrat({ weight: ["300", "600"], subsets: ["latin"] });

export default function Home() {

  const responseState = useResponseState();

  const [currWord, setCurrWord] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [result, setResult] = useState<boolean>();
  const [isClosed, setIsClosed] = useState<boolean>();
  const [feedbackResponse, setFeedbackResponse] = useState<boolean | null>();

  useEffect(() => {
    responseState.setWord();
    setCurrWord(responseState.getWord().slice());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFeedbackResponse = (data: boolean | null) => {
    // after each guess, keyboard component will trigger this function and set the feedback response
    setFeedbackResponse(data);
  };

  const handleGameStatus = (data: boolean) => {
    // when game is over, keyboard component will trigger this function and set the result (win/lose)
    setIsGameOver(true);
    setResult(data);
  };

  const handleClose = (data: boolean) => {
    // triggered by modal "close" button
    setIsClosed(true);
  };

  const feedbackClassName = () => {
    // style feedback feedback based on response
    let className = `${styles['feedback']}`; // Default class

    switch (feedbackResponse) {
      case true:
        className += ` ${styles['correct']}`;
        break;
      case false:
        className += ` ${styles['incorrect']}`;
        break;
      default:
        break;
    }

    return className;
  }

  return (
    <>
      <Head>
        <title>Guess the Word</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${montserrat.className}`}>
        <h1 className={`${styles.h1} ${titan.className}`}>Guess the Word</h1>
        {isGameOver && result !== undefined && !isClosed &&
          <Modal
            currWord={currWord}
            result={result}
            handleClose={handleClose}
          />
        }
        <div className={`${styles.word}`}>
          <div className={feedbackClassName()}>
            {feedbackResponse ? "Yay! That was correct" : "Oops, not that letter"}
          </div>
          <Word
            currWord={currWord}
            isGameOver={isGameOver}
          />
        </div>
        <Keyboard
          currWord={currWord}
          handleGameStatus={handleGameStatus}
          handleFeedbackResponse={handleFeedbackResponse}
        />
      </main>
    </>
  );
}
