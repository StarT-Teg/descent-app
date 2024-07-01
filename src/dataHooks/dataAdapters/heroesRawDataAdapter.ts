import {ExcelDataRaw, HeroesDataAdapted, TranslationDataAdaptedInterface} from "../../shared";
import {getTranslationData} from "../../helpers/translationHelpers";

export const heroesRawDataAdapter = (data?: ExcelDataRaw, translation?: TranslationDataAdaptedInterface): HeroesDataAdapted => {

    if (!data?.values) {
        return {}
    }

    return data.values.reduce((acc: HeroesDataAdapted, row, rowIndex) => {
        if (!!row[0] && rowIndex !== 0) {

            const name = row[0]

            const heroData = {
                name,
                type: row[1],
                speed: row[2],
                health: row[3],
                stamina: row[4],
                defenceDie: row[5],
                strength: row[6],
                willpower: row[7],
                knowledge: row[8],
                awareness: row[9],
                ability: row[10],
                feat: row[11],
                expansion: row[12],
                br: row[13],
                translation: {
                    ...getTranslationData({name}, translation),
                },
            };

            return {...acc, [name]: heroData}
        }
        return acc;
    }, {})
}