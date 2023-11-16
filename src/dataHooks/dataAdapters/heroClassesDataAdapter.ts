import {ExcelDataRaw, HeroClassesDataAdapted,} from "../../types";

export const heroClassesDataAdapter = (data: ExcelDataRaw) => {

    const heroClassesAdapted: HeroClassesDataAdapted = {};

    data.values.forEach((row, rowIndex) => {

        if (!!row[0] && rowIndex !== 0) {
            const archetype = row[0];
            const className = row[1];
            const skillName = row[2];
            const xpCost = row[3];
            const fatigueCost = row[4];
            const skillDescription = row[5];
            const br = row[6];

            heroClassesAdapted[className] =
                {
                    archetype,
                    className,
                    skills: {
                        ...heroClassesAdapted[className]?.skills,
                        [skillName]: {
                            skillName,
                            xpCost,
                            fatigueCost,
                            skillDescription,
                            br
                        }
                    },
                }
        }
    })
    return heroClassesAdapted;
}