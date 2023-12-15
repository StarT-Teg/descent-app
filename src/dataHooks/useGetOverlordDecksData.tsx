import axios from "axios";
import {useQuery} from "react-query";
import {overlordDecksDataAdapted} from "./dataAdapters/overlordDecksDataAdapted";

export const useGetOverlordDecksData = () => {

    const query = () => axios
        .get(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_GOOGLE_SHEETS_ID}/values/Overlord Deck?valueRenderOption=FORMATTED_VALUE&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        .then(response => overlordDecksDataAdapted(response.data));

    return useQuery('overlordDecksData', query, {
        enabled: false,
        keepPreviousData: true,
        refetchInterval: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}