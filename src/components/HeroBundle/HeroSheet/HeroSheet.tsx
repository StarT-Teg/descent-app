import React from "react";
import {HeroSheetName} from "./сomponents/HeroSheetName/HeroSheetName";
import {HeroSheetItems} from "./сomponents/HeroSheetItems";
import {HeroSheetClasses} from "./сomponents/HeroSheetClasses";
import {HeroSheetSkills} from "./сomponents/HeroSheetSkills";
import {HeroPlayerPicks, HeroPlayersEnum} from "../../../types/shared";
import {
    useHeroesCurrentPicksContext,
    useHeroesCurrentPicksDispatchContext,
    useHeroesDataContext,
    CurrentHeroesPicksReducerActionsEnum
} from "../../../context";
import {Link, useParams} from "react-router-dom";
import {isMobile} from 'react-device-detect';
import styles from './hero-sheet.module.css'

export default function HeroSheet() {

    const { playerRole } = useParams();
    const heroPlayerPosition = playerRole as HeroPlayersEnum;

    const {heroes, heroClasses, items} = useHeroesDataContext()
    const playerPicks = useHeroesCurrentPicksContext(heroPlayerPosition) as HeroPlayerPicks;
    const dispatchPlayersPick = useHeroesCurrentPicksDispatchContext();

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

        let currentBR = 0;

        const heroAvailableClasses: string[] = [];
        const heroAvailableSkills: string[] = [];
        const heroAvailableSubclasses: string[] = [];
        const heroAvailableSubclassSkills: string[] = [];

        const newHeroPicks: HeroPlayerPicks = {
            ...playerPicks,
            ...newPick,
            currentBR,
            heroAvailableClasses,
            heroAvailableSkills,
            heroAvailableSubclasses,
            heroAvailableSubclassSkills,
        };

        if (!!newHeroPicks.heroName && !!heroes[newHeroPicks.heroName]) {
            for (const key in heroClasses) {
                if (heroClasses[key].archetype === heroes[newHeroPicks.heroName].type) {
                    currentBR += Number(heroes[newHeroPicks.heroName].br)
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

        if (!!newHeroPicks.heroClassName && !!heroClasses[newHeroPicks.heroClassName]) {
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
        }

        if (!!newHeroPicks.heroSubclassName && !!heroClasses[newHeroPicks.heroSubclassName]) {
            for (const key in heroClasses[newHeroPicks.heroSubclassName].skills) {
                heroAvailableSkills.push(key);
            }}

        if (!!newHeroPicks.heroItems) {
            newHeroPicks.heroItems.forEach((itemName) => {
                if(!!itemName) {
                    currentBR += Number(items[itemName].br)
                }
            })
        }

        dispatchPlayersPick({
            actionType: CurrentHeroesPicksReducerActionsEnum.changePicks,
            playersPicks: {
                [heroPlayerPosition]: {
                    ...newHeroPicks,
                }
            }
        })
    }

    const handleAddItem = (itemName: string, itemIndex?: number) => {

        const newItems = heroItems.length ? [...heroItems] : [];

        if (typeof itemIndex === "number") {
            newItems[itemIndex] = itemName;
        } else {
            newItems.push(itemName);
        }

        dispatchPlayersPick({
            actionType: CurrentHeroesPicksReducerActionsEnum.changePicks,
            playersPicks: {
                [heroPlayerPosition]: {
                    ...playerPicks,
                    heroItems: newItems,
                }
            }
        })
    }

    const handleRemoveItem = (itemIndex: number) => {

        dispatchPlayersPick({
            actionType: CurrentHeroesPicksReducerActionsEnum.changePicks,
            playersPicks: {
                [heroPlayerPosition]: {
                    ...playerPicks,
                    heroItems: [...heroItems].splice(itemIndex, 1),
                }
            }
        })
    }

    return (
        <div className={styles[isMobile ? 'hero-container-mobile' : 'hero-container']}>

            <Link  to={`/`}>Back</Link>

            <div className={isMobile ? 'grid-container-mobile' : 'grid-container'}>
                <div className="sub-grid">
                    <HeroSheetName
                        selectedHeroName={heroName}
                        heroNames={heroNames}
                        handleChangeHeroName={(newHeroName) => {
                            handleChangePlayerPicks({heroName: newHeroName})
                        }}
                        type={heroName ? heroes[heroName]?.type : undefined}
                        heroPosition={heroPlayerPosition}
                    />
                </div>

                <div className="sub-grid">

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

                    <HeroSheetSkills
                        pickedSkills={heroSkills}
                        availableSkillsList={heroAvailableSkills}
                        heroPosition={heroPlayerPosition}
                        onCheckboxChange={(checkedSkillName) => {
                            const newSkills = heroSkills.includes(checkedSkillName) ? [...heroSkills?.filter((heroAddedSkill) => (heroAddedSkill !== checkedSkillName))] : [...heroSkills, checkedSkillName]
                            handleChangePlayerPicks({heroSkills: newSkills})
                        }}
                    />

                </div>

                <HeroSheetItems
                    itemList={itemList}
                    heroItems={heroItems}
                    handleAddItem={handleAddItem}
                    handleRemoveItem={handleRemoveItem}
                    heroPosition={heroPlayerPosition}
                />
            </div>
        </div>


    )
}