import {ExcelDataRaw, ItemDataParametersEnum, ItemsDataAdapted} from "../../types";

export const itemsDataAdapter = (data: ExcelDataRaw) => {
    return data.values.reduce((acc: ItemsDataAdapted, row, rowIndex) => {
        if (!!row[0] && rowIndex !== 0) {

            const item: { [key in ItemDataParametersEnum]: string } = {
                [ItemDataParametersEnum.act]: row[0],
                [ItemDataParametersEnum.shoppingAct]: row[1],
                [ItemDataParametersEnum.name]: row[2],
                [ItemDataParametersEnum.goldCost]: row[3],
                [ItemDataParametersEnum.equip]: row[4],
                [ItemDataParametersEnum.attackType]: row[5],
                [ItemDataParametersEnum.dice]: row[6],
                [ItemDataParametersEnum.tags]: row[8],
                [ItemDataParametersEnum.properties]: row[9],
                [ItemDataParametersEnum.traits]: row[11],
                [ItemDataParametersEnum.surgeAbilities]: [row[13], row[15], row[17]].filter(str => !!str).join(';\n'),
                [ItemDataParametersEnum.br]: row[20]
            };

            return {...acc, [row[2]]: item}
        }
        return acc;
    }, {})
}