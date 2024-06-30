import {ExcelDataRaw, MonstersDataAdapted, MonstersDataParametersEnum, MonsterTraitNamesEnum} from "../../shared";

export const monstersDataAdapter = (data?: ExcelDataRaw): MonstersDataAdapted => {

    return data?.values?.reduce((acc: MonstersDataAdapted, row, rowIndex) => {
        if (!!row[0] && ![0, 1].includes(rowIndex)) {

            const monsterTraitsArray = Object.values(MonsterTraitNamesEnum);

            const monsterName = row[0];
            const monsterType = row[1].toLowerCase();
            const monsterAct = 'act' + row[3];

            const item = {
                [MonstersDataParametersEnum.name]: monsterName,
                [MonstersDataParametersEnum.type]: monsterType,
                serialNumber: row[2],
                [MonstersDataParametersEnum.act]: monsterAct,
                [MonstersDataParametersEnum.size]: row[4],
                [MonstersDataParametersEnum.movement]: row[5],
                [MonstersDataParametersEnum.wounds]: row[6],
                [MonstersDataParametersEnum.defenseDice]: row[7],
                [MonstersDataParametersEnum.attackType]: row[9],
                [MonstersDataParametersEnum.attackDice]: row[10],
                [MonstersDataParametersEnum.abilities]: row[12]?.split(', ')?.filter(str => !!str),
                [MonstersDataParametersEnum.actions]: row[14]?.split(', ')?.filter(str => !!str),
                [MonstersDataParametersEnum.surgeAbilities]: [row[16], row[18], row[20]]?.filter(str => !!str),
                [MonstersDataParametersEnum.traits]: [row[25], row[26], row[27], row[28], row[29], row[30], row[31], row[32], row[33], row[34]]
                    .reduce((acc: string[], item, index) => {
                        if (!!item) {
                            return [...acc, monsterTraitsArray[index]]
                        }
                        return acc
                    }, []),
                [MonstersDataParametersEnum.groupSize]: {
                    '2': Number(row[35]),
                    '3': Number(row[37]),
                    '4': Number(row[39])
                },
                [MonstersDataParametersEnum.br]: row[42],
            };

            return {
                ...acc,
                [monsterName]: {
                    ...acc[monsterName],
                    [monsterAct]: {
                        ...acc[monsterName]?.[monsterAct],
                        [monsterType]: {
                            ...item
                        }
                    }
                }
            }
        }
        return acc;
    }, {}) || {}
}