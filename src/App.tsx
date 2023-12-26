import React, {useEffect, useState} from "react";
import {DataReducerActionsEnum, useHeroesDataDispatchContext} from "./context";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import {Route, Routes, useNavigate,} from "react-router-dom";
import HeroSheet from "./components/HeroSheet/HeroSheet";
import {ChoosePlayerButtons} from "./components/ChoosePlayerButtons/ChoosePlayerButtons";
import {OverlordBench} from "./components/OverlordBench/OverlordBench";
import {useOverlordDataDispatchContext} from "./context/overlord-data-context";
import {Header} from "./components/Header/Header";
import {useGetData} from "./dataHooks/useGetData";
import {useGetGameSave} from "./dataHooks";
import {useGameSaveDispatchContext} from "./context/game-save-context";
import {GameSaveReducerActionTypeEnum} from "./context/game-save-context-reducer";
import {useQuery} from "./helpers/useQuery";
import {CreateGameParty} from "./components/CreateGameParty/CreateGameParty";

export const App = () => {

    const localStorageSaveKey = 'descent-save-game-uuid';
    const [saveGameUuid, setSaveGameUuid] = useState<string | null>(localStorage.getItem(localStorageSaveKey));

    const navigate = useNavigate();
    const query = useQuery();

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const {refetch: refetchData, isLoading: dataIsLoading} = useGetData()
    const {
        refetch: saveGameDataRefetch,
        isLoading: saveIsLoading
    } = useGetGameSave(saveGameUuid || '');

    const dispatchOverlordData = useOverlordDataDispatchContext()
    const dispatchHeroesData = useHeroesDataDispatchContext();
    const dispatchPlayersPick = useGameSaveDispatchContext();

    const getSaveData = (uuid: string) => {
        setSaveGameUuid(uuid);
        saveGameDataRefetch().then(response => {
            const saveGameData = response.data;

            if (typeof saveGameData !== 'string') {
                dispatchPlayersPick({
                    actionType: GameSaveReducerActionTypeEnum.changeAllPicks,
                    payload: saveGameData,
                })
                navigate('/players');
            } else {
                alert(saveGameData)
                navigate('/');
            }
        });
    }

    useEffect(() => {
        setIsLoading(dataIsLoading || saveIsLoading)
    }, [dataIsLoading, saveIsLoading])

    useEffect(() => {
        const inviteUuidQueryParam = query.get('inviteUuid');

        if (!!inviteUuidQueryParam) {
            localStorage.setItem(localStorageSaveKey, inviteUuidQueryParam);
            getSaveData(inviteUuidQueryParam);
        } else {
            if (!!window && !!localStorage) {
                const uuid = localStorage.getItem(localStorageSaveKey);

                if (!!uuid) {
                    getSaveData(uuid);
                }
            }
        }

    }, [])

    // useEffect(() => {
    //     if (!!saveGameData) {
    //         dispatchPlayersPick({
    //             actionType: GameSaveReducerActionTypeEnum.changeAllPicks,
    //             payload: saveGameData,
    //         })
    //         navigate('/players');
    //     }
    // }, [saveGameData])

    useEffect(() => {
        refetchData().then((response => {
            const data = response?.data;

            if (!!data) {
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
        }));
    }, [])

    if (isLoading) {
        return <LoadingSpinner/>
    }

    return (
        <Routes>
            <Route
                path={'/:inviteUuid?'}
                element={<CreateGameParty/>}/>

            <Route path="/players" element={<Header/>}>
                <Route
                    path={'/players'}
                    element={<ChoosePlayerButtons/>}/>
                <Route
                    path={'/players/:playerRole'}
                    element={<HeroSheet/>}/>
                <Route
                    path={'/players/overlord'}
                    element={<OverlordBench/>}/>

                {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
                <Route path="*" element={<div>error route</div>}/>
            </Route>
        </Routes>
    )


}