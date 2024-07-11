import {ExcelDataRaw, HeroClassesDataAdapted, TranslationDataAdaptedInterface,} from "../../shared";
import {getTranslationData} from "../../helpers/translationHelpers";

export const heroClassesDataAdapter = (data?: ExcelDataRaw, translation?: TranslationDataAdaptedInterface): HeroClassesDataAdapted => {

    const heroClassesAdapted: HeroClassesDataAdapted = {};

    if (!data) {
        return {}
    }

    data.values.forEach((row, rowIndex) => {

        if (!!row[0] && rowIndex !== 0) {
            const archetype = row[0];
            const className = row[1];
            const skillName = row[2];
            const xpCost = Number(row[3]);
            const fatigueCost = row[4];
            const skillDescription = row[5];
            const br = row[6];

            heroClassesAdapted[className] =
                {
                    archetype,
                    className,
                    translation: {
                        ...getTranslationData({name: className}, translation),
                    },
                    skills: {
                        ...heroClassesAdapted[className]?.skills,
                        [skillName]: {
                            skillName,
                            xpCost,
                            fatigueCost,
                            skillDescription,
                            br,
                            translation: {
                                ...getTranslationData({name: skillName}, translation),
                            },
                        }
                    },
                }
        }
    })
    return heroClassesAdapted;
}