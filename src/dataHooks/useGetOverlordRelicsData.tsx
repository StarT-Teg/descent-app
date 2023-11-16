import axios from "axios";
import {useQuery} from "react-query";
import {overlordRelicsDataAdapter} from "./dataAdapters/overlordRelicsDataAdapter";

export const useGetOverlordRelicsData = () => {

    const query = () => axios
        .get(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_GOOGLE_SHEETS_ID}/values/Overlord Relics?valueRenderOption=FORMATTED_VALUE&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        .then(response => overlordRelicsDataAdapter(response.data));

    return useQuery('overlordRelicsData', query, {
        keepPreviousData: true,
        refetchInterval: false,
    })
}