import styles from './abilities-icon.module.css';

export enum ActionTypeToSymbolEnum {
    straight = 'b',
    wisdom = 'c',
    knowledge = 'd',
    fatigue = 'f',
    surge = 'g',
    doubleSurge = 'gg',
    tripleSurge = 'ggg',
    hearth = 'h',
    speed = 'j',
    action = 'm',
}

export const AbilitiesIcon = ({iconType}: { iconType: ActionTypeToSymbolEnum }) => (
    <span className={styles.root}>{iconType}:</span>
)