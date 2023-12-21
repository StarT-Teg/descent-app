import React, {createContext, Dispatch, ReactNode, useReducer} from "react";
import {
    CampaignPicksInterface,
    CurrentOverlordPicks,
    CurrentPlayersPicks,
    GameSavePicks,
    HeroPlayerPicks,
    HeroPlayersEnum
} from "../types/shared";
import {GameSaveContextReducer, GameSaveReducerActions} from "./game-save-context-reducer";

export const Initial_Player_Picks: HeroPlayerPicks = {
    heroName: '',
    heroClassName: '',
    heroSubclassName: '',
    heroSkills: [],
    heroItems: [],
}

export const Heroes_Current_Picks_Initial_State: CurrentPlayersPicks = {
    [HeroPlayersEnum.hero1]: Initial_Player_Picks,
    [HeroPlayersEnum.hero2]: Initial_Player_Picks,
}

const Initial_Overlord_Picks: CurrentOverlordPicks = {}

const Initial_Campaign_Picks: CampaignPicksInterface = {}


const INITIAL_GAME_PICKS: GameSavePicks = {
    campaignPicks: Initial_Campaign_Picks,
    overlordPicks: Initial_Overlord_Picks,
    heroesPicks: Heroes_Current_Picks_Initial_State,

}

export const GameSaveContext = createContext<GameSavePicks>(INITIAL_GAME_PICKS);
export const GameSaveContextDispatchContext = createContext<Dispatch<GameSaveReducerActions>>(() => {
})

export const useGameSaveContext = () => {
    const context = React.useContext(GameSaveContext);

    if (context === undefined) {
        throw new Error('not inside context provider')
    }

    return context;
}

export const useGameSaveDispatchContext = () => {
    const context = React.useContext(GameSaveContextDispatchContext);
    if (context === undefined) {
        throw new Error('not inside context provider')
    }
    return context;
}


export const GameSaveContextProvider = ({children}: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(GameSaveContextReducer, INITIAL_GAME_PICKS);

    return (
        <GameSaveContext.Provider value={state}>
            <GameSaveContextDispatchContext.Provider value={dispatch}>
                {children}
            </GameSaveContextDispatchContext.Provider>
        </GameSaveContext.Provider>
    );
};