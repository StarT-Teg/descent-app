import {
    ExcelDataRaw,
    OverlordRelicDataParametersEnum,
    OverlordRelicsDataAdapted,
    TranslationDataAdaptedInterface
} from "../../shared";
import {floatClearing} from "../../helpers";
import {getTranslationData} from "../../helpers/translationHelpers";

export const overlordRelicsDataAdapter = (data?: ExcelDataRaw, translation?: TranslationDataAdaptedInterface) => {
    return data?.values?.reduce((acc: OverlordRelicsDataAdapted, row, rowIndex) => {
        if (!!row[0] && rowIndex !== 0) {

            const relicName = row[1];

            const item = {
                [OverlordRelicDataParametersEnum.name]: relicName,
                [OverlordRelicDataParametersEnum.dice]: row[2],
                [OverlordRelicDataParametersEnum.properties]: row[4],
                [OverlordRelicDataParametersEnum.traits]: row[6],
                [OverlordRelicDataParametersEnum.surgeAbilities]: [row[8], row[10]].filter(str => !!str).join('\n'),
                [OverlordRelicDataParametersEnum.br]: floatClearing(row[12]),
                translation: {...getTranslationData({name: relicName}, translation)},
            };

            return {...acc, [relicName]: item}
        }
        return acc;
    }, {}) || {}
}