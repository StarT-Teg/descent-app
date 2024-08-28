import {
    CampaignsDataParametersEnum,
    ExcelDataRaw,
    HeroClassParametersEnum,
    ItemDataParametersEnum,
    LieutenantDataParametersEnum,
    MonstersDataParametersEnum,
    OverlordDeckDataParametersEnum,
    OverlordRelicDataParametersEnum
} from "./google-sheet-data-raw";

export enum GameDataEnum {
    heroesData = 'heroesData',
    heroClassesData = 'heroClassesData',
    itemsData = 'itemsData',
    overlordDecksData = 'overlordDecksData',
    lieutenantsData = 'lieutenantsData',
    relicsData = 'relicsData',
    monstersData = 'monstersData',
    campaignData = 'campaignData',
    familiars = 'familiars',
    abilitiesData = 'abilitiesData',
    translation = 'translation',
    agentsData = 'agentsData',
    plotDeckData = 'plotDeckData',
}

export type GameDataInterface = {
    [key in GameDataEnum]?: ExcelDataRaw;
}

export interface TranslationDataAdaptedInterface {
    [key: string]: { [key in string]?: string }
}

export interface CampaignsDataAdapted {
    [campaignName: string]: {
        [missionName: string]: MissionDataAdapted,
    };
}

export interface MissionDataAdapted {
    [CampaignsDataParametersEnum.campaignName]: string,
    [CampaignsDataParametersEnum.act]: number,
    [CampaignsDataParametersEnum.missionName]: string,
    [CampaignsDataParametersEnum.translation]?: {
        campaignName?: { [key in string]?: string },
        missionName?: { [key in string]?: string },
        act2MissionNameHeroWin?: { [key in string]?: string },
        act2MissionNameOverlordWin?: { [key in string]?: string },
    },
    'encounters'?: {
        [key in string]: EncounterData;
    }
    missionType?: string
    act2MissionNameHeroWin?: string;
    act2MissionNameOverlordWin?: string;
    rewards?: {
        xpRewardHeroWin?: number;
        xpRewardHeroDefeat?: number;
        xpRewardOverlordWin?: number;
        xpRewardOverlordDefeat?: number;
    }
}

export interface EncounterData {
    [CampaignsDataParametersEnum.encounterNumber]: string,
    [CampaignsDataParametersEnum.lieutenants]: string[],
    [CampaignsDataParametersEnum.monsters]: string[],
    [CampaignsDataParametersEnum.openGroupsAmount]: number,
    [CampaignsDataParametersEnum.openGroupsTraits]: MonsterTraitNamesEnum[],
    [CampaignsDataParametersEnum.isOnlySmallMonsters]: boolean,
    [CampaignsDataParametersEnum.cantChangeActMonsterList]?: string[],
    optionalUnits?: string[],
}

export interface OverlordCardsDataAdapted {
    [key: string]: OverlordDeckSkill;
}

export type OverlordPlotCardsDataAdapted = {
    [packName in string]?: {
        [cardName in string]?: {
            cardName: string;
            packName: string;
            buyCost: number;
            playCost: number;
            description: string;
            br: number;
            translations: {
                cardName: { [language in string]: string };
                packName: { [language in string]: string }
            };
        }
    };
}

export interface OverlordDeckSkill {
    [OverlordDeckDataParametersEnum.cardName]: string;
    [OverlordDeckDataParametersEnum.type]: string;
    [OverlordDeckDataParametersEnum.br]: number;
    [OverlordDeckDataParametersEnum.xpCost]: number;
    [OverlordDeckDataParametersEnum.text]: string;
    [OverlordDeckDataParametersEnum.className]: string;
    [OverlordDeckDataParametersEnum.quantity]: number;
    [OverlordDeckDataParametersEnum.translations]: {
        name: { [key in string]: string }
    };
}

export interface LieutenantsDataAdapted {
    [lieutenantName: string]: LieutenantData;
}

export interface LieutenantData {
    [LieutenantDataParametersEnum.name]: string;
    [LieutenantDataParametersEnum.expansion]: string,
    [LieutenantDataParametersEnum.description]: string,
    translation?: { name?: { [key in string]: string } };

    'act1'?: LieutenantActData;
    'act2'?: LieutenantActData;
}

export interface LieutenantActData {
    stats: {
        [numberOfHeroes: number]: LieutenantStats;
    };

    [LieutenantDataParametersEnum.size]: number;
    [LieutenantDataParametersEnum.strength]: number,
    [LieutenantDataParametersEnum.knowledge]: number,
    [LieutenantDataParametersEnum.willpower]: number,
    [LieutenantDataParametersEnum.awareness]: number,

    [LieutenantDataParametersEnum.attackType]: string,
    [LieutenantDataParametersEnum.attackDice]: string,

    [LieutenantDataParametersEnum.traits]: string,
    [LieutenantDataParametersEnum.actions]: string,
    [LieutenantDataParametersEnum.surgeAbilities]: string,

    [LieutenantDataParametersEnum.br]: number,
}

