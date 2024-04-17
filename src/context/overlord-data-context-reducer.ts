import {OverlordDataInterface} from "../shared";

export interface OverlordDataReducerActions {
    payload: OverlordDataInterface,
    actionType: DataReducerActionsEnum.update
}

export enum DataReducerActionsEnum {
    update = 'update'
}

export const OverlordDataContextReducer = (state: OverlordDataInterface, action: OverlordDataReducerActions): OverlordDataInterface => {
    switch (action.actionType) {
        case DataReducerActionsEnum.update:
            return {...action.payload};
        default:
            return state;
    }
};