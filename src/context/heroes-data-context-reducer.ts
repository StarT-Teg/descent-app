import {HeroesData} from "../types";

export interface HeroesDataReducerActions {
    payload: HeroesData,
    actionType: DataReducerActionsEnum.update
}

export enum DataReducerActionsEnum {
    update = 'update'
}

export const HeroesDataContextReducer = (state: HeroesData, action: HeroesDataReducerActions): HeroesData => {
    switch (action.actionType) {
        case DataReducerActionsEnum.update:
            return {...action.payload};
        default:
            return state;
    }
};