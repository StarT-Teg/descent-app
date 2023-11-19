import React from "react";

export interface ClassesBundleViewProps {
    classList?: string[],
    subclassList?: string[],
    handleChangeClassName(className: string): void,
    handleChangeSubclassName(subClassName: string): void,
    className: string,
    subclassName: string,
    heroPosition: string,
}

export const ClassesBundleView = (props: ClassesBundleViewProps) => {

    const {
        classList = [],
        subclassList = [],
        handleChangeClassName,
        handleChangeSubclassName,
        className,
        subclassName,
        heroPosition,
    } = props;

    console.log('classList: ',     classList
    )


    const isClassPickAvailable = !!classList.length;
    const isSubClassPickAvailable = !!subclassList.length;

    return (
        <div className="sub-grid">

            <fieldset>
                <legend>Hero class</legend>
                <input
                    type="text"
                    list={`${heroPosition}-class-list`}
                    disabled={!isClassPickAvailable}
                    placeholder={isClassPickAvailable ? "" : "Choose hero"}
                    value={className}
                    onChange={(event) => handleChangeClassName(event.target.value)}
                />
            </fieldset>

            {isSubClassPickAvailable && (
                <fieldset>
                    <legend>Hero subclass</legend>
                    <input
                        type="text"
                        list={`${heroPosition}-subclass-list`}
                        placeholder="Choose subclass"
                        value={subclassName}
                        onChange={(event) => handleChangeSubclassName(event.target.value)}
                    />
                </fieldset>
            )}


            {/*<p>Hero class:</p>*/}
            {/*<input*/}
            {/*    type="text"*/}
            {/*    list="class-list"*/}
            {/*    disabled={!props.visibilityClass}*/}
            {/*    placeholder={props.visibilityClass ? "" : "Choose hero"}*/}
            {/*    value={props.className}*/}
            {/*    onChange={(event) => props.handleChangeClassName(event.target.value)}*/}
            {/*/>*/}

            {/*{props.visibilitySubclass ? (<input*/}
            {/*    type="text"*/}
            {/*    list="subclass-list"*/}
            {/*    visibility={props.visibilitySubclass ? "" : "hidden"}*/}
            {/*    placeholder="Choose subclass"*/}
            {/*    value={props.subclassName}*/}
            {/*    onChange={(event) => props.handleChangeSubclassName(event.target.value)}*/}
            {/*/>) : ''}*/}


            <datalist id={`${heroPosition}-class-list`}>
                {classList.map((name, index) => {
                    return <option key={`${heroPosition}-className-${index}`} value={name}/>
                })}
            </datalist>

            <datalist id={`${heroPosition}-subclass-list`}>
                {subclassList.map((name, index) => {
                    return <option key={`${heroPosition}-subclassName-${index}`} value={name}/>
                })}
            </datalist>

        </div>

    )
}
