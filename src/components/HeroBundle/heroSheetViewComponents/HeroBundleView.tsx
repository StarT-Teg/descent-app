import React from "react";

export interface HeroBundleViewProps {
    handleChangeHeroName(newHeroName: string): void,
    heroNames: string[],
    heroPosition: string,
    type?: string,
}

export const HeroBundleView = (props: HeroBundleViewProps) => {

    const {
        handleChangeHeroName,
        heroNames = [],
        type = '',
        heroPosition
    } = props;

    return (

        <div className="sub-grid">
            <fieldset>
                <legend>Hero name</legend>
                <input type="text" list='character-list' id={`${heroPosition}-input-name`}
                       onChange={(event) => handleChangeHeroName(event.target.value)}/>
            </fieldset>

            <fieldset>
                <legend>Hero archetype</legend>
                <input type="text" id={`${heroPosition}-type`} value={type} readOnly/>
            </fieldset>

            <datalist id='character-list'>
                {heroNames.map((name, index) => {
                    return <option key={`${heroPosition}-list-name-option-${index}`} value={name}/>
                })}
            </datalist>

        </div>

        // <div className='name column'>
        //     <p>Hero name: </p>
        //     <input type="text" list='character-list' id='input-hero-name'
        //            onChange={(event) => props.handleChangeHeroName(event.target.value)}/>
        //     <p>Hero archetype: </p>
        //     <input type="text" id="hero-type" value={props.type} readOnly/>
        //
        //
        //     <datalist id='character-list'>
        //         {props.heroNames.map((name, index) => {
        //             return <option key={index} value={name}/>
        //         })}
        //     </datalist>
        // </div>

    )
}