import axios from "axios";
import {useQuery, UseQueryResult} from "react-query";
import {GameDataInterface} from "../shared";

export const useGetData = (): UseQueryResult<GameDataInterface> => {
    const ranges = ['Campaigns', 'vote4Classes', 'vote4Heroes', 'Items', 'Lieutenants', 'monsters', 'Overlord Deck', 'Overlord Relics', 'Familiars', 'Translation!A:B', 'vote4TRAITS!A:C', 'vote4SURGE!A:C', 'vote4ACTIONS!A:C', 'Agents'].join('&ranges=');

    const params = {
        valueRenderOption: 'FORMATTED_VALUE',
        majorDimension: 'ROWS',
        key: process.env.REACT_APP_GOOGLE_API_KEY,
    }

    const query = () => axios
        .get(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_GOOGLE_SHEETS_ID}/values:batchGet?&ranges=${ranges}`, {params})
        .then((response) => {
            return (
                {
                    campaignData: response.data?.valueRanges?.[0],
                    heroClassesData: response.data?.valueRanges?.[1],
                    heroesData: response.data?.valueRanges?.[2],
                    itemsData: response.data?.valueRanges?.[3],
                    lieutenantsData: response.data?.valueRanges?.[4],
                    monstersData: response.data?.valueRanges?.[5],
                    overlordDecksData: response.data?.valueRanges?.[6],
                    relicsData: response.data?.valueRanges?.[7],
                    familiars: response.data?.valueRanges?.[8],
                    translation: response.data?.valueRanges?.[9],
                    abilitiesData: {
                        values: [...(response.data?.valueRanges?.[10].values || []), ...(response.data?.valueRanges?.[11].values || []), ...(response.data?.valueRanges?.[12].values || [])]
                    },
                    agentsData: response.data?.valueRanges?.[13],
                }
            )
        });

    return useQuery(['get-data-request'], query, {
        enabled: true,
        keepPreviousData: true,
        refetchInterval: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}