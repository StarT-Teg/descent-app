import React from "react";
import Select from "react-select";
import {SelectionOptionInterface} from "../../../shared";

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
    } = props;

    const isClassPickAvailable = !!classList.length;
    const isSubClassPickAvailable = !!subclassList.length;

    const classOptions: SelectionOptionInterface[] = classList.sort().map(className => ({value: className, label: className}))
    const selectedClassNameAdapted: SelectionOptionInterface | null = !!className ? {value: className, label: className} : null;

    const subclassOptions: SelectionOptionInterface[] = subclassList.sort().map(subclassName => ({value: subclassName, label: subclassName}))
    const selectedSubclassNameAdapted: SelectionOptionInterface | null = !!subclassName ? {value: subclassName, label: subclassName} : null;


    return (
        <div className="sub-grid">
            <fieldset>
                <legend>Hero class</legend>
                <Select
                    className='input'
                    classNamePrefix="select"
                    value={selectedClassNameAdapted}
                    options={classOptions}
                    onChange={(value, actionMeta) => {
                        handleChangeClassName(!!value ? value.value : '')
                    }}
                    isClearable
                    isSearchable
                    name="select-hero-class"
                    placeholder={isClassPickAvailable ? "" : "Choose hero"}
                    isDisabled={!isClassPickAvailable}
                />
            </fieldset>

            {isSubClassPickAvailable && (
                <fieldset>
                    <legend>Hero subclass</legend>
                    <Select
                        className='input'
                        classNamePrefix="select"
                        value={selectedSubclassNameAdapted}
                        options={subclassOptions}
                        onChange={(value, actionMeta) => {
                            handleChangeSubclassName(!!value ? value.value : '')
                        }}
                        isClearable
                        isSearchable
                        name="select-hero-subclass"
                        placeholder="Choose subclass"
                    />
                </fieldset>
            )}
        </div>

    )
}
