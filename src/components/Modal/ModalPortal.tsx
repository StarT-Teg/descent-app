import React, {useCallback, useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import styles from './modal.module.css';

export interface ModalPropsInterface {
    openModalButtonComponent(onOpen: () => void): React.ReactElement;

    modalComponent(onClose: () => void): React.ReactElement;
}

export const ModalPortal = ({modalComponent, openModalButtonComponent}: ModalPropsInterface) => {

    const modalRef = useRef<any>(null)
    const [showModal, setShowModal] = useState(false);

    const onOpen = () => {
        setShowModal(true)
    }

    const onClose = () => {
        setShowModal(false)
    }

    const handleClickOutside = useCallback(
        (event: any) => {
            if (!(!!modalRef?.current && modalRef.current.contains(event.target))) {
                return onClose();
            }
        }, [modalRef]
    )

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [modalRef])

    return (
        <div>
            {openModalButtonComponent(onOpen)}
            {showModal && createPortal(
                <div className={styles.modalRoot} ref={modalRef}>
                    {modalComponent(onClose)}
                </div>,
                document.getElementById('modal-root') || document.body
            )}
        </div>
    );
}