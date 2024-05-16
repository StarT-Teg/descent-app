import React, {SVGProps, useCallback, useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import styles from './modal.module.css';
import {JSX} from "react/jsx-runtime";

export interface ModalPropsInterface {
    openModalButtonComponent(onOpen: () => void): React.ReactElement;

    modalComponent(onClose: () => void): React.ReactElement;
}

const CloseIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={50}
        height={50}
        viewBox="0 0 128 128"
        {...props}
    >
        <path
            d="M64 6c-15.5 0-30.1 6-41 17C12 33.9 6 48.5 6 64s6 30.1 17 41c11 11 25.5 17 41 17s30.1-6 41-17c11-11 17-25.5 17-41s-6-30.1-17-41C94.1 12 79.5 6 64 6zm36.8 94.8C90.9 110.6 77.9 116 64 116s-26.9-5.4-36.8-15.2S12 77.9 12 64s5.4-26.9 15.2-36.8S50.1 12 64 12s26.9 5.4 36.8 15.2S116 50.1 116 64s-5.4 26.9-15.2 36.8z"/>
        <path
            d="M79.6 48.4c-1.2-1.2-3.1-1.2-4.2 0L64 59.8 52.7 48.4c-1.2-1.2-3.1-1.2-4.2 0-1.2 1.2-1.2 3.1 0 4.2L59.8 64 48.4 75.3c-1.2 1.2-1.2 3.1 0 4.2.6.6 1.4.9 2.1.9s1.5-.3 2.1-.9L64 68.2l11.3 11.3c.6.6 1.4.9 2.1.9s1.5-.3 2.1-.9c1.2-1.2 1.2-3.1 0-4.2L68.2 64l11.3-11.3c1.2-1.2 1.2-3.1.1-4.3z"/>
    </svg>
)

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
                <div className={styles.modalRoot} ref={modalRef} onClick={() => {
                    onClose();
                }}>
                    <CloseIcon onClick={onClose} className={styles.closeIcon}/>
                    <div className={styles.modalContent} onClick={e => {
                        e.stopPropagation();
                        e.preventDefault()
                    }}>
                        {modalComponent(onClose)}
                    </div>
                </div>,
                document.getElementById('modal-root') || document.body
            )}
        </div>
    );
}