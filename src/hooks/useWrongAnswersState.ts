import { hookstate, useHookstate } from '@hookstate/core';

const initalState = hookstate<string[]>([]);

export function useWrongAnswersState() {
    const state = useHookstate(initalState);

    return {
        addWrongAnswer(letter: string) {
            let set = state.set((wrongLetters: string[]) => [...wrongLetters, letter]);
            return set;
        },
        getWrongAnswers() {
            return state.get();
        }
    }
}

