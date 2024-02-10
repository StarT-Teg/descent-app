import {ExcelDataRaw, OverlordRelicDataParametersEnum, OverlordRelicsDataAdapted} from "../../types/shared";
import {floatClearing} from "../../helpers";

export const overlordRelicsDataAdapter = (data: ExcelDataRaw) => {
    return data.values.reduce((acc: OverlordRelicsDataAdapted, row, rowIndex) => {
        if (!!row[0] && rowIndex !== 0) {

            const relicName = row[1];

            const item = {
                [OverlordRelicDataParametersEnum.name]: relicName,
                [OverlordRelicDataParametersEnum.dice]: row[2],
                [OverlordRelicDataParametersEnum.properties]: row[4],
                [OverlordRelicDataParametersEnum.traits]: row[6],
                [OverlordRelicDataParametersEnum.surgeAbilities]: [row[8], row[10]].filter(str => !!str).join('\n'),
                [OverlordRelicDataParametersEnum.br]: floatClearing(row[12])
            };

            return {...acc, [relicName]: item}
        }
        return acc;
    }, {})
}