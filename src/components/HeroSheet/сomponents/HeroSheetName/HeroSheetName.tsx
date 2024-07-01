import React from "react";
import Select from "react-select";
import styles from './hero-sheet-name.module.css'
import {HeroPlayerPicks, HeroPlayersEnum, SelectionOptionInterface} from "../../../../shared";
import {SuggestTranslationButton} from "../../../SuggestTranslationButton/SuggestTranslationButton";
import {useGetControlTranslation} from "../../../../helpers/translationHelpers";
import {GameSaveReducerActionTypeEnum} from "../../../../context/game-save-context-reducer";
import {useParams} from "react-router-dom";
import {useGameSaveContext, useGameSaveDispatchContext} from "../../../../context/game-save-context";
import {useHeroesDataContext} from "../../../../context";
import {toSelectOption} from "../../../../helpers";

export const HeroSheetName = () => {

    const {playerRole} = useParams();
    const heroPlayerPosition = playerRole as HeroPlayersEnum;

    const {heroesPicks, language} = useGameSaveContext();
    const {heroes, heroClasses} = useHeroesDataContext();
    const {getControlTranslation} = useGetControlTranslation();
    const dispatchPlayersPick = useGameSaveDispatchContext();

    const {
        heroName: selectedHeroName,
    } = heroesPicks[heroPlayerPosition] as HeroPlayerPicks;

    const getNameTranslation = (name: string) => {
        return heroes?.[name]?.translation?.name?.[language || ''] || name;
    }

    const options: SelectionOptionInterface[] = Object.keys(heroes).sort().map(heroName => (toSelectOption(heroName, getNameTranslation(heroName || '')))!)
    const selectedHeroNameAdapted: SelectionOptionInterface | null = toSelectOption(selectedHeroName, getNameTranslation(selectedHeroName || ''))

    const handleChangeHeroName = (heroName: string) => {

        const newHeroPicks: HeroPlayerPicks = {
            ...heroesPicks[heroPlayerPosition],
            heroName
        };

        if (!newHeroPicks?.heroName) {
            newHeroPicks.heroClassName = '';
        }

        if (!newHeroPicks.heroClassName || heroClasses[newHeroPicks.heroClassName].archetype !== heroes[newHeroPicks?.heroName || ''].type) {
            newHeroPicks.heroClassName = '';
            newHeroPicks.heroSubclassName = '';
            newHeroPicks.heroSkills = [];
        }

        dispatchPlayersPick({
            actionType: GameSaveReducerActionTypeEnum.changeHeroesPicks,
            payload: {
                heroesPicks: {
                    ...heroesPicks,
                    [heroPlayerPosition]: {
                        ...newHeroPicks,
                    }
                }
            }
        })
    }

    return (
        <div className={styles["sub-grid"]}>

            <fieldset>
                <legend className={styles.legend}>{getControlTranslation('Hero Name')}</legend>

                <div className={styles.heroType}>
                    <Select
                        className={styles.select}
                        classNamePrefix="select-name"
                        value={selectedHeroNameAdapted}
                        options={options}
                        onChange={(value) => {
                            handleChangeHeroName(!!value ? value.value : '')
                        }}
                        isClearable
                        isSearchable
                        name="hero-name"
                    />

                    <SuggestTranslationButton stringToTranslate={selectedHeroName}/>

                    {/*{type && <img src={require(`/src/assets/img/archetypes/${type.toLowerCase()}.png`)}*/}
                    {/*              style={{width: '50px', height: '50px'}} alt=""/>}*/}
                </div>
            </fieldset>

        </div>
    )
}