import styles from './hero-button.module.css'
import React from "react";

export interface HeroButtonInterface {
    buttonText: string;
    onClick?(): void;
    buttonProps?: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
}

export const HeroButton = (props: HeroButtonInterface) => {

    const {
        onClick,
        buttonText,
    } = props;

    return (
        <div className={styles.buttonRoot} onClick={onClick}>
            <div className={styles.valueContainer}>
                <input spellCheck={false} type='text' value={buttonText}/>
            </div>
        </div>
    )
}