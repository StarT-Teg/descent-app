import axios from "axios";
import {useMutation} from "react-query";
import {GameSavePicks} from "../types/shared";

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

export const useSetGameSave = () => {

    const headers = {
        "Content-Type": "text/plain",
    }

    const query = (gameData: GameSaveDataInterface) => axios
        .post(`https://script.google.com/macros/s/AKfycbwrM4AbrDT_-rA55bg0TIXxAg_aI85kcJTXgqItL0twcBIT0K94I01Vicllcj2wnQBf9Q/exec`, JSON.stringify(gameData), {headers})
        .then(response => response);

    return useMutation('SaveGame', query)
}
