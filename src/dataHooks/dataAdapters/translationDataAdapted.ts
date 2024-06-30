import {ExcelDataRaw, TranslationDataAdaptedInterface} from "../../shared";

export const translationDataAdapted = (data?: ExcelDataRaw): TranslationDataAdaptedInterface | undefined => {

    return data?.values?.reduce((acc: TranslationDataAdaptedInterface, row: string[], index, fullArray) => {

        if (index === 0 || row.length <= 1) {
            return ({
                ...acc,
            })
        }

        const languageArray = fullArray?.[0];
        const translationName = row[0]

        return ({
            ...acc,
            [translationName]: {
                ...languageArray.reduce((acc, language, index)=>{
                    if (index === 0) {
                        return {...acc}
                    }
                    return {
                        ...acc,
                        [language]: row[index]
                    }
                }, {}),
            },
        })
    }, {});
}