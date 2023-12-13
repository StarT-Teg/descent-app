import React, {createContext, Dispatch, ReactNode, useReducer} from "react";
import {HeroesDataInterface} from "../types/shared";
import {HeroesDataContextReducer, HeroesDataReducerActions} from "./heroes-data-context-reducer";

export const Heroes_Data_Initial_State: HeroesDataInterface = {heroClasses: {}, heroes: {}, items: {}}

export const HeroesDataContext = createContext<HeroesDataInterface>(Heroes_Data_Initial_State)
export const HeroesDataDispatchContext = createContext<Dispatch<HeroesDataReducerActions>>(() => {
})

export const useHeroesDataContext = () => {
    const context = React.useContext(HeroesDataContext);
    if (context === undefined) {
        throw new Error('not inside context provider')
    }
    return context;
}

export const useHeroesDataDispatchContext = () => {
    const context = React.useContext(HeroesDataDispatchContext);
    if (context === undefined) {
        throw new Error('not inside context provider')
    }
    return context;
}

export const HeroesDataContextProvider = ({children}: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(HeroesDataContextReducer, Heroes_Data_Initial_State);

    return (
        <HeroesDataContext.Provider value={state}>
            <HeroesDataDispatchContext.Provider value={dispatch}>
                {children}
            </HeroesDataDispatchContext.Provider>
        </HeroesDataContext.Provider>
    );
};