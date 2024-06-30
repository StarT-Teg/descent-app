import {AbilitiesDataAdaptedInterface, ExcelDataRaw, TranslationDataAdaptedInterface} from "../../shared";
import {getAbilityNameUnified, getTranslationData} from "../../helpers/translationHelpers";

export const abilitiesDataAdapted = (data?: ExcelDataRaw, translation?: TranslationDataAdaptedInterface): AbilitiesDataAdaptedInterface => {
    return data?.values?.reduce((acc: AbilitiesDataAdaptedInterface, row, rowIndex) => {
        if (!row[0] || !row[1] || rowIndex === 0) {
            return {...acc};
        }

        const abilityName = getAbilityNameUnified(row[0]);
        const abilityDescription = row[1];


        return {
            ...acc, [abilityName]: {
                description: abilityDescription,
                translation: {...getTranslationData({name: abilityName, description: abilityDescription}, translation)},
            }
        }
    }, {}) || {}
}