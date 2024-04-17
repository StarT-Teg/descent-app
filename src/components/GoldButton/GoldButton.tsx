import styles from './gold-button.module.css'
import React, {useEffect, useState} from "react";
import {GameSaveReducerActionTypeEnum} from "../../context/game-save-context-reducer";
import {useGameSaveContext, useGameSaveDispatchContext} from "../../context/game-save-context";
import {useSetGameSave} from "../../dataHooks/useSetGameSave";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {ModalPortal} from "../Modal/ModalPortal";
import {ChangeGoldModal} from "./components/ChangeGoldModal/ChangeGoldModal";

export const GoldButton = () => {

    const {gold = 0} = useGameSaveContext()
    const dispatch = useGameSaveDispatchContext();

    const uuid = localStorage.getItem('descent-save-game-uuid')!;
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

    // useDebounce({
    //     debounceData: localGoldState, callback: () => {
    //         if (localGoldState.length > 0) {
    //             mutate({uuid: uuid, data: {gold: goldSum}}, {
    //                 onSuccess: (response) => {
    //                     handleGoldChange(response.data?.gold)
    //                     setLocalGoldState([])
    //                 }
    //             })
    //         }
    //     }
    // })

    return (
        <ModalPortal
            openModalButtonComponent={(onOpen) => (
                <div className={styles.root} onClick={onOpen}>
                    {isLoading ? <LoadingSpinner size={25}/> :
                        <p className={styles.goldNumber}>{localGoldState}</p>}
                </div>
            )}

            modalComponent={(onClose) => (
                <ChangeGoldModal onCloseModal={onClose} onAddGold={handleGoldChange}
                                 onSaveAndClose={() => {
                                     onSaveAndDispatch();
                                     onClose();
                                 }
                                 }/>
            )}
        />
    )
}