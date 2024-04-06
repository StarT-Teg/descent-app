import {
    CampaignsDataParametersEnum,
    HeroClassParametersEnum,
    HeroParametersEnum,
    ItemDataParametersEnum,
    LieutenantDataParametersEnum,
    MonstersDataParametersEnum,
    OverlordDeckDataParametersEnum,
    OverlordRelicDataParametersEnum
} from "./google-sheet-data-raw";

export interface GameDataInterface {
    heroesData: HeroesDataAdapted,
    heroClassesData: HeroClassesDataAdapted,
    itemsData: ItemsDataAdapted,
    overlordDecksData: OverlordCardsDataAdapted,
    lieutenantsData: LieutenantsDataAdapted,
    relicsData: OverlordRelicsDataAdapted,
    monstersData: MonstersDataAdapted,
    campaignData: CampaignsDataAdapted,
    familiars: FamiliarsDataAdapted,
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
    'encounters'?: {
        [key in number]: EncounterData;
    }
}

export interface EncounterData {
    [CampaignsDataParametersEnum.encounterNumber]: number,
    [CampaignsDataParametersEnum.lieutenants]: string[],
    [CampaignsDataParametersEnum.monsters]: string[],
    [CampaignsDataParametersEnum.openGroupsAmount]: number,
    [CampaignsDataParametersEnum.openGroupsTraits]: MonsterTraitNamesEnum[],
    [CampaignsDataParametersEnum.isOnlySmallMonsters]: boolean,
    [CampaignsDataParametersEnum.cantChangeActMonsterList]: string[],
}

export interface OverlordCardsDataAdapted {
    [key: string]: OverlordDeckSkill;
}

export interface OverlordDeckSkill {
    [OverlordDeckDataParametersEnum.cardName]: string;
    [OverlordDeckDataParametersEnum.type]: string;
    [OverlordDeckDataParametersEnum.br]: number;
    [OverlordDeckDataParametersEnum.xpCost]: number;
    [OverlordDeckDataParametersEnum.text]: string;
    [OverlordDeckDataParametersEnum.className]: string;
    [OverlordDeckDataParametersEnum.quantity]: number;
}

export interface LieutenantsDataAdapted {
    [lieutenantName: string]: LieutenantData;
}

export interface LieutenantData {
    [LieutenantDataParametersEnum.name]: string;
    [LieutenantDataParametersEnum.expansion]: string,
    [LieutenantDataParametersEnum.description]: string,

    'act1'?: LieutenantActData;
    'act2'?: LieutenantActData;
}

export interface LieutenantActData {
    stats: {
        [numberOfHeroes in number]: LieutenantStats;
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
        }
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
    [MonstersDataParametersEnum.abilities]?: string;
    [MonstersDataParametersEnum.actions]?: string;
    [MonstersDataParametersEnum.surgeAbilities]?: string;
    [MonstersDataParametersEnum.traits]?: MonsterTraitNamesEnum[];
    [MonstersDataParametersEnum.groupSize]: {
        [numberOfHeroes: string]: number;
    };
    [MonstersDataParametersEnum.br]: string;
}


export interface OverlordRelicsDataAdapted {
    [key: string]: {
        [OverlordRelicDataParametersEnum.name]: string;
        [OverlordRelicDataParametersEnum.dice]?: string;
        [OverlordRelicDataParametersEnum.properties]?: string;
        [OverlordRelicDataParametersEnum.traits]?: string;
        [OverlordRelicDataParametersEnum.surgeAbilities]?: string;
        [OverlordRelicDataParametersEnum.br]: number;
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
    }
}

export interface HeroesDataAdapted {
    [key: string]: {
        [key in HeroParametersEnum]: string;
    }
}

export interface HeroClassesDataAdapted {
    [index: string]: HeroClass
}

export interface HeroClass {
    [HeroClassParametersEnum.archetype]: string,
    [HeroClassParametersEnum.className]: string,
    skills: ClassSkill;
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
}