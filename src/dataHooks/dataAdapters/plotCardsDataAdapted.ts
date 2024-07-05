import {ExcelDataRaw, OverlordPlotCardsDataAdapted, TranslationDataAdaptedInterface} from "../../shared";
import {getTranslationData} from "../../helpers/translationHelpers";
import {floatClearing} from "../../helpers";

export const plotCardsDataAdapted = (data?: ExcelDataRaw, translation?: TranslationDataAdaptedInterface): OverlordPlotCardsDataAdapted => {

    return data?.values.reduce((acc: OverlordPlotCardsDataAdapted, row, rowIndex) => {

        if (!!row[0] && ![0, 1].includes(rowIndex)) {
            const packName = row[0];
            const cardName = row[1];
            const buyCost = Number(row[2]);
            const playCost = Number(row[3]);
            const description = row[4];
            const br = floatClearing(row[5]);
            const translations: any = {...getTranslationData({cardName: cardName, packName: packName}, translation)}

            return {
                ...acc,
                [packName]: {
                    ...acc[packName],
                    [cardName]: {packName, cardName, buyCost, playCost, description, br, translations}
                }
            }
        }

        return {...acc}
    }, {}) || {}

}