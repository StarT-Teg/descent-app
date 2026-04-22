import styles from './gold-button.module.css'
import React, {useEffect, useState} from "react";
import {GameSaveReducerActionTypeEnum} from "../../context/game-save-context-reducer";
import {useGameSaveContext, useGameSaveDispatchContext} from "../../context/game-save-context";
import {useSetGameSave} from "../../dataHooks/useSetGameSave";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {LOCAL_STORAGE_SAVE_KEY} from "../../shared/global-constants";
import {ModalPortal} from "../Modal/ModalPortal";
import {ChangeGoldModal} from "./components/ChangeGoldModal/ChangeGoldModal";

export const GoldButton = () => {

    const {gold = 0} = useGameSaveContext()
    const dispatch = useGameSaveDispatchContext();

    const uuid = localStorage.getItem(LOCAL_STORAGE_SAVE_KEY)!;
    const {mutate, isLoading} = useSetGameSave()

    const [localGoldState, setLocalGoldState] = useState<number>(gold)

    const handleGoldChange = (value: number) => {
        setLocalGoldState(prevState => prevState + value)
    }

    const onSaveAndDispatch = () => {
        mutate({uuid: uuid, data: {gold: localGoldState - gold}}, {
            onSuccess: (response) => {
                dispatch({
                    payload: response.data?.gold,
                    actionType: GameSaveReducerActionTypeEnum.changeGold
                })
                setLocalGoldState(response.data?.gold);
            }
        })
    }

    useEffect(() => {
        if (gold !== localGoldState) {
            setLocalGoldState(gold);
        }
    }, [gold])

    return (
        <ModalPortal
            openModalButtonComponent={(onOpen) => (
                <div className={styles.root} onClick={onOpen}>
                    {isLoading ? <LoadingSpinner size={25}/> :
                        <p className={styles.goldNumber}>{localGoldState}</p>}
                </div>
            )}

            modalComponent={(onModalClose) => (
                <ChangeGoldModal onCloseModal={() => {
                    setLocalGoldState(gold)
                    onModalClose()
                }} onAddGold={handleGoldChange}
                                 onSaveAndClose={() => {
                                     onSaveAndDispatch();
                                     onModalClose();
                                 }
                                 }/>
            )}
        />
    )
}
