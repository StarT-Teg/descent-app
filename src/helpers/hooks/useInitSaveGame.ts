import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useGetGameSave} from "../../dataHooks";
import {useGameSaveDispatchContext} from "../../context/game-save-context";
import {GameSaveReducerActionTypeEnum} from "../../context/game-save-context-reducer";
import {LOCAL_STORAGE_SAVE_KEY} from "../../shared/global-constants";
import {useInviteUuid} from "./useInviteUuid";

export const useInitSaveGame = (gameDataIsLoading: boolean) => {
    // Detect ?inviteUuid= on any route, persist to localStorage and strip from URL.
    const inviteUuid = useInviteUuid();

    // Resolve the UUID to use: invite param takes priority over localStorage.
    const resolvedUuid = inviteUuid ?? localStorage.getItem(LOCAL_STORAGE_SAVE_KEY);

    const [saveGameUuid, setSaveGameUuid] = useState<string | null>(resolvedUuid);

    const navigate = useNavigate();

    const {refetch: saveGameDataRefetch, isLoading: saveIsLoading} = useGetGameSave(saveGameUuid || '');
    const dispatchPlayersPick = useGameSaveDispatchContext();

    // When a new inviteUuid arrives (user opened an invite link while the app is
    // already running on a different route), update the active UUID.
    useEffect(() => {
        if (inviteUuid && inviteUuid !== saveGameUuid) {
            setSaveGameUuid(inviteUuid);
        }
    }, [inviteUuid]);

    // Fetch save data whenever the active UUID changes.
    // Wait for game data to finish loading before navigating to avoid
    // triggering a re-render that causes useGetData to fire a second request.
    useEffect(() => {
        if (gameDataIsLoading) {
            return;
        }

        if (!saveGameUuid) {
            navigate('/settings');
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
    }, [saveGameUuid, gameDataIsLoading]);

    return {saveIsLoading};
};
