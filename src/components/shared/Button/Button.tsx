import styles from './hero-button.module.css'
import React, {ReactNode} from "react";
import cn from "classnames";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

export interface HeroButtonInterface {
    children: ReactNode;
    isLoading?: boolean;
    theme?: 'hero' | 'blue' | 'red' | 'outlineRed' | 'simple';
    buttonProps?: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

    onClick?(): void;
}

export const Button = (props: HeroButtonInterface) => {

    const {
        isLoading = false,
        onClick,
        children,
        theme = 'blue',
        buttonProps,
    } = props;

    return (
        <button className={cn(styles.button, styles.buttonText, styles[theme])} onClick={onClick}
                disabled={isLoading} {...buttonProps}>
            {isLoading ? <LoadingSpinner size={25}/> : children}
        </button>
    )
}