import axios from "axios";
import {useQuery} from "react-query";
import {monstersDataAdapter} from "./dataAdapters/monstersDataAdapter";

export const useGetMonstersData = () => {

    const query = () => axios
        .get(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_GOOGLE_SHEETS_ID}/values/monsters?valueRenderOption=FORMATTED_VALUE&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        .then(response => monstersDataAdapter(response.data));

    return useQuery('monstersData', query, {
        enabled: false,
        keepPreviousData: true,
        refetchInterval: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}