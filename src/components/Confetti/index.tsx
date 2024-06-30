import { useCallback, useEffect, useRef } from 'react';
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

type TRunAnimationParams = {
    speed: number;
    duration?: number;
    origin?: { x: number, y: number };
};

function Confetti() {
    const autorunParams: TRunAnimationParams = {
        speed: 2,
        duration: 1,
        origin: { x: 0.5, y: 0.5 }
    };

    return <Fireworks autorun={autorunParams} />;
}

export default Confetti;