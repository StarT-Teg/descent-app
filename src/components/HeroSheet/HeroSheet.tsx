import React, {useEffect, useState} from "react";
import {HeroSheetName} from "./сomponents/HeroSheetName/HeroSheetName";
import {HeroSheetItems} from "./сomponents/HeroSheetItems/HeroSheetItems";
import {HeroSheetClasses} from "./сomponents/HeroSheetClasses/HeroSheetClasses";
import {HeroPlayerPicks, HeroPlayersEnum} from "../../shared";
import {useHeroesDataContext,} from "../../context";
import {useParams} from "react-router-dom";
import {isMobile} from 'react-device-detect';
import styles from './hero-sheet.module.css'
import {useGameSaveContext, useGameSaveDispatchContext} from "../../context/game-save-context";
import {GameSaveReducerActionTypeEnum} from "../../context/game-save-context-reducer";
import {Accordion, AccordionItem, Button} from "../shared";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {useSetSaveAndUpdate} from "../../helpers/hooks/useSetSaveAndUpdate";
import {SuggestTranslationButton} from "../SuggestTranslationButton/SuggestTranslationButton";
import {useGetControlTranslation} from "../../helpers/translationHelpers";
import {HeroSheetFamiliars} from "./сomponents/HeroSheetFamiliars/HeroSheetFamiliars";

