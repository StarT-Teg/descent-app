import React, {useEffect, useLayoutEffect, useState} from "react";
import {DataReducerActionsEnum, useHeroesDataDispatchContext} from "./context";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import {Route, Routes,} from "react-router-dom";
import HeroSheet from "./components/HeroSheet/HeroSheet";
import {ChoosePlayerButtons} from "./components/ChoosePlayerButtons/ChoosePlayerButtons";
import {OverlordBench} from "./components/OverlordBench/OverlordBench";
import uuid from "react-uuid";
import {useOverlordDataDispatchContext} from "./context/overlord-data-context";
import {Header} from "./components/Header/Header";
import {useGetData} from "./dataHooks/useGetData";
import {useGetGameSave} from "./dataHooks";
import {useGameSaveDispatchContext} from "./context/game-save-context";
import {GameSaveReducerActionTypeEnum} from "./context/game-save-context-reducer";

export const App = () => {

    const localStorageSaveKey = 'descent-save-game-uuid';
    const [saveGameUuid, setSaveGameUuid] = useState<string | null>(localStorage.getItem(localStorageSaveKey));

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const {data, refetch: refetchData, isSuccess, isLoading: dataIsLoading} = useGetData()
    const {
        data: saveGameData,
        refetch: saveGameDataRefetch,
        isLoading: saveIsLoading
    } = useGetGameSave(saveGameUuid || '');

    const dispatchOverlordData = useOverlordDataDispatchContext()
    const dispatchHeroesData = useHeroesDataDispatchContext();
    const dispatchPlayersPick = useGameSaveDispatchContext();

    useEffect(() => {
        setIsLoading(dataIsLoading || saveIsLoading)
    }, [dataIsLoading, saveIsLoading])

    useEffect(() => {
        if (!!window && !!localStorage) {
            if (saveGameUuid === null) {
                const newSaveUuid = uuid();

                localStorage.setItem(localStorageSaveKey, newSaveUuid);
                setSaveGameUuid(newSaveUuid);
            } else {
                saveGameDataRefetch().then()
            }
        }
    }, [window, localStorage])

    useEffect(() => {
        if (Object.keys(saveGameData || {}).length > 0) {
            dispatchPlayersPick({
                actionType: GameSaveReducerActionTypeEnum.changeAllPicks,
                payload: saveGameData,
            })
        }
    }, [saveGameData])

    if (isSuccess) {

        const {
            heroesData,
            heroClassesData,
            itemsData,
            overlordDecksData,
            lieutenantsData,
            relicsData,
            monstersData,
            campaignData
        } = data;

        dispatchHeroesData({
            payload: {
                heroes: heroesData || {},
                heroClasses: heroClassesData || {},
                items: itemsData || {},
            }, actionType: DataReducerActionsEnum.update
        })

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
        refetchData().then();
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