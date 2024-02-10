import {
    CampaignsDataAdapted,
    FamiliarsDataAdapted,
    HeroClassesDataAdapted,
    HeroesDataAdapted,
    ItemsDataAdapted,
    LieutenantsDataAdapted,
    MonstersDataAdapted,
    OverlordCardsDataAdapted,
    OverlordRelicsDataAdapted
} from "./google-sheet-data-adapted";
import {OverlordBasicDecksEnum} from "./overlord-types";

export interface HeroesDataInterface {
    heroes: HeroesDataAdapted;
    heroClasses: HeroClassesDataAdapted;
    items: ItemsDataAdapted;
    familiars: FamiliarsDataAdapted;
}

export interface OverlordDataInterface {
    overlordCards: OverlordCardsDataAdapted;
    plotCards: unknown;
    lieutenants: LieutenantsDataAdapted;
    relics: OverlordRelicsDataAdapted;
    agents: unknown;
    monsters: MonstersDataAdapted;
    campaignsData: CampaignsDataAdapted;
}

export enum HeroPlayersEnum {
    hero1 = 'hero1',
    hero2 = 'hero2',
    hero3 = 'hero3',
    hero4 = 'hero4',
}

export type CurrentOverlordPicks = {
    basicDeck?: OverlordBasicDecksEnum;
    purchasedCards?: string[];
    pickedCards?: string[];
    pickedMonsters?: string[];
    pickedRelics?: { [lieutenantName: string]: string | undefined };
    customActPicks?: string[];
}

export type CurrentPlayersPicks = {
    [key in HeroPlayersEnum]?: HeroPlayerPicks;
}

export interface HeroPlayerPicks {
    heroName?: string;
    heroClassName?: string;
    heroSubclassName?: string;
    heroItems?: string[];
    heroSkills?: string[];
}

export interface CampaignPicksInterface {
    selectedCampaign?: string;
    selectedAct?: number;
    selectedMission?: string;
    selectedEncounter?: number;
    pickedMonsters?: string[];
}

export interface GameSavePicks {
    heroesPicks: CurrentPlayersPicks;
    overlordPicks: CurrentOverlordPicks;
    campaignPicks: CampaignPicksInterface;
}