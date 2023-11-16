import {ExcelDataRaw, MonstersDataAdapted, MonstersDataParametersEnum, MonsterTraitNamesEnum} from "../../types";

export const monstersDataAdapter = (data: ExcelDataRaw) => {

    return data.values.reduce((acc: MonstersDataAdapted, row, rowIndex) => {
        if (!!row[0] && ![0, 1].includes(rowIndex)) {

            const monsterTraitsArray = Object.values(MonsterTraitNamesEnum);

            const monsterName = row[0];
            const monsterType = row[1].toLowerCase();
            const monsterAct = row[3];

            const item = {
                [MonstersDataParametersEnum.name]: monsterName,
                [MonstersDataParametersEnum.type]: monsterType,
                [MonstersDataParametersEnum.act]: monsterAct,
                [MonstersDataParametersEnum.size]: row[4],
                [MonstersDataParametersEnum.movement]: row[5],
                [MonstersDataParametersEnum.wounds]: row[6],
                [MonstersDataParametersEnum.defenseDice]: row[7],
                [MonstersDataParametersEnum.attackType]: row[9],
                [MonstersDataParametersEnum.attackDice]: row[10],
                [MonstersDataParametersEnum.abilities]: row[12],
                [MonstersDataParametersEnum.actions]: row[14],
                [MonstersDataParametersEnum.surgeAbilities]: [row[16], row[18], row[20]].filter(str => !!str).join('\n'),
                [MonstersDataParametersEnum.traits]: [row[25], row[26], row[27], row[28], row[29], row[30], row[31], row[32], row[33], row[34]]
                    .reduce((acc: string[], item, index) => {
                        if (!!item) {
                            return [...acc, monsterTraitsArray[index]]
                        }
                        return acc
                    }, []),
                [MonstersDataParametersEnum.groupSize]: {
                    '2': row[35],
                    '3': row[37],
                    '4': row[39]
                },
                [MonstersDataParametersEnum.br]: row[42],
            };



            return {
                ...acc, [monsterName]: {
                    ...acc[monsterName],
                    ['act' + monsterAct]: {
                        ...acc[monsterName]?.act1,
                        ...acc[monsterName]?.act2,
                        [monsterType]: {
                            ...item
                        }
                    }
                }
            }
        }
        return acc;
    }, {})
}