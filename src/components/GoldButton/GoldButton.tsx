import styles from './gold-button.module.css'
import React from "react";

export const GoldButton = (props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {

    return (
        <input type={'number'} className={styles.root} {...props}/>
    )
}