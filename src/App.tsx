import React, {useEffect, useState} from "react";
import {DataReducerActionsEnum, useHeroesDataDispatchContext} from "./context";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import {Route, Routes, useNavigate,} from "react-router-dom";
import HeroSheet from "./components/HeroSheet/HeroSheet";
import {ChoosePlayerButtons} from "./components/ChoosePlayerButtons/ChoosePlayerButtons";
import {OverlordBench} from "./components/OverlordBench/OverlordBench";
import {useOverlordDataDispatchContext} from "./context/overlord-data-context";
import {Header} from "./components/Header/Header";
import {useGetData} from "./dataHooks";
import {useGetGameSave} from "./dataHooks";
import {useGameSaveDispatchContext} from "./context/game-save-context";
import {GameSaveReducerActionTypeEnum} from "./context/game-save-context-reducer";
import {useQuery} from "./helpers/hooks/useQuery";
import {Settings} from "./components/Settings/Settings";
import {ExpansionsSettings} from "./components/ExpansionsSettings/ExpansionsSettings";
import {campaignsDataAdapted} from "./dataHooks/dataAdapters/campaignsDataAdapted";
import {heroClassesDataAdapter} from "./dataHooks/dataAdapters/heroClassesDataAdapter";
import {heroesRawDataAdapter} from "./dataHooks/dataAdapters/heroesRawDataAdapter";
import {itemsDataAdapter} from "./dataHooks/dataAdapters/itemsDataAdapter";
import {lieutenantsDataAdapter} from "./dataHooks/dataAdapters/lieutenantsDataAdapter";
import {monstersDataAdapter} from "./dataHooks/dataAdapters/monstersDataAdapter";
import {overlordDecksDataAdapted} from "./dataHooks/dataAdapters/overlordDecksDataAdapted";
import {overlordRelicsDataAdapter} from "./dataHooks/dataAdapters/overlordRelicsDataAdapter";
import {familiarsDataAdapted} from "./dataHooks/dataAdapters/familiarsDataAdapted";
import {abilitiesDataAdapted} from "./dataHooks/dataAdapters/abilitiesDataAdapted";
import {translationDataAdapted} from "./dataHooks/dataAdapters/translationDataAdapted";
import {useGetTranslation} from "./dataHooks/useGetTranslation";
import {agentsDataAdapter} from "./dataHooks/dataAdapters/agentsDataAdapter";
import {GameSavePicks} from "./shared";

export const App = () => {

    const localStorageSaveKey = 'descent-save-game-uuid';
    const [saveGameUuid, setSaveGameUuid] = useState<string | null>(localStorage.getItem(localStorageSaveKey));

    const navigate = useNavigate();
    const query = useQuery();

    const {data: translationData, isLoading: translationIsLoading} = useGetTranslation();
    const {data: gameData, isLoading: dataIsLoading} = useGetData()
    const {
        refetch: saveGameDataRefetch,
        isLoading: saveIsLoading
    } = useGetGameSave(saveGameUuid || '');

    const isLoading = dataIsLoading || saveIsLoading || translationIsLoading;

    const dispatchOverlordData = useOverlordDataDispatchContext()
    const dispatchHeroesData = useHeroesDataDispatchContext();
    const dispatchPlayersPick = useGameSaveDispatchContext();

    const getSaveData = (uuid: string) => {
        setSaveGameUuid(uuid);
        localStorage.setItem(localStorageSaveKey, uuid);
    }

    useEffect(() => {
        if (!!saveGameUuid) {
            saveGameDataRefetch().then(response => {
                const saveGameData = response.data;

                if (!!saveGameData && typeof saveGameData !== 'string') {
                    dispatchPlayersPick({
                        actionType: GameSaveReducerActionTypeEnum.changeAllPicks,
                        payload: saveGameData,
                    })
                    navigate('/players');
                } else {
                    navigate('/settings');
                }
            });
        }
    }, [saveGameUuid])

    useEffect(() => {
        const inviteUuidQueryParam = query.get('inviteUuid');

        if (!!inviteUuidQueryParam) {
            getSaveData(inviteUuidQueryParam);
        } else {
            if (!!window && !!localStorage) {
                const uuid = localStorage.getItem(localStorageSaveKey);

                if (!!uuid) {
                    getSaveData(uuid);
                } else {
                    navigate('/settings');
                }
            }
        }

    }, [])

    useEffect(() => {
        if (!!gameData) {
            const {
                heroesData,
                heroClassesData,
                itemsData,
                overlordDecksData,
                lieutenantsData,
                relicsData,
                monstersData,
                campaignData,
                familiars,
                abilitiesData,
                agentsData,
            } = gameData;

            const translation = translationDataAdapted(translationData);

            dispatchHeroesData({
                payload: {
                    heroes: heroesRawDataAdapter(heroesData, translation),
                    heroClasses: heroClassesDataAdapter(heroClassesData, translation),
                    items: itemsDataAdapter(itemsData, translation),
                    familiars: familiarsDataAdapted(familiars),
                }, actionType: DataReducerActionsEnum.update
            })

            dispatchOverlordData({
                payload: {
                    overlordCards: overlordDecksDataAdapted(overlordDecksData, translation),
                    plotCards: undefined,
                    lieutenants: lieutenantsDataAdapter(lieutenantsData),
                    relics: overlordRelicsDataAdapter(relicsData),
                    agents: agentsDataAdapter(agentsData),
                    monsters: monstersDataAdapter(monstersData),
                    campaignsData: campaignsDataAdapted(campaignData, translation),
                    abilitiesData: abilitiesDataAdapted(abilitiesData, translation),
                }, actionType: DataReducerActionsEnum.update
            })
        }
    }, [translationData, gameData])

    if (isLoading) {
        return (
            <div className='center'>
                <LoadingSpinner/>
            </div>
        )
    }

    return (
        <Routes>
            <Route
                path={'/:inviteUuid?'}
                element={<Settings/>}/>

            <Route
                path={'/settings'}
                element={<Settings/>}/>

            <Route
                path={'/expansions'}
                element={<ExpansionsSettings/>}/>

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