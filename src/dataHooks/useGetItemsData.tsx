import axios from "axios";
import {useQuery} from "react-query";
import {itemsDataAdapter} from "./dataAdapters/itemsDataAdapter";

export const useGetItemsData = () => {

    const query = () => axios
        .get(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_GOOGLE_SHEETS_ID}/values/Items?valueRenderOption=FORMATTED_VALUE&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        .then(response => itemsDataAdapter(response.data));

    return useQuery('itemsData', query, {
        enabled: false,
        keepPreviousData: true,
        refetchInterval: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}