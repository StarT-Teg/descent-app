import {useSetGameSave} from "../../dataHooks/useSetGameSave";
import {GameSaveReducerActionTypeEnum} from "../../context/game-save-context-reducer";
import {useGameSaveDispatchContext} from "../../context/game-save-context";
import {GameSavePicks} from "../../types/shared";


export const useSetSaveAndUpdate = () => {

    const uuid = localStorage.getItem('descent-save-game-uuid')!;

    const {mutate, isLoading} = useSetGameSave();
    const dispatch = useGameSaveDispatchContext();

    const setSaveAndUpdate = (gameData: Partial<GameSavePicks>) => {
        mutate({uuid, data: {...gameData}}, {
            onSuccess: (dataResponse => {
                dispatch({
                    payload: {...dataResponse.data},
                    actionType: GameSaveReducerActionTypeEnum.changeAllPicks
                })
            })
        })
    }

    return {setSaveAndUpdate, isLoading};
}