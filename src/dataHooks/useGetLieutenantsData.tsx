import axios from "axios";
import {useQuery} from "react-query";
import {lieutenantsDataAdapter} from "./dataAdapters/lieutenantsDataAdapter";

export const useGetLieutenantsData = () => {

    const query = () => axios
        .get(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_GOOGLE_SHEETS_ID}/values/Lieutenants?valueRenderOption=FORMATTED_VALUE&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        .then(response => {
            return lieutenantsDataAdapter(response.data)
        });

    return useQuery('lieutenantsData', query, {
        enabled: false,
        keepPreviousData: true,
        refetchInterval: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}