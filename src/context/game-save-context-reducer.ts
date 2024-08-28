import {CampaignProgressInterface, GameSavePicks, TranslationDataAdaptedInterface} from "../shared";

export enum GameSaveReducerActionTypeEnum {
    changeAllPicks = 'changeAllPicks',
    changeHeroesPicks = 'changeHeroesPicks',
    changeOverlordPicks = 'changeOverlordPicks',
    changeCampaignPicks = 'changeCampaignPicks',
    changeGold = 'changeGold',
    changeTranslation = 'changeTranslation',
    changeLanguage = 'changeLanguage',
    changeCampaignProgressPicks = 'changeCampaignProgressPicks',
    changeCampaignProgressMissions = 'changeCampaignProgressMissions'
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

interface setCampaignProgressPicks {
    actionType: GameSaveReducerActionTypeEnum.changeCampaignProgressPicks;
    payload: CampaignProgressInterface;
}

interface setCampaignProgressMissions {
    actionType: GameSaveReducerActionTypeEnum.changeCampaignProgressMissions;
    payload: { [missionName: string]: null | 'overlord' | 'heroes' };
}

interface setGold {
    actionType: GameSaveReducerActionTypeEnum.changeGold;
    payload?: number;
}

interface setLanguage {
    actionType: GameSaveReducerActionTypeEnum.changeLanguage;
    payload: string;
}

interface setTranslation {
    actionType: GameSaveReducerActionTypeEnum.changeTranslation;
    payload?: TranslationDataAdaptedInterface;
}

export type GameSaveReducerActions =
    setAllPicks
    | setHeroesPicks
    | setOverlordPicks
    | setCampaignPicks
    | setCampaignProgressPicks
    | setCampaignProgressMissions
    | setGold
    | setTranslation
    | setLanguage;

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
        case GameSaveReducerActionTypeEnum.changeCampaignProgressPicks:
            return {...state, campaignProgressPicks: {...state?.campaignProgressPicks, ...payload}};
        case GameSaveReducerActionTypeEnum.changeCampaignProgressMissions:
            return {
                ...state,
                campaignProgressPicks: {
                    ...state?.campaignProgressPicks,
                    availableMissions: {...state?.campaignProgressPicks?.availableMissions, ...payload}
                }
            };
        case GameSaveReducerActionTypeEnum.changeGold:
            return {...state, gold: payload};
        case GameSaveReducerActionTypeEnum.changeTranslation:
            return {...state, translation: payload};
        case GameSaveReducerActionTypeEnum.changeLanguage:
            return {...state, language: payload};
        default:
            return state;
    }
};