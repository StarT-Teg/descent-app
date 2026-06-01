import axios, {AxiosRequestConfig} from "axios";
import {useQuery, UseQueryResult} from "react-query";
import {GameDataEnum, GameDataInterface} from "../shared";

const gameDataRanges: Record<GameDataEnum, string[]> = {
    campaignData: ['Campaigns'],
    heroClassesData: ['vote4Classes!A:G'],
    heroesData: ['vote4Heroes!A:N'],
    itemsData: ['Items'],
    lieutenantsData: ['Lieutenants!A:AL'],
    monstersData: ['monsters'],
    overlordDecksData: ['Overlord Deck!A:H'],
    relicsData: ['Overlord Relics'],
    familiars: ['Familiars'],
    translationData: ['Translation!A:B'],
    abilitiesData: ['vote4TRAITS!A:C', 'vote4SURGE!A:C', 'vote4ACTIONS!A:C'],
    agentsData: ['Agents'],
    plotDeckData: ['Plot Deck!A:F'],
};

const ranges = Object.values(gameDataRanges).reduce((acc: string[], rangeArr) => {
    if (!rangeArr?.length) {
        return acc;
    }

    return [...acc, ...rangeArr];
}, []);

const config: AxiosRequestConfig<string> = {
    params: {ranges: ranges.join(',')},
    headers: {"Content-Type": "text/plain"},
    validateStatus: (status) => status !== 302,
};

const fetchGameData = () => axios
    .get(`https://script.google.com/macros/s/AKfycbwfWRsI5bpoo2pK-YMFsZs16O2-Nour35EwYtwvbwpNFBMdI8XIxYEP0Fq5cVCrn4OwZw/exec`, config)
    .then((response) => {
        const responseData: { [key in string]: { values: string[][] } } = response?.data;
        const responseDataFormatted: { [key in string]: { values: string[][] } } = {};

        for (const gameDataName in gameDataRanges) {
            const gameDataRangeList = gameDataRanges[gameDataName as GameDataEnum];

            const dataCombined = gameDataRangeList.reduce((acc: string[][], rangeName) => {
                const rangeData = responseData?.[rangeName]?.values;
                if (rangeData?.length) {
                    return [...acc, ...rangeData];
                }

                return acc;
            }, []);

            responseDataFormatted[gameDataName] = {values: [...dataCombined]};
        }

        return {...responseDataFormatted};
    });

export const useGetData = (): UseQueryResult<GameDataInterface> => {
    return useQuery(['get-data-request'], fetchGameData, {
        enabled: true,
        staleTime: Infinity,
        keepPreviousData: true,
        refetchInterval: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
    });
}
