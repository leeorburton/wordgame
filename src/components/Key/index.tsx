import styles from "@/styles/Keyboard.module.scss";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ weight: "400", subsets: ["latin"] });

type Props = {
    value: string;
    status?: boolean;
};

export default function Key({ value, status }: Props) {

    let className = `${styles['key']} ${montserrat.className}`; // Default class

    switch (status) {
        case true:
            className += ` ${styles['correct']}`;
            break;
        case false:
            className += ` ${styles['incorrect']}`;
            break;
        default:
            break;
    }

    return (
        <div
            className={className}
            id={value}
        >
            {value}
        </div>
    );
}