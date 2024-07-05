import {
    AbilitiesDataAdaptedInterface,
    CampaignsDataAdapted,
    FamiliarsDataAdapted,
    HeroClassesDataAdapted,
    HeroesDataAdapted,
    ItemsDataAdapted,
    LieutenantsDataAdapted,
    MonstersDataAdapted,
    OverlordCardsDataAdapted,
    OverlordPlotCardsDataAdapted,
    OverlordRelicsDataAdapted,
    TranslationDataAdaptedInterface
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
    plotCards: OverlordPlotCardsDataAdapted;
    lieutenants: LieutenantsDataAdapted;
    relics: OverlordRelicsDataAdapted;
    agents: unknown;
    monsters: MonstersDataAdapted;
    campaignsData: CampaignsDataAdapted;
    abilitiesData: AbilitiesDataAdaptedInterface;
}

export enum HeroPlayersEnum {
    hero1 = 'hero1',
    hero2 = 'hero2',
    hero3 = 'hero3',
    hero4 = 'hero4',
}

export type CurrentOverlordPicks = {
    basicDeck?: OverlordBasicDecksEnum;
    plotDeck?: string;
    pickedPlotCards?: string[];
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
    selectedEncounter?: string;
    pickedMonsters?: string[];
}

export interface GameSavePicks {
    heroesPicks: CurrentPlayersPicks;
    overlordPicks: CurrentOverlordPicks;
    campaignPicks: CampaignPicksInterface;
    language: string;
    gold?: number;
    translation?: TranslationDataAdaptedInterface;
}