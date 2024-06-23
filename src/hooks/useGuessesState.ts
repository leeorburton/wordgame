import { hookstate, useHookstate } from '@hookstate/core';
import wordsData from '../data/words.json';

const initalState = hookstate<number>(0);

export function useGuessesState() {

    const state = useHookstate(initalState);

    return {
        addGuess() {
            return state.set(n => n + 1);
        },
        getGuesses() {
            return state.get();
        }
    }
}
