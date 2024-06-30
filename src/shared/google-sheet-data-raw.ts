export interface ExcelDataRaw {
    values: string[][];
}

export enum CampaignsDataParametersEnum {
    campaignName = 'campaignName',
    act = 'act',
    missionName = 'missionName',
    encounterNumber = 'encounterNumber',
    lieutenants = 'lieutenants',
    monsters = 'monsters',
    openGroupsAmount = 'openGroupsAmount',
    openGroupsTraits = 'openGroupsTraits',
    isOnlySmallMonsters = 'isOnlySmallMonsters',
    cantChangeActMonsterList = 'cantChangeActMonsterList',
    translation = 'translation'
}

export enum OverlordDeckDataParametersEnum {
    className = 'className',
    cardName = 'cardName',
    xpCost = 'xpCost',
    quantity = 'quantity',
    type = 'type',
    text = 'text',
    br = 'br',
    translations = 'translations',
}

export enum LieutenantDataParametersEnum {
    name = 'name',
    act = 'act',
    size = 'size',
    expansion = 'expansion',
    description = 'description',
    movement = 'movement',
    wounds = 'wounds',
    defenseDice = 'defenseDice',
    strength = 'strength',
    willpower = 'willpower',
    knowledge = 'knowledge',
    awareness = 'awareness',
    attackType = 'attackType',
    attackDice = 'attackDice',
    abilities = 'abilities',
    actions = 'actions',
    surgeAbilities = 'surgeAbilities',
    traits = 'traits',
    br = 'br',
}

export enum MonstersDataParametersEnum {
    name = 'name',
    type = 'type',
    act = 'act',
    size = 'size',
    movement = 'movement',
    wounds = 'wounds',
    defenseDice = 'defenseDice',
    attackType = 'attackType',
    attackDice = 'attackDice',
    abilities = 'abilities',
    actions = 'actions',
    surgeAbilities = 'surgeAbilities',
    traits = 'traits',
    groupSize = 'groupSize',
    br = 'br',
}

export enum OverlordRelicDataParametersEnum {
    name = 'name',
    dice = 'dice',
    properties = 'properties',
    surgeAbilities = 'surgeAbilities',
    traits = 'traits',
    br = 'br',
}

export enum ItemDataParametersEnum {
    act = 'act',
    shoppingAct = 'shoppingAct',
    name = 'name',
    goldCost = 'goldCost',
    equip = 'equip',
    attackType = 'attackType',
    dice = 'dice',
    tags = 'tags',
    properties = 'properties',
    traits = 'traits',
    surgeAbilities = 'surgeAbilities',
    br = 'br',
    translations = 'translations',
}

export enum HeroParametersEnum {
    name = 'name',
    type = 'type',
    speed = 'speed',
    health = 'health',
    stamina = 'stamina',
    defenceDie = 'defenceDie',
    strength = 'strength',
    willpower = 'willpower',
    knowledge = 'knowledge',
    awareness = 'awareness',
    ability = 'ability',
    feat = 'feat',
    expansion = 'expansion',
    br = 'br',
}

export enum HeroClassParametersEnum {
    archetype = 'archetype',
    className = 'className',
    skillName = 'skillName',
    xpCost = 'xpCost',
    fatigueCost = 'fatigueCost',
    skillDescription = 'skillDescription',
    br = 'br',
}