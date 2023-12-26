import React, {useEffect, useState} from "react";
import {HeroSheetName} from "./сomponents/HeroSheetName/HeroSheetName";
import {HeroSheetItems} from "./сomponents/HeroSheetItems";
import {HeroSheetClasses} from "./сomponents/HeroSheetClasses";
import {HeroSheetSkills} from "./сomponents/HeroSheetSkills";
import {HeroPlayerPicks, HeroPlayersEnum} from "../../types/shared";
import {useHeroesDataContext,} from "../../context";
import {useParams} from "react-router-dom";
import {isMobile} from 'react-device-detect';
import styles from './hero-sheet.module.css'
import {useGameSaveContext, useGameSaveDispatchContext} from "../../context/game-save-context";
import {GameSaveReducerActionTypeEnum} from "../../context/game-save-context-reducer";
import {Accordion, AccordionItem} from "../shared/Accordion/Accordion";
import {Button} from "../shared";
import {useSetGameSave} from "../../dataHooks/useSetGameSave";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function HeroSheet() {

    const {playerRole} = useParams();
    const heroPlayerPosition = playerRole as HeroPlayersEnum;

    const {heroes, heroClasses, items} = useHeroesDataContext()

    const uuid = localStorage.getItem('descent-save-game-uuid')!;
    const {mutate, isLoading} = useSetGameSave();

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
    const [heroAvailableSkills, setHeroAvailableSkills] = useState<string[] | undefined>(undefined);

    const getClassListOfArchetype = (archetype: 'Warrior' | 'Mage' | 'Scout' | 'Healer') => (
        Object.values(heroClasses).filter(classData => classData.archetype === archetype).map(classData => classData.className)
    )

    const handleChangePlayerPicks = (newPick: Partial<HeroPlayerPicks>) => {

        const heroItems: string[] = newPick?.heroItems || [];

        const newHeroPicks: HeroPlayerPicks = {
            ...playerPicks,
            ...newPick,
            heroItems,
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
        mutate({uuid, data: {heroesPicks: {[heroPlayerPosition]: {}}}})
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
                    </AccordionItem>

                    <AccordionItem header='Skills' disabled={!heroAvailableSkills?.length}>
                        {!!heroAvailableSkills?.length && (
                            <HeroSheetSkills
                                pickedSkills={heroSkills}
                                availableSkillsList={heroAvailableSkills}
                                heroPosition={heroPlayerPosition}
                                onCheckboxChange={(checkedSkillName) => {
                                    const newSkills = heroSkills.includes(checkedSkillName) ? [...heroSkills?.filter((heroAddedSkill) => (heroAddedSkill !== checkedSkillName))] : [...heroSkills, checkedSkillName]
                                    handleChangePlayerPicks({heroSkills: newSkills})
                                }}
                            />
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