export interface LieutenantStats {
    [LieutenantDataParametersEnum.movement]: number;
    [LieutenantDataParametersEnum.wounds]: number;
    [LieutenantDataParametersEnum.defenseDice]: string;
    [LieutenantDataParametersEnum.br]: number;
}

export interface MonstersDataAdapted {
    [monsterName: string]: {
        [act: string]: {
            [key in MonsterTypesEnum]: MonsterData;
        },
    }
}

export interface FamiliarsDataAdapted {
    [familiarName: string]: FamiliarData,
}

export interface FamiliarData {
    source: string,
    name: string,
    size: number,
    movement: number,
    wounds: number,
    attackType: string,
    defenseDice: string,
    attackDice: string,
    surgeAbilities: string,
    br: number,
    translation?: { name?: { [key in string]: string } };
}

export enum MonsterTypesEnum {
    master = 'master',
    minion = 'minion',
}

export enum MonsterTraitNamesEnum {
    building = 'building',
    cave = 'cave',
    civilized = 'civilized',
    cold = 'cold',
    cursed = 'cursed',
    dark = 'dark',
    hot = 'hot',
    mountain = 'mountain',
    water = 'water',
    wilderness = 'wilderness',
}

export interface AbilitieDataInterface {
    type: 'surge' | 'action' | 'abilitie';
    cost?: number;
}

export interface MonsterData {
    [MonstersDataParametersEnum.name]: string;
    [MonstersDataParametersEnum.type]: string;
    [MonstersDataParametersEnum.act]: string;
    [MonstersDataParametersEnum.size]: string;
    [MonstersDataParametersEnum.movement]: string;
    [MonstersDataParametersEnum.wounds]: string;
    [MonstersDataParametersEnum.defenseDice]: string;
    [MonstersDataParametersEnum.attackType]: string;
    [MonstersDataParametersEnum.attackDice]: string;
    [MonstersDataParametersEnum.abilities]?: string[];
    [MonstersDataParametersEnum.actions]?: string[];
    [MonstersDataParametersEnum.surgeAbilities]?: string[];
    [MonstersDataParametersEnum.traits]?: MonsterTraitNamesEnum[];
    [MonstersDataParametersEnum.groupSize]: {
        [numberOfHeroes: string]: number;
    };
    [MonstersDataParametersEnum.br]: string;
    serialNumber?: string;
    translation?: { name?: { [key in string]: string } };
}


export interface OverlordRelicsDataAdapted {
    [key: string]: {
        [OverlordRelicDataParametersEnum.name]: string;
        [OverlordRelicDataParametersEnum.dice]?: string;
        [OverlordRelicDataParametersEnum.properties]?: string;
        [OverlordRelicDataParametersEnum.traits]?: string;
        [OverlordRelicDataParametersEnum.surgeAbilities]?: string;
        [OverlordRelicDataParametersEnum.br]: number;
        translation?: { name?: { [key in string]: string } };
    }
}

export interface ItemsDataAdapted {
    [key: string]: {
        [ItemDataParametersEnum.act]: string;
        [ItemDataParametersEnum.shoppingAct]?: string;
        [ItemDataParametersEnum.name]: string;
        [ItemDataParametersEnum.goldCost]?: string;
        [ItemDataParametersEnum.equip]?: string;
        [ItemDataParametersEnum.attackType]?: string;
        [ItemDataParametersEnum.dice]?: string;
        [ItemDataParametersEnum.tags]: string;
        [ItemDataParametersEnum.properties]?: string;
        [ItemDataParametersEnum.traits]?: string;
        [ItemDataParametersEnum.surgeAbilities]?: string;
        [ItemDataParametersEnum.br]: string;
        [ItemDataParametersEnum.translations]: {
            name: { [key in string]: string }
        };
    }
}

export type HeroesDataAdapted = {
    [key: string]: {
        name: string;
        type: string;
        speed: string;
        health: string;
        stamina: string;
        defenceDie: string;
        strength: string;
        willpower: string;
        knowledge: string;
        awareness: string;
        ability: string;
        feat: string;
        expansion: string;
        br: string;
        translation?: { name?: { [key in string]: string } };
    }
}

export interface AbilitiesDataAdaptedInterface {
    [key: string]: {
        description: string;
        translation?: {
            name?: { [language in string]: string };
            description?: { [language in string]: string };
        }
    };
}

export interface HeroClassesDataAdapted {
    [index: string]: HeroClass
}

export interface HeroClass {
    [HeroClassParametersEnum.archetype]: string,
    [HeroClassParametersEnum.className]: string,
    skills: ClassSkill;
    translation?: { name?: { [key in string]: string } };
}

export interface ClassSkill {
    [key: string]: SkillClassDataAdapted,
}

export interface SkillClassDataAdapted {
    [HeroClassParametersEnum.skillName]: string,
    [HeroClassParametersEnum.xpCost]?: number,
    [HeroClassParametersEnum.fatigueCost]?: string,
    [HeroClassParametersEnum.skillDescription]: string,
    [HeroClassParametersEnum.br]: string,
    translation?: { name?: { [key in string]: string } };
}