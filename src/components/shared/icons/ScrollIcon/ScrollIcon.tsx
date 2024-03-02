import React from "react";
import styles from './scroll-icon.module.css'

export const ScrollIcon = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => (
    <div className={styles.root}>
        <div className={styles.img} {...props} />

        <div className={styles.background}/>
    </div>
)
