import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useGetGameSave} from "../../dataHooks";
import {useGameSaveDispatchContext} from "../../context/game-save-context";
import {GameSaveReducerActionTypeEnum} from "../../context/game-save-context-reducer";
import {useQuery} from "./useQuery";
import {LOCAL_STORAGE_SAVE_KEY} from "../../shared/global-constants";

export const useInitSaveGame = () => {
    const [saveGameUuid, setSaveGameUuid] = useState<string | null>(
        localStorage.getItem(LOCAL_STORAGE_SAVE_KEY)
    );

    const navigate = useNavigate();
    const query = useQuery();

    const {refetch: saveGameDataRefetch, isLoading: saveIsLoading} = useGetGameSave(saveGameUuid || '');
    const dispatchPlayersPick = useGameSaveDispatchContext();

    const setSaveData = (uuid: string) => {
        setSaveGameUuid(uuid);
        localStorage.setItem(LOCAL_STORAGE_SAVE_KEY, uuid);
    };

    useEffect(() => {
        if (!saveGameUuid) {
            return;
        }

        saveGameDataRefetch().then(response => {
            const saveGameData = response.data;

            if (saveGameData && typeof saveGameData !== 'string') {
                dispatchPlayersPick({
                    actionType: GameSaveReducerActionTypeEnum.changeAllPicks,
                    payload: saveGameData,
                });
                navigate('/players');
            } else {
                navigate('/settings');
            }
        });
    }, [saveGameUuid]);

    useEffect(() => {
        const inviteUuidQueryParam = query.get('inviteUuid');

        if (inviteUuidQueryParam) {
            setSaveData(inviteUuidQueryParam);
            return;
        }

        const uuid = localStorage.getItem(LOCAL_STORAGE_SAVE_KEY);

        if (uuid) {
            setSaveData(uuid);
        } else {
            navigate('/settings');
        }
    }, []);

    return {saveIsLoading};
};
