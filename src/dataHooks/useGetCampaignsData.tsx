import axios from "axios";
import {useQuery} from "react-query";
import {campaignsDataAdapted} from "./dataAdapters/campaignsDataAdapted";

export const useGetCampaignsData = () => {

    const query = () => axios
        .get(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_GOOGLE_SHEETS_ID}/values/Campaigns?valueRenderOption=FORMATTED_VALUE&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        .then(response => campaignsDataAdapted(response.data));

    return useQuery('campaignsData', query, {
        keepPreviousData: true,
        refetchInterval: false,
        refetchOnMount: false,
    })
}