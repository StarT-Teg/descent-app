import React from "react";
import {useGetHeroClassesData} from "./dataHooks";
import {useHeroesDataDispatchContext} from "./context/heroes-data-context";
import {DataReducerActionsEnum} from "./context/heroes-data-context-reducer";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import {useGetHeroesData} from "./dataHooks";
import {useGetItemsData} from "./dataHooks";
import {Route, Routes,} from "react-router-dom";
import HeroSheet from "./components/HeroBundle/HeroSheet/HeroSheet";
import {ChoosePlayerButtons} from "./components/ChoosePlayerButtons/ChoosePlayerButtons";
import {OverlordBench} from "./components/OverlordBench/OverlordBench";
import {useGetCampaignsData} from "./dataHooks";

export const App = () => {

    const {data} = useGetCampaignsData();
    console.log(data)

    const {data: heroesData, isSuccess: heroesDataSuccess, isLoading: heroesDataIsLoading} = useGetHeroesData();
    const {
        data: heroClassesData,
        isSuccess: heroClassesDataSuccess,
        isLoading: heroClassesIsLoading
    } = useGetHeroClassesData();
    const {data: itemsData, isSuccess: itemsDataSuccess, isLoading: itemsDataLoading} = useGetItemsData();

    const dispatch = useHeroesDataDispatchContext();

    const isLoading = heroesDataIsLoading || heroClassesIsLoading || itemsDataLoading;
    const isSuccess = heroesDataSuccess && heroClassesDataSuccess && itemsDataSuccess;

    if (isSuccess) {
        dispatch({
            payload: {
                heroes: heroesData || {},
                heroClasses: heroClassesData || {},
                items: itemsData || {},
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
                <Route path="*" element={<div>error route</div>} />
            </Route>
            <Route
                path={'players/:playerRole'}
                element={<HeroSheet />}/>
            <Route
                path={'players/overlord'}
                element={<OverlordBench />}/>
        </Routes>
    )


}