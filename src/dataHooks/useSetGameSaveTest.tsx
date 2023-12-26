import axios, {AxiosRequestConfig} from "axios";
import {GameSavePicks} from "../types/shared";
import {useEffect, useState} from "react";
import {GameSaveReducerActionTypeEnum} from "../context/game-save-context-reducer";
import {useGameSaveDispatchContext} from "../context/game-save-context";

export interface GameSaveParametersInterface {
    valueInputOption: 'INPUT_VALUE_OPTION_UNSPECIFIED' | 'RAW' | 'USER_ENTERED'; // RAW
    insertDataOption: 'OVERWRITE' | 'INSERT_ROWS';
    includeValuesInResponse: boolean; // false
    responseValueRenderOption: 'FORMATTED_VALUE' | 'UNFORMATTED_VALUE' | 'FORMULA';
}

export interface GameSaveDataInterface {
    uuid: string;
    data: Partial<GameSavePicks>;
}

export interface GameSaveOptionsInterface {
    debounceDelay?: number;
}

export function useSetGameSaveTest(options?: GameSaveOptionsInterface) {

    const dispatchPlayersPick = useGameSaveDispatchContext();

    const [accData, setAccData] = useState<GameSaveDataInterface>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [onSuccessCallback, setOnSuccessCallback] = useState<(() => void) | undefined>(undefined);

    const delay = options?.debounceDelay || 3000;

    const config: AxiosRequestConfig<string> | undefined = {
        headers: {
            "Content-Type": "text/plain",
        },
        maxRedirects: 2,
        validateStatus: (status) => status !== 302,
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if (accData !== undefined) {
                setIsLoading(true);
                axios
                    .post(`https://script.google.com/macros/s/AKfycbwrM4AbrDT_-rA55bg0TIXxAg_aI85kcJTXgqItL0twcBIT0K94I01Vicllcj2wnQBf9Q/exec`, JSON.stringify(accData), config)
                    .then(response => {

                            setIsLoading(false);
                            setAccData(undefined);

                            if (!!response.data) {
                                dispatchPlayersPick({
                                    actionType: GameSaveReducerActionTypeEnum.changeAllPicks,
                                    payload: response.data,
                                })

                                onSuccessCallback?.();
                            }
                        },
                        (response) => {
                            setIsLoading(false);
                            alert(response?.data)
                        });
            }
        }, delay)

        return () => {
            clearTimeout(timer)
        }
    }, [accData])

    function setGameSave(uuid: string | null, gameData: Partial<GameSavePicks>, onSuccess?: () => void) {
        if (!!uuid) {
            setOnSuccessCallback(onSuccess);
            setAccData(prevState => ({uuid, data: {...prevState?.data, ...gameData}}));
        }
    }

    return {
        isLoading,
        setGameSave,
    }
}
