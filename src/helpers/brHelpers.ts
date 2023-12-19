import {
    CampaignPicksInterface,
    CurrentOverlordPicks,
    HeroClassesDataAdapted,
    HeroesDataAdapted,
    HeroPlayerPicks,
    ItemsDataAdapted,
    MonstersDataAdapted,
    OverlordCardsDataAdapted
} from "../types/shared";

export const getMonsterGroupBr = (monstersData: MonstersDataAdapted, monsterName: string, amountOfHeroes: number, currentAct: string) => {
    return Object.values(monstersData?.[monsterName]?.[currentAct] || {}).reduce((brAcc: number, monsterValue) => {
        const monsterAmount = monsterValue.groupSize[String(amountOfHeroes)];
        return brAcc + (parseFloat(monsterValue.br) * monsterAmount);
    }, 0);
}

export const getHeroBr = (heroes: HeroesDataAdapted, heroClasses: HeroClassesDataAdapted, items: ItemsDataAdapted, heroPicks: HeroPlayerPicks): number => {
    let heroBr: number = 0;

    if (!!heroPicks?.heroName) {
        heroBr += parseFloat(heroes[heroPicks?.heroName].br);
    }

    if (!!heroPicks?.heroSkills?.length) {
        Object.keys(heroClasses).forEach((className) => {
            Object.keys(heroClasses[className].skills).forEach((skillName) => {
                if (heroPicks.heroSkills?.includes(skillName)) {
                    console.log('skill Br: ', parseFloat(heroClasses[className].skills[skillName].br))
                    heroBr += parseFloat(heroClasses[className].skills[skillName].br)
                }
            })
        })
    }

    if (!!heroPicks.heroItems?.length) {
        Object.keys(items).forEach((itemName) => {
            if (heroPicks.heroItems?.includes(itemName)) {
                console.log('item BR:', parseFloat(items[itemName].br))
                heroBr += parseFloat(items[itemName].br);
            }
        })
    }

    return Math.floor(heroBr);
}

export const getOverlordBr = (overlordCards: OverlordCardsDataAdapted, monsters: MonstersDataAdapted, campaignPicks: CampaignPicksInterface, overlordPicks: CurrentOverlordPicks, heroesAmount: number) => {
    let overlordBr = 0;

    if (!Object.keys(overlordPicks).length) {
        return overlordBr;
    }

    if (!!overlordPicks.pickedCards?.length) {
        overlordPicks.pickedCards.forEach(cardName => {
            overlordBr += overlordCards[cardName].br;
        })
    }

    if (!!overlordPicks.pickedMonsters?.length && !!campaignPicks?.selectedAct) {
        overlordPicks.pickedMonsters.forEach(monsterName => {
            overlordBr += getMonsterGroupBr(monsters, monsterName, heroesAmount, `act${campaignPicks.selectedAct}`);
        })
    }

    return overlordBr;
}