import axios from "axios";
import {useQuery} from "react-query";
import {heroClassesDataAdapter} from "./dataAdapters/heroClassesDataAdapter";

export const useGetHeroClassesData = () => {

    const query = () => axios
        .get(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_GOOGLE_SHEETS_ID}/values/vote4Classes?valueRenderOption=FORMATTED_VALUE&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        .then(response => heroClassesDataAdapter(response.data));

    return useQuery('heroClassesData', query, {
        keepPreviousData: true,
        refetchInterval: false,
    })
}