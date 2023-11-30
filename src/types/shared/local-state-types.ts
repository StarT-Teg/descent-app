import {HeroClassesDataAdapted, HeroesDataAdapted, ItemsDataAdapted} from "./google-sheet-data-adapted";

export interface HeroesData {
    heroes: HeroesDataAdapted;
    heroClasses: HeroClassesDataAdapted;
    items: ItemsDataAdapted;
}

export enum navigationLinks {
    hero1 = 'players/hero1',
    hero2 = 'players/hero2',
    hero3 = 'players/hero3',
    hero4 = 'players/hero4',
    overlord = 'players/overlord',
}

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
    [key in HeroPlayersEnum]?: HeroPlayerPicks;
}

export type CurrentOverlordPicks = {
    [OverlordPlayerEnum.overlord]: {};
}

export interface HeroPlayerPicks {
    currentBR: number;

    heroName?: string;
    heroClassName?: string;
    heroSubclassName?: string;
    heroItems?: string[];
    heroSkills?: string[];

    heroAvailableClasses?: string[];
    heroAvailableSubclasses?: string[];
    heroAvailableSubclassSkills?: string[];
    heroAvailableSkills?: string[];
}