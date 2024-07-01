import {ExcelDataRaw, FamiliarsDataAdapted, TranslationDataAdaptedInterface,} from "../../shared";
import {floatClearing} from "../../helpers";
import {getTranslationData} from "../../helpers/translationHelpers";

export const familiarsDataAdapted = (data?: ExcelDataRaw, translationData?: TranslationDataAdaptedInterface): FamiliarsDataAdapted => {

    const familiarsDataAdapted: FamiliarsDataAdapted = {};

    data?.values.forEach((row, rowIndex) => {

        if (!!row[0] && rowIndex !== 0) {
            const source = row[0];
            const name = row[1];
            const size = Number(row[3]);
            const movement = Number(row[4]);
            const wounds = Number(row[5]);
            const defenseDice = row[6];
            const attackType = row[8];
            const attackDice = row[9];
            const surgeAbilities = row[12];
            const br = Math.round(floatClearing(row[15]));
            const translation = {
                ...getTranslationData({name}, translationData),
            }

            familiarsDataAdapted[name] = {
                source,
                attackDice,
                attackType,
                defenseDice,
                movement,
                name,
                size,
                surgeAbilities,
                wounds,
                br,
                translation,
            }
        }
    })

    return familiarsDataAdapted;
}