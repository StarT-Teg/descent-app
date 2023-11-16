import {HeroesDataAdapted} from "./google-sheet-data-adapted";

export const Heroes_Data_Initial_State: HeroesDataAdapted = {}

export enum HeroPlayersEnum {
    hero1 = 'hero1',
    hero2 = 'hero2',
    hero3 = 'hero3',
    hero4 = 'hero4',
}

export enum OverlordPlayerEnum {
    overlord = 'overlord'
}

export type CurrentPlayersPicks = {
    [key in HeroPlayersEnum]: HeroesDataAdapted;
}

export type CurrentOverlordPicks = {
    [OverlordPlayerEnum.overlord]: {};
}