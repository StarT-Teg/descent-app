import {CurrentOverlordPicks} from "../types/shared";

export interface OverlordCurrentPicksReducerActions {
    actionType: OverlordCurrentPicksReducerActionsEnum
    overlordPicks: CurrentOverlordPicks,
}

export enum OverlordCurrentPicksReducerActionsEnum {
    changePicks = 'changeHeroPicks',
}

export const OverlordCurrentPicksContextReducer = (state: CurrentOverlordPicks, action: OverlordCurrentPicksReducerActions): CurrentOverlordPicks => {

    const {actionType, overlordPicks} = action;

    switch (actionType) {
        case OverlordCurrentPicksReducerActionsEnum.changePicks:
            return {...state, ...overlordPicks};
        default:
            return state;
    }
};