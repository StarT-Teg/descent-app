import uuid from "react-uuid";
import {useGameSaveContext} from "../../context/game-save-context";
import {useNavigate} from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import React from "react";
import {useSetGameSave} from "../../dataHooks/useSetGameSave";
import {Button} from "../shared";
import styles from './create-game-party.module.css'

export const CreateGameParty = () => {

    const localStorageSaveKey = 'descent-save-game-uuid';

    const gamePicks = useGameSaveContext()

    const {mutate, isLoading} = useSetGameSave()

    const navigate = useNavigate();

    const handleCreateUuid = () => {
        const newUuid = uuid();
        localStorage.setItem(localStorageSaveKey, newUuid);

        mutate({uuid: newUuid, data: {...gamePicks}}, {
            onSuccess: () => {
                navigate('/players')
            }
        })
    }

    return (
        <div className={styles.root}>
            {isLoading ? <LoadingSpinner/> : (
                <Button theme='outlineRed' onClick={handleCreateUuid}>
                    Create Game Party
                </Button>
            )}
        </div>
    )
}