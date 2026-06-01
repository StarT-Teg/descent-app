import React, {Suspense} from "react";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import {Route, Routes} from "react-router-dom";
import {Header} from "./components/Header/Header";
import {useInitGameData} from "./helpers/hooks/useInitGameData";
import {useInitSaveGame} from "./helpers/hooks/useInitSaveGame";

const HeroSheet = React.lazy(() => import("./components/HeroSheet/HeroSheet"));
const ChoosePlayerButtons = React.lazy(() => import("./components/ChoosePlayerButtons/ChoosePlayerButtons").then(m => ({default: m.ChoosePlayerButtons})));
const OverlordBench = React.lazy(() => import("./components/OverlordBench/OverlordBench").then(m => ({default: m.OverlordBench})));
const Settings = React.lazy(() => import("./components/Settings/Settings").then(m => ({default: m.Settings})));
const ExpansionsSettings = React.lazy(() => import("./components/ExpansionsSettings/ExpansionsSettings").then(m => ({default: m.ExpansionsSettings})));
const CampaignProgress = React.lazy(() => import("./components/CampaignProgress/CampaignProgress").then(m => ({default: m.CampaignProgress})));

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
            <Suspense fallback={
                <div className='center'>
                    <LoadingSpinner/>
                </div>
            }>
                <Routes>
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
            </Suspense>
        </>
    );
};
