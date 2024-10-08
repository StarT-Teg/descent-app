import React, {ReactNode} from "react";
import styles from './input-line.module.css'
import {
    SuggestTranslationButton,
    SuggestTranslationButtonPropsInterface
} from "../../SuggestTranslationButton/SuggestTranslationButton";
import {ModalPortal} from "../../Modal/ModalPortal";
import {MonsterCard, MonsterCardPropsInterface} from "../../OverlordBench/components/MonsterCard/MonsterCard";
import {BrButton, BrButtonPropsInterface} from "../../BrButton/BrButton";
import classNames from "classnames";
import {CommentButton, CommentButtonPropsInterface} from "../../CommentButton/CommentButton";

export interface InputLinePropsInterface {
    inputProps: { inputValue: ReactNode | string, onClick?(): void };
    checkboxProps?: { checked: boolean, quantity?: number, onChange?(): void } [];
    suggestTranslationProps?: SuggestTranslationButtonPropsInterface;
    monsterCardProps?: MonsterCardPropsInterface;
    brButtonProps?: BrButtonPropsInterface;
    commentButtonProps?: CommentButtonPropsInterface;
    extraStyles?: Record<string, string>;
}

export const InputLine = ({
                              inputProps,
                              checkboxProps,
                              suggestTranslationProps,
                              commentButtonProps,
                              monsterCardProps,
                              brButtonProps,
                              extraStyles,
                          }: InputLinePropsInterface) => {

    const {inputValue, onClick} = inputProps;

    return <div className={styles.listRow}>
        {!!checkboxProps && (
            <div className={styles.checkbox}>
                {checkboxProps.map((checkboxProps, index) => (
                    <input type="checkbox"
                           onChange={checkboxProps.onChange}
                           checked={checkboxProps.checked}
                           key={`${inputValue}-checkbox-${index}`}
                    />
                ))}
            </div>
        )}

        <div
            onClick={onClick}
            className={classNames(styles.inputWrapper, extraStyles?.inputWrapper)}>
            <span className={classNames(styles.input, extraStyles?.input)}>{inputValue}</span>
        </div>

        {!!monsterCardProps && (
            <ModalPortal modalComponent={
                () => (
                    <MonsterCard {...monsterCardProps}/>
                )
            } openModalButtonComponent={
                (onOpen) => (
                    <div className={styles.monsterPreviewIcon} onClick={onOpen}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="currentColor"
                            className="bi bi-eye"
                        >
                            <path
                                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                            <path
                                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                        </svg>
                    </div>
                )
            }/>
        )}

        {!!suggestTranslationProps && <SuggestTranslationButton {...suggestTranslationProps}/>}
        {!!brButtonProps && <BrButton {...brButtonProps}/>}
        {!!commentButtonProps && <CommentButton {...commentButtonProps} />}

    </div>
}