import React, {createContext, Dispatch, ReactNode, useReducer} from "react";
import {HeroClassesDataAdapted, Heroes_Data_Initial_State, HeroesDataAdapted} from "../types";
import {HeroesDataContextReducer, HeroesDataReducerActions, reducerActions} from "./context-reducer";


export const HeroesDataContext = createContext<HeroesDataAdapted | null>(null)
export const HeroesDataDispatchContext = createContext<Dispatch<HeroesDataReducerActions>>(() => {
})

export const HeroClassesDataContext = createContext<HeroClassesDataAdapted | null>(null)
export const HeroClassesDispatchContext = createContext<Dispatch<HeroesDataReducerActions>>(() => {
})

export const CurrentPicksDispatchContext = createContext<Dispatch<reducerActions>>(() => {});

export const useHeroesDaraContext = () => {
    const context = React.useContext(HeroesDataContext);
    if (context === undefined) {
        throw new Error('not inside context provider')
    }
    return context;
}

export const GlobalContextProvider = ({children}: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(HeroesDataContextReducer, Heroes_Data_Initial_State);

    return (
        <HeroesDataContext.Provider value={state}>
            <HeroesDataDispatchContext.Provider value={dispatch}>
                {children}
            </HeroesDataDispatchContext.Provider>
        </HeroesDataContext.Provider>
    );
};