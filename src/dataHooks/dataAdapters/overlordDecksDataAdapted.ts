import {ExcelDataRaw, OverlordDecksDataAdapted} from "../../types/shared";

export const overlordDecksDataAdapted = (data: ExcelDataRaw) => {
    const decksDataAdapted: OverlordDecksDataAdapted = {};

    data.values.forEach((row, rowIndex) => {

        if (!!row[0] && ![0, 1].includes(rowIndex)) {
            const className = row[0];
            const skillName = row[1];
            const xpCost = Number(row[2]);
            const quantity = Number(row[3]);
            const type = row[4];
            const text = row[5];
            const br = parseFloat(row[6]);

            decksDataAdapted[className] = {
                ...decksDataAdapted[className],
                [skillName]:
                    {
                        br, className, quantity, text, type, xpCost,
                        skillName
                    }
            }
        }
    })

    return decksDataAdapted;
}