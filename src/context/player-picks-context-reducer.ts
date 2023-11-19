import {CurrentPlayersPicks} from "../types";

export interface CurrentHeroesPicksReducerActions {
    actionType: CurrentHeroesPicksReducerActionsEnum
    playersPicks: CurrentPlayersPicks,
}

export enum CurrentHeroesPicksReducerActionsEnum {
    changePicks = 'changeHeroPicks',
}

export const CurrentHeroesPicksContextReducer = (state: CurrentPlayersPicks, action: CurrentHeroesPicksReducerActions): CurrentPlayersPicks => {

    const {actionType, playersPicks} = action;

    switch (actionType) {
        case CurrentHeroesPicksReducerActionsEnum.changePicks:
            return {...state, ...playersPicks};
        default:
            return state;
    }
};