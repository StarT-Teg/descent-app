import uuid from "react-uuid";
import {useGameSaveContext} from "../../context/game-save-context";
import {useNavigate} from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import React, {useEffect, useState} from "react";
import {useSetGameSave} from "../../dataHooks/useSetGameSave";
import {Button} from "../shared";
import styles from './create-game-party.module.css'

export const Settings = () => {

    const localStorageSaveKey = 'descent-save-game-uuid';
    const [saveGameUuid, setSaveGameUuid] = useState<string | null>(localStorage.getItem(localStorageSaveKey));

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

    const handleSendInviteLink = () => {
        const url = `${process.env.REACT_APP_BASE_PATH}?inviteUuid=${saveGameUuid}`

        try {
            navigator.share({url}).then()
        } catch (e) {
            console.log('Share error:', e)
        }
    }

    useEffect(() => {
        setSaveGameUuid(localStorage.getItem(localStorageSaveKey))
    }, [localStorage])

    return (
        <div className={styles.root}>
            {isLoading ? <LoadingSpinner/> : (
                <>
                    <Button theme='outlineRed' onClick={handleCreateUuid}>
                        Create New Game
                    </Button>

                    {!!saveGameUuid && (
                        <Button theme='outlineRed' onClick={handleSendInviteLink}>
                            Send Invite Link
                        </Button>
                    )}

                    <Button theme='outlineRed' onClick={() => {
                    }}>
                        Select expansions
                    </Button>
                </>
            )}
        </div>
    )
}