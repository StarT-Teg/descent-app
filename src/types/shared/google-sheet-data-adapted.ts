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

export interface CampaignsDataAdapted {
    [key: string]: {
        [key: string]: MissionDataAdapted,
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
    [CampaignsDataParametersEnum.openGroups]: MonsterTraitNamesEnum[],
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
        '2h': LieutenantStats;
        '3h': LieutenantStats;
        '4h': LieutenantStats;
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

    [LieutenantDataParametersEnum.br]: Number,
}

export interface LieutenantStats {
    [LieutenantDataParametersEnum.movement]: number;
    [LieutenantDataParametersEnum.wounds]: number;
    [LieutenantDataParametersEnum.defenseDice]: string;
    [LieutenantDataParametersEnum.br]: Number;
}

export interface MonstersDataAdapted {
    [key: string]: {
        'act1'?: {
            [key in MonsterTypesEnum]: MonsterData;
        }
        'act2'?: {
            [key in MonsterTypesEnum]: MonsterData;
        }

    }
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
    [MonstersDataParametersEnum.groupSize]: string;
    [MonstersDataParametersEnum.br]: string;
}


export interface OverlordRelicsDataAdapted {
    [key: string]: {
        [OverlordRelicDataParametersEnum.name]: string;
        [OverlordRelicDataParametersEnum.dice]?: string;
        [OverlordRelicDataParametersEnum.properties]?: string;
        [OverlordRelicDataParametersEnum.traits]?: string;
        [OverlordRelicDataParametersEnum.surgeAbilities]?: string;
        [OverlordRelicDataParametersEnum.br]: string;
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
    [HeroClassParametersEnum.xpCost]?: string,
    [HeroClassParametersEnum.fatigueCost]?: string,
    [HeroClassParametersEnum.skillDescription]: string,
    [HeroClassParametersEnum.br]: string,
}