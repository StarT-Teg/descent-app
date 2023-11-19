import React, {useEffect} from "react";
import HeroBundle from "./components/HeroBundle/HeroBundle";
import {useGetHeroClassesData} from "./dataHooks/useGetHeroClassesData";
import {useHeroesDataDispatchContext} from "./context/heroes-data-context";
import {DataReducerActionsEnum} from "./context/heroes-data-context-reducer";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import {useGetHeroesData} from "./dataHooks/useGetHeroesData";
import {useGetItemsData} from "./dataHooks/useGetItemsData";
import {Routes, Route} from "react-router-dom";

export const App = () => {

    const {data: heroesData, isSuccess: heroesDataSuccess, isLoading: heroesDataIsLoading} = useGetHeroesData();
    const {data: heroClassesData, isSuccess: heroClassesDataSuccess, isLoading: heroClassesIsLoading} = useGetHeroClassesData();
    const {data: itemsData, isSuccess: itemsDataSuccess, isLoading: itemsDataLoading} = useGetItemsData();

    const dispatch = useHeroesDataDispatchContext();

    const isLoading = heroesDataIsLoading || heroClassesIsLoading || itemsDataLoading;

    useEffect(() => {
        const isSuccess = heroesDataSuccess && heroClassesDataSuccess && itemsDataSuccess;
        if (isSuccess) {
            dispatch({payload: {
                    heroes: heroesData || {},
                    heroClasses: heroClassesData || {},
                    items: itemsData || {},
                }, actionType: DataReducerActionsEnum.update})
        }
    }, [heroesData, heroClassesData, itemsData])

    if(isLoading) {
        return <LoadingSpinner />
    }

    return (
        <Routes>
            <Route path="/" element={<HeroBundle />}>
                <Route index element={<HeroBundle />} />
                <Route path="about" element={<HeroBundle />} />
                <Route path="dashboard" element={<HeroBundle />} />

                {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
                <Route path="*" element={<HeroBundle />} />
            </Route>
        </Routes>
    )


}