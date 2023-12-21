import styles from './save-before-leave-modal.module.css'

export interface SaveBeforeLeaveModalProps {
    onSaveButtonClick?(): void;

    onLeaveButtonCLick?(): void;
}

export const SaveBeforeLeaveModal = ({onSaveButtonClick, onLeaveButtonCLick}: SaveBeforeLeaveModalProps) => {

    return (
        <div className={styles.root}>
            <h2>Save changes?</h2>

            <div className={styles.buttonColumns}>
                <button className={'input'} onClick={onSaveButtonClick}>Save</button>
                <button className={'input'} onClick={onLeaveButtonCLick}>Leave</button>
            </div>
        </div>
    )
}