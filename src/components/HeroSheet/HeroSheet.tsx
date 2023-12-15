import React from "react";
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

export default function HeroSheet() {

    const {playerRole} = useParams();
    const heroPlayerPosition = playerRole as HeroPlayersEnum;

    const {heroes, heroClasses, items} = useHeroesDataContext()

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
        heroAvailableClasses,
        heroAvailableSubclasses,
        heroAvailableSkills,
        heroItems = [],
    } = playerPicks;

    const handleChangePlayerPicks = (newPick: Partial<HeroPlayerPicks>) => {

        const heroAvailableClasses: string[] = [];
        const heroAvailableSkills: string[] = [];
        const heroAvailableSubclasses: string[] = [];
        const heroAvailableSubclassSkills: string[] = [];
        const heroItems: string[] = newPick?.heroItems || [];

        const newHeroPicks: HeroPlayerPicks = {
            ...playerPicks,
            ...newPick,
            heroAvailableClasses,
            heroAvailableSkills,
            heroAvailableSubclasses,
            heroAvailableSubclassSkills,
            heroItems,
        };

        if (!!newHeroPicks.heroName && !!heroes[newHeroPicks.heroName]) {
            for (const key in heroClasses) {
                if (heroClasses[key].archetype === heroes[newHeroPicks.heroName].type) {
                    heroAvailableClasses.push(key);
                }
            }
        } else {
            newHeroPicks.heroClassName = '';
            newHeroPicks.heroSubclassName = '';
            newHeroPicks.heroAvailableClasses = [];
            newHeroPicks.heroAvailableSubclasses = [];
            newHeroPicks.heroAvailableSkills = [];
        }

        if (!!newHeroPicks.heroClassName
            && !!heroClasses[newHeroPicks.heroClassName]
            && newHeroPicks.heroName
            && heroClasses[newHeroPicks.heroClassName].archetype === heroes[newHeroPicks.heroName].type) {
            for (const key in heroClasses[newHeroPicks.heroClassName].skills) {
                heroAvailableSkills.push(key);
            }

            switch (newHeroPicks.heroClassName) {
                case "Battlemage":
                case "Ravager":
                case "Crusader":
                    for (const key in heroClasses) {
                        if (heroClasses[key].archetype === 'Warrior') {
                            heroAvailableSubclasses.push(key);
                        }
                    }
                    break;
                case "Steelcaster":
                case "Trickster":
                case "Heretic":
                    for (const key in heroClasses) {
                        if (heroClasses[key].archetype === 'Mage') {
                            heroAvailableSubclasses.push(key);
                        }
                    }
                    break;
                case "Truthseer":
                case "Raider":
                case "Watchman":
                    for (const key in heroClasses) {
                        if (heroClasses[key].archetype === 'Scout') {
                            heroAvailableSubclasses.push(key);
                        }
                    }
                    break;
                case "Lorekeeper":
                case "Avenger":
                case "Monk":
                    for (const key in heroClasses) {
                        if (heroClasses[key].archetype === 'Healer') {
                            heroAvailableSubclasses.push(key);
                        }
                    }
                    break;
            }
        } else {
            newHeroPicks.heroClassName = '';
            newHeroPicks.heroSubclassName = '';
            newHeroPicks.heroAvailableSubclasses = [];
            newHeroPicks.heroAvailableSkills = [];
            newHeroPicks.heroSkills = [];
        }

        if (!!newHeroPicks.heroSubclassName && !!heroClasses[newHeroPicks.heroSubclassName]) {
            for (const key in heroClasses[newHeroPicks.heroSubclassName].skills) {
                heroAvailableSkills.push(key);
            }
        }

        dispatchPlayersPick({
            actionType: GameSaveReducerActionTypeEnum.changeHeroesPicks,
            payload: {
                heroesPicks: {
                    ...gameSaveContext?.heroesPicks,
                    [heroPlayerPosition]: {
                        // ...gameSaveContext.heroesPicks[heroPlayerPosition],
                        ...newHeroPicks,
                    }
                }
            }
        })
    }

    // const handleAddItem = (itemName: string, itemIndex?: number) => {
    //
    //     const newItems = !!heroItems?.length ? [...heroItems] : [];
    //
    //     if (typeof itemIndex === "number") {
    //         newItems[itemIndex] = itemName;
    //     } else {
    //         newItems.push(itemName);
    //     }
    //
    //     dispatchPlayersPick({
    //         actionType: CurrentHeroesPicksReducerActionsEnum.changePicks,
    //         playersPicks: {
    //             [heroPlayerPosition]: {
    //                 ...playerPicks,
    //                 heroItems: newItems,
    //             }
    //         }
    //     })
    // }
    //
    // const handleRemoveItem = (itemIndex: number) => {
    //
    //     const newItems = (!!heroItems?.length ? [...heroItems] : []);
    //     newItems.splice(itemIndex, 1)
    //
    //     dispatchPlayersPick({
    //         actionType: CurrentHeroesPicksReducerActionsEnum.changePicks,
    //         playersPicks: {
    //             [heroPlayerPosition]: {
    //                 ...playerPicks,
    //                 heroItems: newItems,
    //             }
    //         }
    //     })
    // }

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
            </div>
        </div>


    )
}