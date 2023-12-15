import {MonstersDataAdapted} from "../types/shared";

export const getMonsterGroupBr = (monstersData: MonstersDataAdapted, monsterName: string, amountOfHeroes: number, currentAct: string) => {
    return Object.values(monstersData?.[monsterName]?.[currentAct] || {}).reduce((brAcc: number, monsterValue) => {
        const monsterAmount = monsterValue.groupSize[String(amountOfHeroes)];
        return brAcc + (parseFloat(monsterValue.br) * monsterAmount);
    }, 0);
}