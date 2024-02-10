import axios from "axios";
import {campaignsDataAdapted} from "./dataAdapters/campaignsDataAdapted";
import {useQuery, UseQueryResult} from "react-query";
import {GameDataInterface} from "../types/shared";
import {heroesRawDataAdapter} from "./dataAdapters/heroesRawDataAdapter";
import {heroClassesDataAdapter} from "./dataAdapters/heroClassesDataAdapter";
import {itemsDataAdapter} from "./dataAdapters/itemsDataAdapter";
import {lieutenantsDataAdapter} from "./dataAdapters/lieutenantsDataAdapter";
import {monstersDataAdapter} from "./dataAdapters/monstersDataAdapter";
import {overlordDecksDataAdapted} from "./dataAdapters/overlordDecksDataAdapted";
import {overlordRelicsDataAdapter} from "./dataAdapters/overlordRelicsDataAdapter";
import {familiarsDataAdapted} from "./dataAdapters/familiarsDataAdapted";


export const useGetData = (): UseQueryResult<GameDataInterface> => {

    const ranges = ['Campaigns', 'vote4Classes', 'vote4Heroes', 'Items', 'Lieutenants', 'monsters', 'Overlord Deck', 'Overlord Relics', 'Familiars'].join('&ranges=');

    const params = {
        valueRenderOption: 'FORMATTED_VALUE',
        majorDimension: 'ROWS',
        key: process.env.REACT_APP_GOOGLE_API_KEY,
    }

    const query = () => axios
        .get(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_GOOGLE_SHEETS_ID}/values:batchGet?&ranges=${ranges}`, {params})
        .then(response => (
            {
                campaignData: campaignsDataAdapted(response.data?.valueRanges?.[0]),
                heroClassesData: heroClassesDataAdapter(response.data?.valueRanges?.[1]),
                heroesData: heroesRawDataAdapter(response.data?.valueRanges?.[2]),
                itemsData: itemsDataAdapter(response.data?.valueRanges?.[3]),
                lieutenantsData: lieutenantsDataAdapter(response.data?.valueRanges?.[4]),
                monstersData: monstersDataAdapter(response.data?.valueRanges?.[5]),
                overlordDecksData: overlordDecksDataAdapted(response.data?.valueRanges?.[6]),
                relicsData: overlordRelicsDataAdapter(response.data?.valueRanges?.[7]),
                familiars: familiarsDataAdapted(response.data?.valueRanges?.[8]),
            }
        ));

    return useQuery('get-data-request', query, {
        enabled: false,
        keepPreviousData: true,
        refetchInterval: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}