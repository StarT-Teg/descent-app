import axios from "axios";
import {useQuery} from "react-query";

export const useGetGameSave = (uuid: string) => {

    const params = {
        uuid,
    }

    const query = () => axios
        .get(`https://script.google.com/macros/s/AKfycbwrM4AbrDT_-rA55bg0TIXxAg_aI85kcJTXgqItL0twcBIT0K94I01Vicllcj2wnQBf9Q/exec`, {
            params,
            headers: {"Content-Type": "text/plain"}
        })
        .then(response => {
            return JSON.parse(response.data)
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