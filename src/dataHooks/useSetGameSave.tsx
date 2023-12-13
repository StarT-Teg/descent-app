import axios from "axios";
import {useMutation} from "react-query";

export interface GameSaveParametersInterface {
    valueInputOption: 'INPUT_VALUE_OPTION_UNSPECIFIED' | 'RAW' | 'USER_ENTERED'; // RAW
    insertDataOption: 'OVERWRITE' | 'INSERT_ROWS';
    includeValuesInResponse: boolean; // false
    responseValueRenderOption: 'FORMATTED_VALUE' | 'UNFORMATTED_VALUE' | 'FORMULA';
}

export interface GameSaveDataInterface {
    uuid: string;
    data: any;
}
//https://script.google.com/macros/s/AKfycbzDbRbBMrekYI5yPqysuuVln83oXgPwhVncFY8VTvCjxPLa7oLNwiS8S0cDim_g7iWiqw/exec
export const useSetGameSave = () => {

    const query = (gameData: GameSaveDataInterface) => axios
        .post(`https://script.google.com/macros/s/AKfycbzDbRbBMrekYI5yPqysuuVln83oXgPwhVncFY8VTvCjxPLa7oLNwiS8S0cDim_g7iWiqw/exec`, JSON.stringify(gameData), {})
        .then(response => response);

    return useMutation('SaveGame', query, {})
}
