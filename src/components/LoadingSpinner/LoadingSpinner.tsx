import React from "react";
import styles from "./loading-spinner.module.css";

export interface LoadingSpinnerPropsInterface {
    size?: number
}

const LoadingSpinner = (props: LoadingSpinnerPropsInterface) => {
    const {size = 140} = props;

    return (
        <div className={styles.loadingSpinner}>
            <div className={styles.spinner} style={{width: `${size}px`, height: `${size}px`}}></div>
        </div>
    );
};

export default LoadingSpinner;