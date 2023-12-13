import {ExcelDataRaw, OverlordCardsDataAdapted} from "../../types/shared";

export const overlordDecksDataAdapted = (data: ExcelDataRaw): OverlordCardsDataAdapted => {
    const decksDataAdapted: OverlordCardsDataAdapted = {};

    data.values.forEach((row, rowIndex) => {

        if (!!row[0] && ![0, 1].includes(rowIndex)) {
            const className = row[0];
            const cardName = row[1];
            const xpCost = Number(row[2]);
            const quantity = Number(row[3]);
            const type = row[4];
            const text = row[5];
            const br = parseFloat(row[6]);

            decksDataAdapted[cardName] = {
                br, className, quantity, text, type, xpCost, cardName
            }
        }
    })

    return decksDataAdapted;
}