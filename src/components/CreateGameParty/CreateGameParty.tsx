import uuid from "react-uuid";
import {useSetGameSave} from "../../dataHooks/useSetGameSave";
import {useGameSaveContext} from "../../context/game-save-context";
import {useNavigate} from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import React, {useLayoutEffect} from "react";


export const CreateGameParty = () => {

    const navigate = useNavigate();
    const {mutate, isLoading} = useSetGameSave();
    const gamePicks = useGameSaveContext()

    const handleCreateUuid = () => {
        const newSaveUuid = uuid();

        mutate({uuid: newSaveUuid, data: {...gamePicks}}, {
            onSuccess: () => {
                localStorage.setItem('descent-save-game-uuid', newSaveUuid);
                navigate(`/players`)
            }
        });
    }

    useLayoutEffect(() => {
        const isUuidAvailable = !!localStorage.getItem(String(process.env.Local_Storage_Save_Key));
        if (isUuidAvailable) {
            navigate(`/players`)
        }

    }, [localStorage])

    if (isLoading) {
        return <LoadingSpinner/>
    }

    return (
        <div>
            <button onClick={handleCreateUuid}>Create Game Party</button>
        </div>
    )
}