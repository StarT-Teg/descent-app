import uuid from "react-uuid";
import {INITIAL_GAME_PICKS, useGameSaveDispatchContext} from "../../context/game-save-context";
import {useNavigate} from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import React, {useEffect, useState} from "react";
import {useSetGameSave} from "../../dataHooks/useSetGameSave";
import {Button} from "../shared";
import styles from './create-game-party.module.css'
import {GameSaveReducerActionTypeEnum} from "../../context/game-save-context-reducer";

export const Settings = () => {

    const localStorageSaveKey = 'descent-save-game-uuid';
    const [saveGameUuid, setSaveGameUuid] = useState<string | null>(localStorage.getItem(localStorageSaveKey));

    const dispatchPlayersPick = useGameSaveDispatchContext();

    const {mutate, isLoading} = useSetGameSave()

    const navigate = useNavigate();

    const handleCreateUuid = () => {
        const newUuid = uuid();
        localStorage.setItem(localStorageSaveKey, newUuid);

        mutate({uuid: newUuid, data: {...INITIAL_GAME_PICKS}}, {
            onSuccess: (response) => {

                const saveGameData = response.data;

                if (typeof saveGameData !== 'string') {
                    dispatchPlayersPick({
                        actionType: GameSaveReducerActionTypeEnum.changeAllPicks,
                        payload: saveGameData,
                    })
                    navigate('/players');
                } else {
                    alert(saveGameData)
                    navigate('/settings');
                }
                navigate('/players')
            }
        })
    }

    const handleSendInviteLink = () => {
        const url = `${process.env.REACT_APP_BASE_PATH}?inviteUuid=${saveGameUuid}`

        try {
            // navigator.share({url}).then()
            navigator.clipboard.writeText(url).then()
        } catch (e) {
            console.log('error:', e)
        }
    }

    const handleExpansionsSettings = () => {
        navigate('/expansions')
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
                            Copy Invite Link
                        </Button>
                    )}

                    <Button theme='outlineRed' onClick={handleExpansionsSettings}>
                        Select expansions
                    </Button>

                    {!!saveGameUuid && (
                        <Button theme={'red'} onClick={() => {
                            navigate('/players')
                        }}>Back To Game</Button>
                    )}
                </>
            )}
        </div>
    )
}