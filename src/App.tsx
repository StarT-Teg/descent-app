import React from "react";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import {Route, Routes} from "react-router-dom";
import HeroSheet from "./components/HeroSheet/HeroSheet";
import {ChoosePlayerButtons} from "./components/ChoosePlayerButtons/ChoosePlayerButtons";
import {OverlordBench} from "./components/OverlordBench/OverlordBench";
import {Header} from "./components/Header/Header";
import {Settings} from "./components/Settings/Settings";
import {ExpansionsSettings} from "./components/ExpansionsSettings/ExpansionsSettings";
import {CampaignProgress} from "./components/CampaignProgress/CampaignProgress";
import {useInitGameData} from "./helpers/hooks/useInitGameData";
import {useInitSaveGame} from "./helpers/hooks/useInitSaveGame";

export const App = () => {
    const {isLoading: dataIsLoading} = useInitGameData();
    const {saveIsLoading} = useInitSaveGame();

    const isLoading = dataIsLoading || saveIsLoading;

    if (isLoading) {
        return (
            <div className='center'>
                <LoadingSpinner/>
            </div>
        );
    }

    return (
        <>
            <div className={'background'}/>
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
                        path={'/players/campaignProgress'}
                        element={<CampaignProgress/>}/>
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
        </>
    );
};
