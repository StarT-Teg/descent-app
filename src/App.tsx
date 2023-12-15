import React, {useEffect, useLayoutEffect, useState} from "react";
import {
    useGetCampaignsData,
    useGetHeroClassesData,
    useGetHeroesData,
    useGetItemsData,
    useGetMonstersData,
    useGetOverlordDecksData,
    useGetOverlordRelicsData
} from "./dataHooks";
import {DataReducerActionsEnum, useHeroesDataDispatchContext} from "./context";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import {Route, Routes,} from "react-router-dom";
import HeroSheet from "./components/HeroSheet/HeroSheet";
import {ChoosePlayerButtons} from "./components/ChoosePlayerButtons/ChoosePlayerButtons";
import {OverlordBench} from "./components/OverlordBench/OverlordBench";
import uuid from "react-uuid";
import {useOverlordDataDispatchContext} from "./context/overlord-data-context";
import {useGetLieutenantsData} from "./dataHooks/useGetLieutenantsData";
import {Header} from "./components/Header/Header";

export const App = () => {

    const localStorageSaveKey = 'descent-save-game-uuid';
    const saveGameUuid: string | null = localStorage.getItem(localStorageSaveKey);

    const {
        data: heroesData,
        refetch: heroesDataRefetch,
        isSuccess: heroesDataSuccess,
        isLoading: heroesDataIsLoading
    } = useGetHeroesData();
    const {
        data: heroClassesData,
        refetch: heroClassesRefetch,
        isSuccess: heroClassesDataSuccess,
        isLoading: heroClassesIsLoading
    } = useGetHeroClassesData();
    const {
        data: itemsData,
        refetch: itemsDataRefetch,
        isSuccess: itemsDataSuccess,
        isLoading: itemsDataLoading
    } = useGetItemsData();

    const {
        data: overlordDecksData,
        refetch: overlordDecksDataRefetch,
        isSuccess: overlordDecksSuccess,
        isLoading: overlordDecksLoading
    } = useGetOverlordDecksData();
    const {
        data: monstersData,
        refetch: monsterDataRefetch,
        isSuccess: monstersDataSuccess,
        isLoading: monstersDataLoading
    } = useGetMonstersData();
    const {
        data: lieutenantsData,
        refetch: lieutenantsDataRefetch,
        isSuccess: lieutenantsDataSuccess,
        isLoading: lieutenantsDataLoading
    } = useGetLieutenantsData();
    const {
        data: relicsData,
        refetch: relicsDataRefetch,
        isSuccess: relicsDataSuccess,
        isLoading: relicsDataLoading
    } = useGetOverlordRelicsData();
    const {
        data: campaignData,
        refetch: campaignDataRefetch,
        isSuccess: campaignDataSuccess,
        isLoading: campaignDataLoading
    } = useGetCampaignsData();

    const dispatchOverlordData = useOverlordDataDispatchContext()
    const dispatchHeroesData = useHeroesDataDispatchContext();


    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isHeroesDataSuccess, setIsHeroesDataSuccess] = useState<boolean>(false);
    const [isOverlordDataSuccess, setIsOverlordDataSuccess] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(heroesDataIsLoading || heroClassesIsLoading || itemsDataLoading || overlordDecksLoading || monstersDataLoading || lieutenantsDataLoading || relicsDataLoading || campaignDataLoading)
    }, [heroesDataIsLoading, heroClassesIsLoading, itemsDataLoading, overlordDecksLoading, monstersDataLoading, lieutenantsDataLoading, relicsDataLoading, campaignDataLoading])

    useEffect(() => {
        setIsHeroesDataSuccess(heroesDataSuccess && heroClassesDataSuccess && itemsDataSuccess)
    }, [heroesDataSuccess, heroClassesDataSuccess, itemsDataSuccess])

    useEffect(() => {
        setIsOverlordDataSuccess(overlordDecksSuccess && monstersDataSuccess && lieutenantsDataSuccess && relicsDataSuccess && campaignDataSuccess)
    }, [overlordDecksSuccess, monstersDataSuccess, lieutenantsDataSuccess, relicsDataSuccess, campaignDataSuccess])

    useEffect(() => {
        if (!!window && !!localStorage) {
            if (saveGameUuid === null) {
                const newSaveUuid = uuid();
                localStorage.setItem(localStorageSaveKey, newSaveUuid);
            } else {

            }
        }
    }, [saveGameUuid])

    if (isHeroesDataSuccess) {
        dispatchHeroesData({
            payload: {
                heroes: heroesData || {},
                heroClasses: heroClassesData || {},
                items: itemsData || {},
            }, actionType: DataReducerActionsEnum.update
        })
    }

    if (isOverlordDataSuccess) {
        dispatchOverlordData({
            payload: {
                overlordCards: overlordDecksData || {},
                plotCards: undefined,
                lieutenants: lieutenantsData || {},
                relics: relicsData || {},
                agents: undefined,
                monsters: monstersData || {},
                campaignsData: campaignData || {}
            }, actionType: DataReducerActionsEnum.update
        })
    }

    useLayoutEffect(() => {
        heroesDataRefetch().then();
        heroClassesRefetch().then();
        overlordDecksDataRefetch().then();
        lieutenantsDataRefetch().then();
        relicsDataRefetch().then();
        campaignDataRefetch().then();
        monsterDataRefetch().then();
        itemsDataRefetch().then();
    }, [])

    if (isLoading) {
        return <LoadingSpinner/>
    }

    return (
        <Routes>
            <Route path="/" element={<Header/>}>
                <Route
                    path={'/'}
                    element={<ChoosePlayerButtons/>}/>
                <Route
                    path={'players/:playerRole'}
                    element={<HeroSheet/>}/>
                <Route
                    path={'players/overlord'}
                    element={<OverlordBench/>}/>

                {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
                <Route path="*" element={<div>error route</div>}/>
            </Route>
        </Routes>
    )


}