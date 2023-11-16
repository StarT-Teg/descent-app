import {ExcelDataRaw, OverlordRelicDataParametersEnum, OverlordRelicsDataAdapted} from "../../types";

export const overlordRelicsDataAdapter = (data: ExcelDataRaw) => {
    return data.values.reduce((acc: OverlordRelicsDataAdapted, row, rowIndex) => {
        if (!!row[0] && rowIndex !== 0) {

            const relicName = row[1];

            const item: { [key in OverlordRelicDataParametersEnum]: string } = {
                [OverlordRelicDataParametersEnum.name]: relicName,
                [OverlordRelicDataParametersEnum.dice]: row[2],
                [OverlordRelicDataParametersEnum.properties]: row[4],
                [OverlordRelicDataParametersEnum.traits]: row[6],
                [OverlordRelicDataParametersEnum.surgeAbilities]: [row[8], row[10]].filter(str => !!str).join('\n'),
                [OverlordRelicDataParametersEnum.br]: row[11]
            };

            return {...acc, [relicName]: item}
        }
        return acc;
    }, {})
}