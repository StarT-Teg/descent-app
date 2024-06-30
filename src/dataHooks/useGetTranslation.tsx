import axios from "axios";
import {useQuery, UseQueryResult} from "react-query";
import {ExcelDataRaw} from "../shared";

export const useGetTranslation = (): UseQueryResult<ExcelDataRaw> => {

    const headers = {
        "Content-Type": "text/plain",
    }

    const query = () => axios
        .get(`https://script.google.com/macros/s/AKfycbxnlwe3-rDDjlfPDhUyeVNijBnF2Hj_5pa56s8JgVXbGmAZHPtSddVXWCRHspfwF_KZhw/exec`, {headers})
        .then((response) => ({values: response.data}));

    return useQuery(['get-translation-request'], query, {
        enabled: true,
        keepPreviousData: true,
        refetchInterval: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}
