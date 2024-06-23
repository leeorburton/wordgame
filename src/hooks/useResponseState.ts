import { hookstate, useHookstate } from '@hookstate/core';
import wordsData from '../data/words.json';

const initalState = hookstate<string[]>([]);

export function useResponseState() {

    const state = useHookstate(initalState);

    return {
        setWord() {
            const randomIndex = Math.floor(Math.random() * wordsData.words.length);
            const word = wordsData.words[randomIndex].split("");

            const letterList: string[] = [];
            word.forEach((letter: string) => { letterList.push(letter) });

            return state.set(letterList);
        },
        getWord() {
            return state.get();
        }
    }
}
