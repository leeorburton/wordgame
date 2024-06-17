import { useState, useEffect } from 'react';
import wordsData from '../../data/words.json';
import styles from "@/styles/word.module.scss";


export default function RandomWord() {

    const randomIndex = Math.floor(Math.random() * wordsData.words.length);
    const word = wordsData.words[randomIndex].split("");
    const list: string[] = [];

    word.forEach((letter) => { list.push(letter) });


    return list;

}