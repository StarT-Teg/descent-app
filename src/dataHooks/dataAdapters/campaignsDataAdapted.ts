import {CampaignsDataAdapted, ExcelDataRaw, MonsterTraitNamesEnum, TranslationDataAdaptedInterface} from "../../shared";
import {getTranslationData} from "../../helpers/translationHelpers";

const getCleanArrayFromString = (dirtyString?: string, separator: string | RegExp = ',') => {
    if (!dirtyString) {
        return []
    }

    return dirtyString.split(separator).map(value => value.trim());
}

export const campaignsDataAdapted = (data?: ExcelDataRaw, translation?: TranslationDataAdaptedInterface): CampaignsDataAdapted => {

    const monsterTraitsArray = Object.values(MonsterTraitNamesEnum);
    const campaignsDataAdapted: CampaignsDataAdapted = {};

    if (!data) {
        return {}
    }

    data.values.forEach((row, rowIndex) => {

        if (!!row[0] && ![0, 1, 2].includes(rowIndex)) {
            const campaignName = row[0];
            const missionName = row[1];
            const missionType = row[2]?.toLowerCase();
            const encounterNumber = row[3];
            const act = Number(row[4]);

            const xpRewardHeroWin = !!row[6] ? Number(row[6]) : undefined;
            const xpRewardHeroDefeat = !!row[9] ? Number(row[9]) : undefined;
            const xpRewardOverlordWin = !!row[11] ? Number(row[11]) : undefined;
            const xpRewardOverlordDefeat = !!row[13] ? Number(row[13]) : undefined;

            const act2MissionNameHeroWin = row[8]
            const act2MissionNameOverlordWin = row[12]

            const lieutenants = getCleanArrayFromString(row[14]);
            const monsters = getCleanArrayFromString(row[15]);
            const openGroupsAmount = Number(row[16]);
            const openGroupsTraits = [row[17], row[18], row[19], row[20], row[21], row[22], row[23], row[24], row[25], row[26]]
                .reduce((acc: MonsterTraitNamesEnum[], item, index) => {
                    if (!!item) {
                        return [...acc, monsterTraitsArray[index]]
                    }
                    return acc
                }, []);
            const isOnlySmallMonsters = !!row[27]?.trim()
            const cantChangeActMonsterList: string[] = getCleanArrayFromString(row?.[28]);
            const optionalUnits = getCleanArrayFromString(row?.[29]);

            campaignsDataAdapted[campaignName] = {
                ...campaignsDataAdapted[campaignName],
                [missionName]:
                    {
                        ...campaignsDataAdapted?.[campaignName]?.[missionName],
                        campaignName,
                        act,
                        missionName,
                        missionType,
                        act2MissionNameHeroWin,
                        act2MissionNameOverlordWin,
                        rewards: {
                            xpRewardHeroWin,
                            xpRewardHeroDefeat,
                            xpRewardOverlordWin,
                            xpRewardOverlordDefeat,
                        },
                        'encounters': {
                            ...campaignsDataAdapted[campaignName]?.[missionName]?.encounters,
                            [encounterNumber]: {
                                encounterNumber,
                                lieutenants,
                                monsters,
                                openGroupsAmount,
                                openGroupsTraits,
                                isOnlySmallMonsters,
                                cantChangeActMonsterList,
                                optionalUnits,
                            }
                        },
                        translation: {
                            ...getTranslationData({
                                campaignName,
                                missionName,
                                act2MissionNameHeroWin,
                                act2MissionNameOverlordWin,
                            }, translation),
                        }
                    }
            }
        }
    })

    return campaignsDataAdapted;
}