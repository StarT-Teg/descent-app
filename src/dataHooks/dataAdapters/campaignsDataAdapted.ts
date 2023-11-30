import {CampaignsDataAdapted, ExcelDataRaw, MonsterTraitNamesEnum} from "../../types/shared";

const getCleanArrayFromString = (dirtyString: string, separator: string | RegExp = ',') => {
    if (dirtyString.length <= 0) {
        return []
    }

    return dirtyString.split(separator).map(value => value.trim());
}

export const campaignsDataAdapted = (data: ExcelDataRaw): CampaignsDataAdapted => {

    const monsterTraitsArray = Object.values(MonsterTraitNamesEnum);
    const campaignsDataAdapted: CampaignsDataAdapted = {};

    data.values.forEach((row, rowIndex) => {

        if (!!row[0] && ![0, 1, 2].includes(rowIndex)) {
            const campaignName = row[0];
            const missionName = row[1];
            const encounterNumber = Number(row[2]);
            const act = Number(row[3]);

            const lieutenants = getCleanArrayFromString(row[11]);
            const monsters = getCleanArrayFromString(row[12]);
            const openGroups = [row[14], row[15], row[16], row[17], row[18], row[19], row[20], row[21], row[22], row[23]]
                .reduce((acc: MonsterTraitNamesEnum[], item, index) => {
                    if (!!item) {
                        return [...acc, monsterTraitsArray[index]]
                    }
                    return acc
                }, []);

            campaignsDataAdapted[campaignName] = {
                ...campaignsDataAdapted[campaignName],
                [missionName]:
                    {
                        campaignName,
                        act,
                        missionName,
                        'encounters': {
                            ...campaignsDataAdapted[campaignName]?.[missionName]?.encounters,
                            [encounterNumber]: {
                                encounterNumber,
                                lieutenants,
                                monsters,
                                openGroups,
                            }
                        }
                    }
            }
        }
    })

    return campaignsDataAdapted;
}