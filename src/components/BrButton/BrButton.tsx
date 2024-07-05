import styles from './br-button.module.css'

export const BrButton = ({br}: { br: string | number | undefined }) => (
    <div className={styles.br}>{br}</div>
)