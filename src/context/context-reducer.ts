import {CurrentPlayersPicks, HeroesDataAdapted} from "../types";

export interface reducerActions {
    payload?: HeroesDataAdapted,
    type: reducerActionsEnum.changeHeroPicks
}

export enum reducerActionsEnum {
    changeHeroPicks = 'changeHeroPicks'
}

export interface HeroesDataReducerActions {
    payload: HeroesDataAdapted,
    type: DataReducerActionsEnum.update
}

export enum DataReducerActionsEnum {
    update = 'update'
}


export const CurrentHeroesPicksContextReducer = (state: CurrentPlayersPicks, action: reducerActions) => {
    switch (action.type) {
        case reducerActionsEnum.changeHeroPicks: break;
        default:
            return state;
    }
};

export const HeroesDataContextReducer = (state: HeroesDataAdapted, action: HeroesDataReducerActions): HeroesDataAdapted => {
    switch (action.type) {
        case DataReducerActionsEnum.update:
            return action.payload;
        default:
            return state;
    }
};