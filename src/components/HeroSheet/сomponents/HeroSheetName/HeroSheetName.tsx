import React from "react";
import Select from "react-select";
import styles from './hero-sheet-name.module.css'
import {SelectionOptionInterface} from "../../../../shared";

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
        type = '',
    } = props;

    const options: SelectionOptionInterface[] = heroNames.sort().map(heroName => ({value: heroName, label: heroName}))
    const selectedHeroNameAdapted: SelectionOptionInterface | null = !!selectedHeroName ? {value: selectedHeroName, label: selectedHeroName} : null;

    return (

        <div className={styles["sub-grid"]}>

            <fieldset>
                <legend className={styles.legend}>Hero Name</legend>

                <div className={styles.heroType}>
                    <Select
                        className='input'
                        classNamePrefix="select"
                        value={selectedHeroNameAdapted}
                        options={options}
                        onChange={(value, actionMeta) => {
                            handleChangeHeroName(!!value ? value.value : '')
                        }}
                        isClearable
                        isSearchable
                        name="hero-name"
                        placeholder={'Choose hero'}
                    />
                    {type &&<img src={require(`/src/assets/img/archetypes/${type.toLowerCase()}.png`)} style={{width:'50px', height:'50px'}} alt=""/>}
                </div>
            </fieldset>

        </div>
    )
}