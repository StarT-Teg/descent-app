import React from "react";
import {HeroPlayersEnum} from "../../../types";

export interface SkillsBundleViewProps {
    pickedSkills?: string[]
    availableSkillsList?: string[],
    heroPosition: HeroPlayersEnum,
    onCheckboxChange(skillName: string): void,
}

export const SkillsBundleView = (props: SkillsBundleViewProps) => {

    const {
        pickedSkills = [],
        availableSkillsList = [],
        heroPosition,
        onCheckboxChange
    } = props;

    return (
        <div className="sub-grid">

            <fieldset>
                <legend>Skills</legend>

                {availableSkillsList.map((skill: string, index) => {
                        return (
                            <div className="list" key={`${heroPosition}-skillBlock-${index}`}>
                                {/*{brBeautifier(props.skills[skill]?.br, "br" + index)}*/}
                                <input type="checkbox" id={`${heroPosition}-skill-${skill}`}
                                       // defaultChecked={skills[skill]?.['xp cost'] === 0}
                                       key={`${heroPosition}-skill-${skill}-${index}`}
                                       onChange={() => onCheckboxChange(skill)}
                                       checked={pickedSkills.includes(skill)}
                                />
                                {/*<label htmlFor={skill} key={"label" + index}> {skill} </label>*/}
                                <input type="text" readOnly value={skill}
                                       key={`${heroPosition}-skill-${skill}-br-${index}`}/>
                            </div>
                        )
                    }
                )
                }

            </fieldset>

            {/*<p>Skills:</p>*/}
            {/*{Object.keys(props.skills).map((skill, index) => {*/}
            {/*        // console.log(props.skills[skill]?.br);*/}
            {/*        return (*/}
            {/*            <div className="list" key={"skillBlock" + index}>*/}
            {/*                {brBeautifier(props.skills[skill]?.br, "br" + index)}*/}
            {/*                <input type="checkbox" id={skill} defaultChecked={props.skills[skill]?.['xp cost'] == 0} key={"skill" + index}/>*/}
            {/*                <label htmlFor={skill} key={"label" + index}> {skill} </label>*/}
            {/*                /!*<input type="text" readOnly value={} key={"br" + index}/>*!/*/}
            {/*            </div>*/}
            {/*        )*/}
            {/*    }*/}
            {/*)*/}
            {/*}*/}
        </div>
    )
}