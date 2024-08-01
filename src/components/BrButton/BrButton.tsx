import styles from './br-button.module.css'

export interface BrButtonPropsInterface {
    br: string | number | undefined
}

export const BrButton = ({br}: BrButtonPropsInterface) => (
    <div className={styles.br}>{br}</div>
)