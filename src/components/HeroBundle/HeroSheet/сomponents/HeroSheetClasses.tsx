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

export const HeroSheetClasses = (props: ClassesBundleViewProps) => {

    const {
        classList = [],
        subclassList = [],
        handleChangeClassName,
        handleChangeSubclassName,
        className,
        subclassName,
        heroPosition,
    } = props;

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
