import React from "react";
import styles from './change-gold-modal.module.css'
import {Button} from "../../../shared";
import {useGetControlTranslation} from "../../../../helpers/translationHelpers";

export interface ChangeGoldModalPropsInterface {
    onAddGold?(goldAmount: number): void;

    onSaveAndClose?(): void;

    onCloseModal?(): void;
}

const SimpleAddButton = (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {

    const {children, ...otherProps} = props;

    return (
        <Button theme={'simple'} buttonProps={otherProps}>
            {children}
        </Button>
    )
}

const subtractGoldAmountArray = [-35, -70, -105, -140]
const addGoldAmountArray = [25, 50, 75, 100]


export const ChangeGoldModal = (props: ChangeGoldModalPropsInterface) => {
    const {onCloseModal, onAddGold, onSaveAndClose} = props;
    const {getControlTranslation} = useGetControlTranslation()

    return (
        <div className={styles.root}>
            <div className={styles.column}>
                {subtractGoldAmountArray.map(gold => <SimpleAddButton key={`subtract-button-gold-${gold}`} onClick={() => {
                    onAddGold?.(gold)
                }}>{gold}</SimpleAddButton>)}
            </div>

            <div className={styles.column}>
                {addGoldAmountArray.map(gold => <SimpleAddButton key={`add-button-gold-${gold}`} onClick={() => {
                    onAddGold?.(gold)
                }}>+{gold}</SimpleAddButton>)}
            </div>

            <SimpleAddButton onClick={onCloseModal}>
                {getControlTranslation('Cancel')}
            </SimpleAddButton>

            <SimpleAddButton onClick={onSaveAndClose}>
                {getControlTranslation('Save')}
            </SimpleAddButton>
        </div>
    )
}