export default function HeroSheet() {

    const {playerRole} = useParams();
    const heroPlayerPosition = playerRole as HeroPlayersEnum;

    const {setSaveAndUpdate, isLoading} = useSetSaveAndUpdate();

    const {heroes, heroClasses, items} = useHeroesDataContext()

    const gameSaveContext = useGameSaveContext();
    const dispatchPlayersPick = useGameSaveDispatchContext();

    const {getControlTranslation} = useGetControlTranslation()

    const playerPicks = gameSaveContext.heroesPicks[heroPlayerPosition] as HeroPlayerPicks;

    const itemList = Object.keys(items)

    const {
        heroClassName = '',
        heroSubclassName = '',
        heroSkills = [],
        heroItems = [],
    } = playerPicks;

    const [heroAvailableClasses, setHeroAvailableClasses] = useState<string[] | undefined>(undefined);
    const [heroAvailableSubclasses, setHeroAvailableSubclasses] = useState<string[] | undefined>(undefined);
    const [heroAvailableSkills, setHeroAvailableSkills] = useState<string[] | undefined>(heroSkills);

    const getClassListOfArchetype = (archetype: 'Warrior' | 'Mage' | 'Scout' | 'Healer') => (
        Object.values(heroClasses).filter(classData => classData.archetype === archetype).map(classData => classData.className)
    )

    const handleChangePlayerPicks = (newPick: Partial<HeroPlayerPicks>) => {

        const newHeroPicks: HeroPlayerPicks = {
            ...playerPicks,
            ...newPick,
        };

        if (!newHeroPicks?.heroName) {
            newHeroPicks.heroClassName = '';
        }

        if (!newHeroPicks.heroClassName) {
            newHeroPicks.heroClassName = '';
            newHeroPicks.heroSubclassName = '';
            newHeroPicks.heroSkills = [];
        }

        dispatchPlayersPick({
            actionType: GameSaveReducerActionTypeEnum.changeHeroesPicks,
            payload: {
                heroesPicks: {
                    ...gameSaveContext?.heroesPicks,
                    [heroPlayerPosition]: {
                        ...newHeroPicks,
                    }
                }
            }
        })
    }

    const handleSaveChanges = () => {
        setSaveAndUpdate({heroesPicks: {[heroPlayerPosition]: {...playerPicks}}})
    }

    useEffect(() => {

        if (!!playerPicks?.heroName && !!heroes[playerPicks?.heroName]) {

            setHeroAvailableClasses(
                Object.values(heroClasses)
                    .filter(classData => classData.archetype === heroes?.[playerPicks.heroName!]?.type)
                    .map(classData => (classData.className))
            )

        } else {
            setHeroAvailableClasses(undefined)
            setHeroAvailableSubclasses(undefined)
            setHeroAvailableSkills(undefined);
        }

        if (!!playerPicks.heroClassName
            && !!heroClasses[playerPicks.heroClassName]
            && playerPicks.heroName
            && heroClasses[playerPicks.heroClassName].archetype === heroes[playerPicks.heroName].type) {

            setHeroAvailableSkills(Object.keys(heroClasses[playerPicks.heroClassName].skills))

            switch (playerPicks.heroClassName) {
                case "Battlemage":
                case "Ravager":
                case "Crusader":
                    setHeroAvailableSubclasses(getClassListOfArchetype('Warrior'))
                    break;
                case "Steelcaster":
                case "Trickster":
                case "Heretic":
                    setHeroAvailableSubclasses(getClassListOfArchetype('Mage'))
                    break;
                case "Truthseer":
                case "Raider":
                case "Watchman":
                    setHeroAvailableSubclasses(getClassListOfArchetype('Scout'))
                    break;
                case "Lorekeeper":
                case "Avenger":
                case "Monk":
                    setHeroAvailableSubclasses(getClassListOfArchetype('Healer'))
                    break;
                default:
                    setHeroAvailableSubclasses(undefined);
                    break;
            }
        } else {
            setHeroAvailableSubclasses(undefined)
            setHeroAvailableSkills(undefined)
        }

        if (!!playerPicks.heroSubclassName && !!heroClasses[playerPicks.heroSubclassName]) {
            setHeroAvailableSkills(
                Object.keys(heroClasses[playerPicks.heroClassName!].skills).concat(
                    Object.keys(heroClasses[playerPicks.heroSubclassName].skills)
                )
            )
        }

    }, [playerPicks, heroClasses, heroes])

    if (isLoading) {
        return <LoadingSpinner/>
    }

    return (
        <div className={styles[isMobile ? 'hero-container-mobile' : 'hero-container']}>
            <div className={isMobile ? 'grid-container-mobile' : 'grid-container'}>

                <Accordion>
                    <AccordionItem header={getControlTranslation('Name/Class')}>
                        <HeroSheetName/>

                        <HeroSheetClasses
                            className={heroClassName}
                            subclassName={heroSubclassName}
                            classList={heroAvailableClasses}
                            subclassList={heroAvailableSubclasses}
                            handleChangeClassName={(newClassName) => {
                                handleChangePlayerPicks({heroClassName: newClassName})
                            }}
                            handleChangeSubclassName={(newSubClassName) => {
                                handleChangePlayerPicks({heroSubclassName: newSubClassName})
                            }}
                            heroPosition={heroPlayerPosition}
                        />

                        <HeroSheetFamiliars/>
                    </AccordionItem>

                    <AccordionItem header={getControlTranslation('Skills')} disabled={!heroAvailableSkills?.length}>
                        {!!heroAvailableSkills?.length && (

                            <div className="sub-grid">
                                <fieldset>
                                    <legend>{getControlTranslation('Skills')}</legend>

                                    {heroAvailableSkills?.map((skillName: string, index) => {
                                            const br = heroClasses?.[heroClassName]?.skills[skillName]?.br || heroClasses?.[heroSubclassName]?.skills[skillName]?.br || 0
                                            return (
                                                <div className={styles.checkboxLine}
                                                     key={`${heroPlayerPosition}-skillBlock-${index}`}>
                                                    <input type="checkbox" id={`${heroPlayerPosition}-skill-${skillName}`}
                                                           key={`${heroPlayerPosition}-skill-${skillName}-${index}`}
                                                           onChange={() => {
                                                               const newSkills = heroSkills.includes(skillName) ? [...heroSkills?.filter((heroAddedSkill) => (heroAddedSkill !== skillName))] : [...heroSkills, skillName]
                                                               handleChangePlayerPicks({heroSkills: newSkills})
                                                           }}

                                                           checked={heroSkills.includes(skillName)}
                                                    />

                                                    <input type="text" readOnly value={skillName}
                                                           key={`${heroPlayerPosition}-skill-${skillName}-br-${index}`}
                                                           onClick={() => {
                                                               const newSkills = heroSkills.includes(skillName) ? [...heroSkills?.filter((heroAddedSkill) => (heroAddedSkill !== skillName))] : [...heroSkills, skillName]
                                                               handleChangePlayerPicks({heroSkills: newSkills})
                                                           }}
                                                           className={'input'}
                                                    />

                                                    <SuggestTranslationButton stringToTranslate={skillName}/>

                                                    <div className={styles.br}>
                                                        BR: {br}
                                                    </div>
                                                </div>
                                            )
                                        }
                                    )
                                    }

                                </fieldset>
                            </div>

                            // <HeroSheetSkills
                            //     familiars={familiars}
                            //     pickedSkills={heroSkills}
                            //     availableSkillsList={heroAvailableSkills}
                            //     heroPosition={heroPlayerPosition}
                            //     onCheckboxChange={(checkedSkillName) => {
                            //         const newSkills = heroSkills.includes(checkedSkillName) ? [...heroSkills?.filter((heroAddedSkill) => (heroAddedSkill !== checkedSkillName))] : [...heroSkills, checkedSkillName]
                            //         handleChangePlayerPicks({heroSkills: newSkills})
                            //     }}
                            // />
                        )}
                    </AccordionItem>

                    <AccordionItem header={getControlTranslation('Items')}>
                        <HeroSheetItems
                            itemList={itemList}
                            heroItems={heroItems}
                            heroPosition={heroPlayerPosition}
                            handleChangeHeroItems={handleChangePlayerPicks}
                        />
                    </AccordionItem>
                </Accordion>

                <Button theme='outlineRed' onClick={() => {
                    handleSaveChanges()
                }}>{getControlTranslation('Save')}
                </Button>
            </div>
        </div>
    )
}