import React, {useEffect, useState} from "react";
import {HeroSheetName} from "./сomponents/HeroSheetName/HeroSheetName";
import {HeroSheetItems} from "./сomponents/HeroSheetItems/HeroSheetItems";
import {HeroSheetClasses} from "./сomponents/HeroSheetClasses";
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

export default function HeroSheet() {

    const {playerRole} = useParams();
    const heroPlayerPosition = playerRole as HeroPlayersEnum;

    const {setSaveAndUpdate, isLoading} = useSetSaveAndUpdate();

    const {heroes, heroClasses, items, familiars} = useHeroesDataContext()

    const gameSaveContext = useGameSaveContext();
    const dispatchPlayersPick = useGameSaveDispatchContext();

    const playerPicks = gameSaveContext.heroesPicks[heroPlayerPosition] as HeroPlayerPicks;

    const heroNames = Object.keys(heroes);
    const itemList = Object.keys(items)

    const {
        heroName,
        heroClassName = '',
        heroSubclassName = '',
        heroSkills = [],
        heroItems = [],
    } = playerPicks;

    const [heroAvailableClasses, setHeroAvailableClasses] = useState<string[] | undefined>(undefined);
    const [heroAvailableSubclasses, setHeroAvailableSubclasses] = useState<string[] | undefined>(undefined);
    const [heroAvailableSkills, setHeroAvailableSkills] = useState<string[] | undefined>(heroSkills);
    const [heroAvailableFamiliars, setHeroAvailableFamiliars] = useState<string[] | undefined>(undefined);

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
            newHeroPicks.heroSubclassName = '';
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

        const newFamiliars: string[] = [];

        if (!!playerPicks?.heroName && !!heroes[playerPicks?.heroName]) {

            if (playerPicks.heroName === 'Vyrah the Falconer') {
                newFamiliars.push('Skye');
            }

            if (playerPicks.heroName === 'Ronan of the Wild') {
                newFamiliars.push('Pico');
            }

            if (playerPicks.heroName === 'Challara') {
                newFamiliars.push('Brightblaze');
            }

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
                case "Necromancer":
                    newFamiliars.push('Reanimate')
                    break;
                case "Geomancer":
                    newFamiliars.push('The Summoned Stone')
                    break;
                case "Beastmaster":
                    newFamiliars.push('Wolf')
                    break;
                case "Shadow Walker":
                    newFamiliars.push('Shadow Soul')
                    break;
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

        setHeroAvailableFamiliars(newFamiliars);
    }, [playerPicks, heroClasses, heroes])

    if (isLoading) {
        return <LoadingSpinner/>
    }

    return (
        <div className={styles[isMobile ? 'hero-container-mobile' : 'hero-container']}>
            <div className={isMobile ? 'grid-container-mobile' : 'grid-container'}>

                <Accordion>
                    <AccordionItem header="Hero Name/Class">
                        <HeroSheetName
                            selectedHeroName={heroName}
                            heroNames={heroNames}
                            handleChangeHeroName={(newHeroName) => {
                                handleChangePlayerPicks({heroName: newHeroName})
                            }}
                            type={heroName ? heroes[heroName]?.type : undefined}
                            heroPosition={heroPlayerPosition}
                        />

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

                        {!!heroAvailableFamiliars?.length && (
                            <fieldset>
                                <legend>Familiars</legend>

                                {heroAvailableFamiliars?.map((familiarName: string, index) => {
                                        return (
                                            <div className={styles.checkboxLine}
                                                 key={`${heroPlayerPosition}-familiar-${index}`}>
                                                <input type="checkbox"
                                                       onChange={() => {
                                                       }}
                                                       checked={heroAvailableFamiliars?.includes(familiarName)}
                                                />

                                                <input type="text" readOnly value={familiarName}
                                                       onClick={() => {
                                                       }}
                                                       className={'input'}
                                                />

                                                <div className={styles.br}>
                                                    BR: {familiars?.[familiarName]?.br || 0}
                                                </div>
                                            </div>
                                        )
                                    }
                                )
                                }
                            </fieldset>
                        )}
                    </AccordionItem>

                    <AccordionItem header='Skills' disabled={!heroAvailableSkills?.length}>
                        {!!heroAvailableSkills?.length && (

                            <div className="sub-grid">
                                <fieldset>
                                    <legend>Skills</legend>

                                    {heroAvailableSkills?.map((skillName: string, index) => {
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


                                                    <div className={styles.br}>
                                                        BR: {heroClasses?.[heroClassName]?.skills[skillName]?.br || 0}
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

                    <AccordionItem header='Items'>
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
                }}>Сохранить
                </Button>
            </div>
        </div>


    )
}