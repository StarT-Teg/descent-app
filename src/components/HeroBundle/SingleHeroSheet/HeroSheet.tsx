import React from "react";
import {HeroBundleView} from "../heroSheetViewComponents/HeroBundleView";
import {ItemsBundleView} from "../heroSheetViewComponents/ItemsBundleView";
import {ClassesBundleView} from "../heroSheetViewComponents/ClassesBundleView";
import {SkillsBundleView} from "../heroSheetViewComponents/SkillsBundleView";
import {HeroPlayerPicks, HeroPlayersEnum} from "../../../types";
import {useHeroesDataContext} from "../../../context/heroes-data-context";
import {
    useHeroesCurrentPicksContext,
    useHeroesCurrentPicksDispatchContext
} from "../../../context/player-picks-context";
import {CurrentHeroesPicksReducerActionsEnum} from "../../../context/player-picks-context-reducer";

export interface HeroSheetInterface {
    heroPlayerPosition: HeroPlayersEnum;
}

export default function HeroSheet({heroPlayerPosition}: HeroSheetInterface) {

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
            newHeroPicks.heroItems.forEach((item) => {
                currentBR += Number(items[item].br)
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

        if (!!itemIndex) {
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

        <div className='hero-container'>
            <div className='grid-container'>

                <div className="sub-grid">

                    <HeroBundleView
                        heroNames={heroNames}
                        handleChangeHeroName={(newHeroName) => {
                            handleChangePlayerPicks({heroName: newHeroName})
                        }}
                        type={heroName ? heroes[heroName]?.type : undefined}
                        heroPosition={heroPlayerPosition}
                    />

                    <ItemsBundleView
                        itemList={itemList}
                        heroItems={heroItems}
                        handleAddItem={handleAddItem}
                        handleRemoveItem={handleRemoveItem}
                        heroPosition={heroPlayerPosition}
                    />

                </div>

                <div className="sub-grid">

                    <ClassesBundleView
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

                    <SkillsBundleView
                        pickedSkills={heroSkills}
                        availableSkillsList={heroAvailableSkills}
                        heroPosition={heroPlayerPosition}
                        onCheckboxChange={(checkedSkillName) => {
                            const newSkills = heroSkills.includes(checkedSkillName) ? [...heroSkills?.filter((heroAddedSkill) => (heroAddedSkill !== checkedSkillName))] : [...heroSkills, checkedSkillName]
                            handleChangePlayerPicks({heroSkills: newSkills})
                        }}
                    />

                </div>
            </div>
        </div>


    )
}