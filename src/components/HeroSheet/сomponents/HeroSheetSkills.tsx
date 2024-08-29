import React, {useEffect, useState} from "react";
import {HeroPlayerPicks, HeroPlayersEnum} from "../../../shared";
import {useParams} from "react-router-dom";
import {useBrFunctions} from "../../../helpers/hooks/useBrFunctions";
import {useGameSaveContext, useGameSaveDispatchContext} from "../../../context/game-save-context";
import {useGetControlTranslation} from "../../../helpers/translationHelpers";
import {GameSaveReducerActionTypeEnum} from "../../../context/game-save-context-reducer";
import {useHeroesDataContext} from "../../../context";
import {useOverlordDataContext} from "../../../context/overlord-data-context";
import {InputLine} from "../../shared/InputLine/InputLine";

export const HeroSheetSkills = () => {

    const {playerRole} = useParams();
    const heroPlayerPosition = playerRole as HeroPlayersEnum;

    const {campaignsData} = useOverlordDataContext();
    const {heroClasses} = useHeroesDataContext()
    const {heroesPicks, language, campaignProgressPicks} = useGameSaveContext();
    const dispatchPlayersPick = useGameSaveDispatchContext();

    const playerPicks = heroesPicks[heroPlayerPosition] as HeroPlayerPicks;
    const availableXp = Object.keys(campaignProgressPicks?.availableMissions || {})?.reduce((acc: number, missionName) => {
        if (!campaignProgressPicks?.availableMissions?.[missionName]) {
            return acc;
        }

        if (campaignProgressPicks?.availableMissions?.[missionName] === 'heroes') {
            return acc + (campaignsData?.[campaignProgressPicks?.selectedCampaign || '']?.[missionName]?.rewards?.xpRewardHeroWin || 0)
        }

        return acc + (campaignsData?.[campaignProgressPicks?.selectedCampaign || '']?.[missionName]?.rewards?.xpRewardHeroDefeat || 0)
    }, 0)

    const {getSkillBr} = useBrFunctions();
    const {getControlTranslation} = useGetControlTranslation();


    const {
        heroClassName,
        heroSkills = [],
    } = playerPicks;

    const skillList = Object.values(heroClasses).reduce((acc: { [key in string]?: { name?: { [key in string]?: string } } }, classData) => {
        const skills = Object.values(classData.skills).reduce((acc: { [key in string]?: { name?: { [key in string]?: string } } }, skillData) => ({
            ...acc,
            [skillData.skillName]: skillData.translation
        }), {});
        return {...acc, ...skills}
    }, {})

    const [heroAvailableSkills, setHeroAvailableSkills] = useState<string[] | undefined>(heroSkills);

    const getSkillNameTranslation = (skillName: string) => (skillList?.[skillName]?.name?.[language] || skillName)

    const handleChangeHeroSkills = (heroSkills: string[]) => {
        dispatchPlayersPick({
            actionType: GameSaveReducerActionTypeEnum.changeHeroesPicks,
            payload: {
                heroesPicks: {
                    [heroPlayerPosition]: {
                        ...playerPicks,
                        heroSkills,
                    }
                }
            }
        })
    }

    useEffect(() => {

        const classSkillList = Object.keys(heroClasses[playerPicks?.heroClassName || '']?.skills || {});
        const subclassSkillList = Object.keys(heroClasses[playerPicks?.heroSubclassName || '']?.skills || {})

        setHeroAvailableSkills([...classSkillList, ...subclassSkillList])

    }, [playerPicks.heroClassName, heroClasses])

    if (!heroAvailableSkills?.length) {
        return null;
    }

    return (
        <fieldset>
            <legend>{getControlTranslation('Skills')} - {availableXp}xp</legend>

            {heroAvailableSkills?.sort((skillA, skillB) => {
                const skillAXp = heroClasses?.[heroClassName || '']?.skills?.[skillA].xpCost || 0;
                const skillBXp = heroClasses?.[heroClassName || '']?.skills?.[skillB].xpCost || 0;

                return skillAXp - skillBXp;
            })?.map((skillName: string, index) => {
                    const br = Math.round(getSkillBr(skillName));

                    return (
                        <InputLine
                            checkboxProps={[{
                                checked: heroSkills.includes(skillName),
                                onChange: () => {
                                    const newSkills = heroSkills.includes(skillName) ? [...heroSkills?.filter((heroAddedSkill) => (heroAddedSkill !== skillName))] : [...heroSkills, skillName]
                                    handleChangeHeroSkills([...newSkills])
                                }
                            }]}
                            inputProps={{
                                inputValue: getSkillNameTranslation(skillName),
                                onClick: () => {
                                    const newSkills = heroSkills.includes(skillName) ? [...heroSkills?.filter((heroAddedSkill) => (heroAddedSkill !== skillName))] : [...heroSkills, skillName]
                                    handleChangeHeroSkills(newSkills)
                                }
                            }}
                            suggestTranslationProps={{stringToTranslate: skillName}}
                            brButtonProps={{br}}
                            key={`${heroPlayerPosition}-skillBlock-${index}`}
                        />
                    )
                }
            )
            }

        </fieldset>
    )
}