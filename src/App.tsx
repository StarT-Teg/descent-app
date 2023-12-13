import React, {useEffect} from "react";
import {
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
import HeroSheet from "./components/HeroBundle/HeroSheet/HeroSheet";
import {ChoosePlayerButtons} from "./components/ChoosePlayerButtons/ChoosePlayerButtons";
import {OverlordBench} from "./components/OverlordBench/OverlordBench";
import uuid from "react-uuid";
import {useOverlordDataDispatchContext} from "./context/overlord-data-context";
import {useGetLieutenantsData} from "./dataHooks/useGetLieutenantsData";

export const App = () => {

    const localStorageSaveKey = 'descent-save-game-uuid';
    const saveGameUuid: string | null = localStorage.getItem(localStorageSaveKey);

    const {data: heroesData, isSuccess: heroesDataSuccess, isLoading: heroesDataIsLoading} = useGetHeroesData();
    const {
        data: heroClassesData,
        isSuccess: heroClassesDataSuccess,
        isLoading: heroClassesIsLoading
    } = useGetHeroClassesData();
    const {data: itemsData, isSuccess: itemsDataSuccess, isLoading: itemsDataLoading} = useGetItemsData();

    const {
        data: overlordDecksData,
        isSuccess: overlordDecksSuccess,
        isLoading: overlordDecksLoading
    } = useGetOverlordDecksData();
    const {data: monstersData, isSuccess: monstersDataSuccess, isLoading: monstersDataLoading} = useGetMonstersData();
    const {
        data: lieutenantsData,
        isSuccess: lieutenantsDataSuccess,
        isLoading: lieutenantsDataLoading
    } = useGetLieutenantsData();
    const {data: relicsData, isSuccess: relicsDataSuccess, isLoading: relicsDataLoading} = useGetOverlordRelicsData();

    const dispatchOverlordData = useOverlordDataDispatchContext()
    const dispatchHeroesData = useHeroesDataDispatchContext();

    const isLoading = heroesDataIsLoading || heroClassesIsLoading || itemsDataLoading || overlordDecksLoading || monstersDataLoading || lieutenantsDataLoading || relicsDataLoading;
    const isHeroesDataSuccess = heroesDataSuccess && heroClassesDataSuccess && itemsDataSuccess;
    const isOverlordDataSuccess = overlordDecksSuccess && monstersDataSuccess && lieutenantsDataSuccess && relicsDataSuccess;

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
            }, actionType: DataReducerActionsEnum.update
        })
    }

    if (isLoading) {
        return <LoadingSpinner/>
    }

    return (
        <Routes>
            <Route path="/" element={<ChoosePlayerButtons/>}>
                {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
                <Route path="*" element={<div>error route</div>}/>
            </Route>
            <Route
                path={'players/:playerRole'}
                element={<HeroSheet/>}/>
            <Route
                path={'players/overlord'}
                element={<OverlordBench/>}/>
        </Routes>
    )


}