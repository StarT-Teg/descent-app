import {GameSavePicks} from "../types/shared";

export enum GameSaveReducerActionTypeEnum {
    changeAllPicks = 'changeAllPicks',
    changeHeroesPicks = 'changeHeroesPicks',
    changeOverlordPicks = 'changeOverlordPicks',
    changeCampaignPicks = 'changeCampaignPicks',
}

interface setAllPicks {
    actionType: GameSaveReducerActionTypeEnum.changeAllPicks;
    payload: GameSavePicks;
}

interface setHeroesPicks {
    actionType: GameSaveReducerActionTypeEnum.changeHeroesPicks;
    payload: Pick<GameSavePicks, 'heroesPicks'>;
}

interface setOverlordPicks {
    actionType: GameSaveReducerActionTypeEnum.changeOverlordPicks;
    payload: Pick<GameSavePicks, 'overlordPicks'>;
}

interface setCampaignPicks {
    actionType: GameSaveReducerActionTypeEnum.changeCampaignPicks;
    payload: Pick<GameSavePicks, 'campaignPicks'>;
}

export type GameSaveReducerActions = setAllPicks | setHeroesPicks | setOverlordPicks | setCampaignPicks;

export const GameSaveContextReducer = (state: GameSavePicks, action: GameSaveReducerActions): GameSavePicks => {

    const {actionType, payload} = action;

    switch (actionType) {
        case GameSaveReducerActionTypeEnum.changeAllPicks:
            return {...payload};
        case GameSaveReducerActionTypeEnum.changeHeroesPicks:
        case GameSaveReducerActionTypeEnum.changeOverlordPicks:
        case GameSaveReducerActionTypeEnum.changeCampaignPicks:
            return {...state, ...payload};
        default:
            return state;
    }
};