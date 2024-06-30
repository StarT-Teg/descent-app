import {ExcelDataRaw, LieutenantActData, LieutenantDataParametersEnum, LieutenantsDataAdapted} from "../../shared";
import {floatClearing} from "../../helpers";

export const agentsDataAdapter = (data?: ExcelDataRaw): LieutenantsDataAdapted => {
    return data?.values?.reduce((acc: LieutenantsDataAdapted, row, rowIndex) => {
        if (!!row[0] && ![0, 1].includes(rowIndex)) {

            const lieutenantName = row[0];
            const lieutenantAct = row[1];
            const lieutenantSize = Number(row[2]);

            const lieutenant: LieutenantActData = {
                stats: {
                    2: {
                        [LieutenantDataParametersEnum.movement]: Number(row[5]),
                        [LieutenantDataParametersEnum.wounds]: Number(row[6]),
                        [LieutenantDataParametersEnum.defenseDice]: row[7],
                        [LieutenantDataParametersEnum.br]: floatClearing(row[8]),
                    },

                    3: {
                        [LieutenantDataParametersEnum.movement]: Number(row[9]),
                        [LieutenantDataParametersEnum.wounds]: Number(row[10]),
                        [LieutenantDataParametersEnum.defenseDice]: row[11],
                        [LieutenantDataParametersEnum.br]: floatClearing(row[12]),
                    },

                    4: {
                        [LieutenantDataParametersEnum.movement]: Number(row[13]),
                        [LieutenantDataParametersEnum.wounds]: Number(row[14]),
                        [LieutenantDataParametersEnum.defenseDice]: row[15],
                        [LieutenantDataParametersEnum.br]: floatClearing(row[16]),
                    },
                },

                [LieutenantDataParametersEnum.size]: lieutenantSize,
                [LieutenantDataParametersEnum.strength]: Number(row[17]),
                [LieutenantDataParametersEnum.knowledge]: Number(row[18]),
                [LieutenantDataParametersEnum.willpower]: Number(row[19]),
                [LieutenantDataParametersEnum.awareness]: Number(row[20]),

                [LieutenantDataParametersEnum.attackType]: row[17],
                [LieutenantDataParametersEnum.attackDice]: row[18],

                [LieutenantDataParametersEnum.traits]: row[20],
                [LieutenantDataParametersEnum.actions]: row[22],
                [LieutenantDataParametersEnum.surgeAbilities]: [row[23], row[25], row[27]].filter(str => !!str).join('\n'),

                [LieutenantDataParametersEnum.br]: floatClearing(row[33]),
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
    }, {}) || {}
}