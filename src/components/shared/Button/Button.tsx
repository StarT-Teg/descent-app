import styles from './hero-button.module.css'
import React, {ReactNode} from "react";
import cn from "classnames";

export interface HeroButtonInterface {
    onClick?(): void;

    theme?: 'hero' | 'blue' | 'red' | 'outlineRed' | 'simple';
    buttonProps?: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
    children: ReactNode;
}

export const Button = (props: HeroButtonInterface) => {

    const {
        onClick,
        children,
        theme = 'blue',
        buttonProps,
    } = props;

    return (
        <button className={cn(styles.button, styles.buttonText, styles[theme])} onClick={onClick} {...buttonProps}>
            {children}
        </button>
    )
}