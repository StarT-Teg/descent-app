import axios from "axios";
import {useQuery} from "react-query";
import {AxiosRequestConfig} from "axios";
import {GameSavePicks} from "../shared";

export const useGetGameSave = (uuid: string) => {

    const config: AxiosRequestConfig<string> = {
        params: {uuid},
        headers: {"Content-Type": "text/plain"},
        validateStatus: (status) => status !== 302,
    }

    const query = (): Promise<GameSavePicks | string> => axios
        .get(`https://script.google.com/macros/s/AKfycbwrM4AbrDT_-rA55bg0TIXxAg_aI85kcJTXgqItL0twcBIT0K94I01Vicllcj2wnQBf9Q/exec`, config)
        .then(response => {
            try {
                JSON.parse(response.data);
            } catch (e) {
                return response.data;
            }
            return JSON.parse(response.data);
        });

    return useQuery('get-save-data', query, {
        enabled: false,
        refetchInterval: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
    })
}