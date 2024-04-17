import {GameSavePicks} from "../shared";

export enum GameSaveReducerActionTypeEnum {
    changeAllPicks = 'changeAllPicks',
    changeHeroesPicks = 'changeHeroesPicks',
    changeOverlordPicks = 'changeOverlordPicks',
    changeCampaignPicks = 'changeCampaignPicks',
    changeGold = 'changeGold',
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

interface setGold {
    actionType: GameSaveReducerActionTypeEnum.changeGold;
    payload?: number;
}

export type GameSaveReducerActions = setAllPicks | setHeroesPicks | setOverlordPicks | setCampaignPicks | setGold;

export const GameSaveContextReducer = (state: GameSavePicks, action: GameSaveReducerActions): GameSavePicks => {

    const {actionType, payload} = action;

    switch (actionType) {
        case GameSaveReducerActionTypeEnum.changeAllPicks:
            return {...payload};
        case GameSaveReducerActionTypeEnum.changeHeroesPicks:
            return {...state, heroesPicks: {...state.heroesPicks, ...payload.heroesPicks}};
        case GameSaveReducerActionTypeEnum.changeOverlordPicks:
            return {...state, overlordPicks: {...state.overlordPicks, ...payload.overlordPicks}};
        case GameSaveReducerActionTypeEnum.changeCampaignPicks:
            return {...state, campaignPicks: {...state.campaignPicks, ...payload.campaignPicks}};
        case GameSaveReducerActionTypeEnum.changeGold:
            return {...state, gold: payload};
        default:
            return state;
    }
};