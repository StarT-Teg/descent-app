import {HeroesDataInterface} from "../shared";

export interface HeroesDataReducerActions {
    payload: HeroesDataInterface,
    actionType: DataReducerActionsEnum.update
}

export enum DataReducerActionsEnum {
    update = 'update'
}

export const HeroesDataContextReducer = (state: HeroesDataInterface, action: HeroesDataReducerActions): HeroesDataInterface => {
    switch (action.actionType) {
        case DataReducerActionsEnum.update:
            return {...action.payload};
        default:
            return state;
    }
};