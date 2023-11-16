import axios from "axios";
import {useQuery} from "react-query";
import {heroesRawDataAdapter} from "./dataAdapters/heroesRawDataAdapter";

export const useGetHeroesData = () => {

    const query = () => axios
        .get(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_GOOGLE_SHEETS_ID}/values/vote4Heroes?valueRenderOption=FORMATTED_VALUE&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        .then(response => heroesRawDataAdapter(response.data, 14));

    return useQuery('heroesData', query, {
        keepPreviousData: true,
        refetchInterval: false,
    })
}