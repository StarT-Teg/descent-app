import React, {SVGProps, useRef, useState} from "react";
import {ModalPortal} from "../Modal/ModalPortal";
import styles from "./comment-button.module.css";
import {Button} from "../shared";
import classNames from "classnames";
import {ControlsNameEnum, useGetControlTranslation} from "../../helpers/translationHelpers";

const CommentIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        style={{
            width: "18px",
            height: "18px",
            verticalAlign: "middle",
            fill: "currentColor",
            overflow: "hidden",
        }}
        viewBox="0 0 1024 1024"
    >
        <path
            d="M511.402 962.766c-29.68 0-57.568-11.561-78.549-32.543L327.52 824.889H142.769C98.238 824.889 62 788.65 62 744.119V144.12c0-44.531 36.238-80.769 80.769-80.769H881.23c44.531 0 80.77 36.238 80.77 80.769v599.999c0 44.531-36.238 80.77-80.77 80.77H695.285L589.952 930.223c-20.981 20.982-48.869 32.543-78.55 32.543zM142.769 132.582c-6.366 0-11.538 5.172-11.538 11.538v599.999c0 6.367 5.172 11.539 11.538 11.539h217.304l13.736 17.623 107.993 107.994c15.82 15.797 43.382 15.797 59.202 0l111.34-112.32 10.389-13.297H881.23c6.367 0 11.539-5.172 11.539-11.539V144.12c0-6.366-5.172-11.538-11.539-11.538H142.769z"/>
        <path
            d="M696.615 378.45H304.308c-19.122 0-34.615-15.494-34.615-34.615 0-19.122 15.494-34.616 34.615-34.616h392.308c19.122 0 34.615 15.494 34.615 34.616-.001 19.122-15.494 34.615-34.616 34.615zM558.154 571.043H304.308c-19.122 0-34.615-15.494-34.615-34.615s15.494-34.615 34.615-34.615h253.847c19.121 0 34.615 15.494 34.615 34.615s-15.495 34.615-34.616 34.615z"/>
    </svg>
)

export interface CommentButtonPropsInterface {
    comment?: string;

    onCommentSave?(comment: string): void;

    disabled?: boolean
}

export const CommentButton = ({comment: initialComment = '', onCommentSave, disabled}: CommentButtonPropsInterface) => {

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const {getControlTranslation} = useGetControlTranslation();

    const [comment, setComment] = useState<string>(initialComment)

    return (
        <ModalPortal
            modalComponent={(onClose) => (
                <div className={styles.root}>
                    <fieldset>
                        <legend>{'Comment'}</legend>
                        <textarea
                            ref={textareaRef}
                            value={comment}
                            onChange={(e) => {
                                if (!!textareaRef.current) {
                                    textareaRef.current.style.height = "auto";
                                    textareaRef.current.style.height = `${e.target.scrollHeight + 10}px`;
                                }
                                setComment(e.target?.value || '')
                            }}
                            className={styles.textarea}
                        />
                    </fieldset>

                    <Button theme={'simple'} onClick={() => {
                        onCommentSave?.(comment);
                        onClose();
                    }}>{getControlTranslation(ControlsNameEnum.save)}</Button>
                </div>
            )}
            openModalButtonComponent={(onOpen) => (
                <div
                    className={classNames(styles.translateIcon, {[styles.translateIconDisabled]: disabled})}
                    onClick={onOpen}>
                    <CommentIcon/>
                </div>)}
        />
    )
}