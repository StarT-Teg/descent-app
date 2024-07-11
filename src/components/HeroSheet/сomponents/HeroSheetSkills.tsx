import React, {useEffect, useState} from "react";
import styles from "../hero-sheet.module.css";
import {SuggestTranslationButton} from "../../SuggestTranslationButton/SuggestTranslationButton";
import {HeroPlayerPicks, HeroPlayersEnum} from "../../../shared";
import {useParams} from "react-router-dom";
import {useBrFunctions} from "../../../helpers/hooks/useBrFunctions";
import {useGameSaveContext, useGameSaveDispatchContext} from "../../../context/game-save-context";
import {useGetControlTranslation} from "../../../helpers/translationHelpers";
import {GameSaveReducerActionTypeEnum} from "../../../context/game-save-context-reducer";
import {useHeroesDataContext} from "../../../context";
import {BrButton} from "../../BrButton/BrButton";

export const HeroSheetSkills = () => {

    const {playerRole} = useParams();
    const heroPlayerPosition = playerRole as HeroPlayersEnum;

    const {heroClasses} = useHeroesDataContext()
    const {heroesPicks, language} = useGameSaveContext();
    const dispatchPlayersPick = useGameSaveDispatchContext();

    const playerPicks = heroesPicks[heroPlayerPosition] as HeroPlayerPicks;

    const {getSkillBr} = useBrFunctions();
    const {getControlTranslation} = useGetControlTranslation();


    const {
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
            <legend>{getControlTranslation('Skills')}</legend>

            {heroAvailableSkills?.map((skillName: string, index) => {
                    const br = Math.round(getSkillBr(skillName));
                    return (
                        <div className={styles.checkboxLine}
                             key={`${heroPlayerPosition}-skillBlock-${index}`}>
                            <input type="checkbox" id={`${heroPlayerPosition}-skill-${skillName}`}
                                   key={`${heroPlayerPosition}-skill-${skillName}-${index}`}
                                   onChange={() => {
                                       const newSkills = heroSkills.includes(skillName) ? [...heroSkills?.filter((heroAddedSkill) => (heroAddedSkill !== skillName))] : [...heroSkills, skillName]
                                       handleChangeHeroSkills([...newSkills])
                                   }}
                                   checked={heroSkills.includes(skillName)}
                            />

                            <input type="text" readOnly value={getSkillNameTranslation(skillName)}
                                   key={`${heroPlayerPosition}-skill-${skillName}-br-${index}`}
                                   onClick={() => {
                                       const newSkills = heroSkills.includes(skillName) ? [...heroSkills?.filter((heroAddedSkill) => (heroAddedSkill !== skillName))] : [...heroSkills, skillName]
                                       handleChangeHeroSkills(newSkills)
                                   }}
                                   className={'input'}
                            />

                            <SuggestTranslationButton stringToTranslate={skillName}/>

                            <BrButton br={br}></BrButton>
                        </div>
                    )
                }
            )
            }

        </fieldset>
    )
}