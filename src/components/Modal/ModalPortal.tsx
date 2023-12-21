import React, {useState} from "react";
import {createPortal} from "react-dom";
import styles from './modal.module.css';

export interface ModalPropsInterface {
    openModalButtonComponent(onOpen: () => void): React.ReactElement;

    modalComponent(onClose: () => void): React.ReactElement;
}

export const ModalPortal = ({modalComponent, openModalButtonComponent}: ModalPropsInterface) => {

    const [showModal, setShowModal] = useState(false);
    return (
        <>
            {openModalButtonComponent(() => {
                setShowModal(true)
            })}
            {showModal && createPortal(
                <div className={styles.modalRoot}>
                    {modalComponent(() => {
                        setShowModal(false)
                    })}
                </div>,
                document.getElementById('modal-root') || document.body
            )}
        </>
    );
}