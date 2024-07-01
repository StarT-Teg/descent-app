import React from "react";
import Select from "react-select";
import {HeroPlayerPicks, HeroPlayersEnum, SelectionOptionInterface} from "../../../../shared";
import {SuggestTranslationButton} from "../../../SuggestTranslationButton/SuggestTranslationButton";
import styles from './hero-sheet-classes.module.css'
import {useGameSaveContext} from "../../../../context/game-save-context";
import {useHeroesDataContext} from "../../../../context";
import {useGetControlTranslation} from "../../../../helpers/translationHelpers";
import {useParams} from "react-router-dom";

export interface ClassesBundleViewProps {
    classList?: string[],
    subclassList?: string[],

    handleChangeClassName(className: string): void,

    handleChangeSubclassName(subClassName: string): void,

    className: string,
    subclassName: string,
    heroPosition: string,
}

export const HeroSheetClasses = (props: ClassesBundleViewProps) => {

    const {playerRole} = useParams();
    const heroPlayerPosition = playerRole as HeroPlayersEnum;

    const {heroesPicks,language} = useGameSaveContext();
    const {heroClasses} = useHeroesDataContext();
    const {getControlTranslation} = useGetControlTranslation()

    const {
        heroClassName: className = '',
        heroSubclassName: subclassName = '',
    } = heroesPicks[heroPlayerPosition] as HeroPlayerPicks;

    const {
        classList = [],
        subclassList = [],
        handleChangeClassName,
        handleChangeSubclassName,
    } = props;

    const isClassPickAvailable = !!classList.length;
    const isSubClassPickAvailable = !!subclassList.length;

    const getClassTranslation = (className: string) => {
        if (!!language) {
            return heroClasses?.[className]?.translation?.name?.[language] || className;
        }

        return className;
    }

    const classOptions: SelectionOptionInterface[] = classList.sort().map(className => ({
        value: className,
        label: getClassTranslation(className),
    }))
    const selectedClassNameAdapted: SelectionOptionInterface | null = !!className ? {
        value: className,
        label: getClassTranslation(className)
    } : null;

    const subclassOptions: SelectionOptionInterface[] = subclassList.sort().map(subclassName => ({
        value: subclassName,
        label: getClassTranslation(subclassName),
    }))
    const selectedSubclassNameAdapted: SelectionOptionInterface | null = !!subclassName ? {
        value: subclassName,
        label: getClassTranslation(subclassName),
    } : null;


    return (
        <div className="sub-grid">
            <fieldset>
                <legend>{getControlTranslation('Hero class')}</legend>
                <div className={styles.rowLine}>
                    <Select
                        className='input'
                        classNamePrefix="select"
                        value={selectedClassNameAdapted}
                        options={classOptions}
                        onChange={(value) => {
                            handleChangeClassName(!!value ? value.value : '')
                        }}
                        isClearable
                        isSearchable
                        name="select-hero-class"
                        placeholder={isClassPickAvailable ? "" : getControlTranslation("Choose hero")}
                        isDisabled={!isClassPickAvailable}
                    />
                    <SuggestTranslationButton stringToTranslate={className}/>
                </div>

            </fieldset>

            {isSubClassPickAvailable && (
                <fieldset>
                    <legend>{getControlTranslation('Hero Subclass')}</legend>
                    <div className={styles.rowLine}>
                        <Select
                            className='input'
                            classNamePrefix="select"
                            value={selectedSubclassNameAdapted}
                            options={subclassOptions}
                            onChange={(value) => {
                                handleChangeSubclassName(!!value ? value.value : '')
                            }}
                            isClearable
                            isSearchable
                            name="select-hero-subclass"
                            placeholder={''}
                        />
                        <SuggestTranslationButton stringToTranslate={subclassName}/>
                    </div>

                </fieldset>
            )}
        </div>

    )
}
