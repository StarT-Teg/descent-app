import {
    ExcelDataRaw,
    LieutenantActData,
    LieutenantDataParametersEnum,
    LieutenantsDataAdapted
} from "../../types/shared";

export const lieutenantsDataAdapter = (data: ExcelDataRaw): LieutenantsDataAdapted => {

    return data.values.reduce((acc: LieutenantsDataAdapted, row, rowIndex) => {
        if (!!row[0] && ![0, 1].includes(rowIndex)) {

            const lieutenantName = row[0];
            const lieutenantAct = row[1];


            const lieutenant: LieutenantActData = {
                stats: {
                    '2h': {
                        [LieutenantDataParametersEnum.movement]: Number(row[5]),
                        [LieutenantDataParametersEnum.wounds]: Number(row[6]),
                        [LieutenantDataParametersEnum.defenseDice]: row[7],
                        [LieutenantDataParametersEnum.br]: parseFloat(row[8]),
                    },

                    '3h': {
                        [LieutenantDataParametersEnum.movement]: Number(row[9]),
                        [LieutenantDataParametersEnum.wounds]: Number(row[10]),
                        [LieutenantDataParametersEnum.defenseDice]: row[11],
                        [LieutenantDataParametersEnum.br]: parseFloat(row[12]),
                    },

                    '4h': {
                        [LieutenantDataParametersEnum.movement]: Number(row[13]),
                        [LieutenantDataParametersEnum.wounds]: Number(row[14]),
                        [LieutenantDataParametersEnum.defenseDice]: row[15],
                        [LieutenantDataParametersEnum.br]: parseFloat(row[16]),
                    },
                },

                [LieutenantDataParametersEnum.size]: Number(row[2]),
                [LieutenantDataParametersEnum.strength]: Number(row[17]),
                [LieutenantDataParametersEnum.knowledge]: Number(row[18]),
                [LieutenantDataParametersEnum.willpower]: Number(row[19]),
                [LieutenantDataParametersEnum.awareness]: Number(row[20]),

                [LieutenantDataParametersEnum.attackType]: row[21],
                [LieutenantDataParametersEnum.attackDice]: row[22],

                [LieutenantDataParametersEnum.traits]: row[24],
                [LieutenantDataParametersEnum.actions]: row[26],
                [LieutenantDataParametersEnum.surgeAbilities]: [row[28], row[30], row[32]].filter(str => !!str).join('\n'),

                [LieutenantDataParametersEnum.br]: parseFloat(row[37]),
            }


            return {
                ...acc, [lieutenantName]: {
                    ...acc[lieutenantName],

                    [LieutenantDataParametersEnum.name]: lieutenantName,
                    [LieutenantDataParametersEnum.expansion]: row[3],
                    [LieutenantDataParametersEnum.description]: row[4],
                    ['act' + lieutenantAct]: lieutenant
                }
            }
        }
        return acc;
    }, {})
}