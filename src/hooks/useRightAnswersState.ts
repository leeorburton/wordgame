import { hookstate, useHookstate } from '@hookstate/core';

const initalState = hookstate<string[]>([]);

export function useRightAnswersState() {

    const state = useHookstate(initalState);

    return {
        addRightAnswer(letter: string) {
            let set = state.set((rightLetters: string[]) => [...rightLetters, letter]);
            return set;
        },
        getRightAnswers() {
            return state.get();
        }
    }
}

