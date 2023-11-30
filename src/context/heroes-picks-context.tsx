import React, {createContext, Dispatch, ReactNode, useReducer} from "react";
import {CurrentPlayersPicks, HeroPlayerPicks, HeroPlayersEnum} from "../types/shared";
import {CurrentHeroesPicksReducerActions, CurrentHeroesPicksContextReducer} from "./heroes-picks-context-reducer";

const initialPlayerPicks: HeroPlayerPicks = {
    currentBR: 0,
    heroName: '',
    heroClassName : '',
    heroSubclassName: '',
    heroSkills: [],
    heroAvailableClasses: [],
    heroAvailableSubclasses: [],
    heroAvailableSkills: [],
    heroItems: [],
}

export const Heroes_Current_Picks_Initial_State: CurrentPlayersPicks = {
    [HeroPlayersEnum.hero1]: initialPlayerPicks,
    [HeroPlayersEnum.hero2]: initialPlayerPicks,
}

export const HeroesPlayersPicksContext = createContext<CurrentPlayersPicks>(Heroes_Current_Picks_Initial_State);
export const HeroesPlayersPicksContextDispatchContext = createContext<Dispatch<CurrentHeroesPicksReducerActions>>(() => {
})

export const useHeroesCurrentPicksContext = (playerHeroNumber?: HeroPlayersEnum) => {
    const context = React.useContext(HeroesPlayersPicksContext);

    if (context === undefined) {
        throw new Error('not inside context provider')
    }

    if (playerHeroNumber) {
        return context[playerHeroNumber]
    }

    return context;
}

export const useHeroesCurrentPicksDispatchContext = () => {
    const context = React.useContext(HeroesPlayersPicksContextDispatchContext);
    if (context === undefined) {
        throw new Error('not inside context provider')
    }
    return context;
}


export const HeroesPlayersPicksContextProvider = ({children}: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(CurrentHeroesPicksContextReducer, Heroes_Current_Picks_Initial_State);

    return (
        <HeroesPlayersPicksContext.Provider value={state}>
            <HeroesPlayersPicksContextDispatchContext.Provider value={dispatch}>
                {children}
            </HeroesPlayersPicksContextDispatchContext.Provider>
        </HeroesPlayersPicksContext.Provider>
    );
};