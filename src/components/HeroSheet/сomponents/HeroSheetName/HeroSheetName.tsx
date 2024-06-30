import React from "react";
import Select from "react-select";
import styles from './hero-sheet-name.module.css'
import {SelectionOptionInterface} from "../../../../shared";
import {SuggestTranslationButton} from "../../../SuggestTranslationButton/SuggestTranslationButton";
import {useGetControlTranslation} from "../../../../helpers/translationHelpers";

export interface HeroBundleViewProps {
    handleChangeHeroName(newHeroName: string): void,

    heroNames: string[],
    selectedHeroName?: string;
    type?: string,
    heroPosition?: string,
}

export const HeroSheetName = (props: HeroBundleViewProps) => {

    const {
        handleChangeHeroName,
        heroNames = [],
        selectedHeroName,
    } = props;

    const {getControlTranslation} = useGetControlTranslation()

    const options: SelectionOptionInterface[] = heroNames.sort().map(heroName => ({value: heroName, label: heroName}))
    const selectedHeroNameAdapted: SelectionOptionInterface | null = !!selectedHeroName ? {
        value: selectedHeroName,
        label: selectedHeroName
    } : null;

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