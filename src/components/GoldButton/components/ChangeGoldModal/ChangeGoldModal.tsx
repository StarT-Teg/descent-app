import React from "react";
import styles from './change-gold-modal.module.css'

export interface ChangeGoldModalPropsInterface {
    onAddGold?(goldAmount: number): void;

    onSaveAndClose?(): void;

    onCloseModal?(): void;
}

const SimpleAddButton = (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {

    const {children, ...otherProps} = props;

    return (
        <button className={styles.button} {...otherProps}>
            {children}
        </button>
    )
}

const subtractGoldAmountArray = [-35, -70, -105, -140]
const addGoldAmountArray = [25, 50, 75, 100]


export const ChangeGoldModal = (props: ChangeGoldModalPropsInterface) => {
    const {onCloseModal, onAddGold, onSaveAndClose} = props;

    return (
        <div className={styles.root}>
            <div className={styles.column}>
                {subtractGoldAmountArray.map(gold => <SimpleAddButton onClick={() => {
                    onAddGold?.(gold)
                }}>{gold}</SimpleAddButton>)}
            </div>

            <div className={styles.column}>
                {addGoldAmountArray.map(gold => <SimpleAddButton onClick={() => {
                    onAddGold?.(gold)
                }}>+{gold}</SimpleAddButton>)}
            </div>

            <SimpleAddButton onClick={onCloseModal}>
                Отменить
            </SimpleAddButton>

            <SimpleAddButton onClick={onSaveAndClose}>
                Сохранить и выйти
            </SimpleAddButton>
        </div>
    )
}