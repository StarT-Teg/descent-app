import {ExcelDataRaw, HeroesDataAdapted, HeroParametersEnum} from "../../types";

export const heroesRawDataAdapter = (data: ExcelDataRaw, maxColumns?: number): HeroesDataAdapted => {

    const heroTemplateHeaders = Object.values(HeroParametersEnum);

    return data.values.reduce((acc: HeroesDataAdapted, row, rowIndex) => {
        if (!!row[0] && rowIndex !== 0) {

            const hero: { [key in HeroParametersEnum]: string } = {
                name: "",
                type: "",
                speed: "",
                health: "",
                stamina: "",
                defenceDie: "",
                strength: "",
                willpower: "",
                knowledge: "",
                awareness: "",
                ability: "",
                feat: "",
                expansion: "",
                br: ""
            };

            for (let i = 0; i < (maxColumns || row.length); i++) {
                hero[heroTemplateHeaders[i]] = row[i]
            }

            return {...acc, [row[0]]: hero}
        }
        return acc;
    }, {})
}