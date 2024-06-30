import {ExcelDataRaw, ItemDataParametersEnum, ItemsDataAdapted, TranslationDataAdaptedInterface} from "../../shared";
import {getTranslationData} from "../../helpers/translationHelpers";

export const itemsDataAdapter = (data?: ExcelDataRaw, translation?: TranslationDataAdaptedInterface) => {

    if (!data) {
        return {}
    }

    return data.values.reduce((acc: ItemsDataAdapted, row, rowIndex) => {
        if (!!row[0] && rowIndex !== 0) {

            const itemName: string = row[2];

            const item: { [key in ItemDataParametersEnum]: any } = {
                [ItemDataParametersEnum.act]: row[0],
                [ItemDataParametersEnum.shoppingAct]: row[1],
                [ItemDataParametersEnum.name]: itemName,
                [ItemDataParametersEnum.goldCost]: row[3],
                [ItemDataParametersEnum.equip]: row[4],
                [ItemDataParametersEnum.attackType]: row[5],
                [ItemDataParametersEnum.dice]: row[6],
                [ItemDataParametersEnum.tags]: row[8],
                [ItemDataParametersEnum.properties]: row[9],
                [ItemDataParametersEnum.traits]: row[11],
                [ItemDataParametersEnum.surgeAbilities]: [row[13], row[15], row[17]].filter(str => !!str).join(';\n'),
                [ItemDataParametersEnum.br]: row[22],
                [ItemDataParametersEnum.translations]: {
                    ...getTranslationData({name: itemName}, translation),
                }
            };

            return {...acc, [itemName]: item}
        }
        return acc;
    }, {})
}