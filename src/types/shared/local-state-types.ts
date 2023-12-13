import {
    HeroClassesDataAdapted,
    HeroesDataAdapted,
    ItemsDataAdapted, LieutenantsDataAdapted, MonstersDataAdapted,
    OverlordCardsDataAdapted, OverlordRelicsDataAdapted
} from "./google-sheet-data-adapted";
import {OverlordBasicDecksEnum} from "./overlord-types";

export interface HeroesDataInterface {
    heroes: HeroesDataAdapted;
    heroClasses: HeroClassesDataAdapted;
    items: ItemsDataAdapted;
}

export interface OverlordDataInterface {
    overlordCards: OverlordCardsDataAdapted;
    plotCards: unknown;
    lieutenants: LieutenantsDataAdapted;
    relics: OverlordRelicsDataAdapted;
    agents: unknown;
    monsters: MonstersDataAdapted;
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

export type CurrentOverlordPicks = {
    selectedCampaign?: string;
    selectedAct?: number;
    selectedMission?: string;
    selectedEncounter?: number;
    basicDeck?: OverlordBasicDecksEnum;
    purchasedCards?: string[];
    pickedCards?: string[];
}

export type CurrentPlayersPicks = {
    [key in HeroPlayersEnum]?: HeroPlayerPicks;
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