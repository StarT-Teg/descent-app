import Select, {ActionMeta, OnChangeValue, StylesConfig} from "react-select";
import {SelectionOptionInterface} from "../../../../../shared";
import React from "react";
import {PublicBaseSelectProps} from "react-select/dist/declarations/src/Select";

const orderOptions = (values: readonly SelectionOptionInterface[]) => {
    return values
        .filter((v) => !!v.isFixed)
        .concat(values.filter((v) => !v.isFixed));
};

const selectStyles: StylesConfig<SelectionOptionInterface, true> = {
    multiValue: (base, state) => {
        return state.data.isFixed ? {...base, backgroundColor: 'gray'} : base;
    },
    multiValueLabel: (base, state) => {
        return state.data.isFixed
            ? {...base, fontWeight: 'bold', color: 'white', paddingRight: 6}
            : base;
    },
    multiValueRemove: (base, state) => {
        return state.data.isFixed ? {...base, display: 'none'} : base;
    },
};

export interface MultiSelectProps extends Partial<PublicBaseSelectProps<SelectionOptionInterface, true, any>> {
    onItemsChange?(items: SelectionOptionInterface[]): void;
}

export const MultiSelect = (props: MultiSelectProps) => {

    const {
        options = [],
        value = null,
        onItemsChange,
        ...otherProps
    } = props;

    const onChange = (
        newValue: OnChangeValue<SelectionOptionInterface, true>,
        actionMeta: ActionMeta<SelectionOptionInterface>
    ) => {
        switch (actionMeta.action) {
            case 'remove-value':
            case 'pop-value':
                if (actionMeta.removedValue.isFixed) {
                    return;
                }
                break;
            case 'clear':
                newValue = options.filter((v) => v.isFixed);
                break;
        }

        onItemsChange?.(orderOptions(newValue));
    };


    return (
        <Select
            value={value}
            isMulti
            styles={selectStyles}
            isClearable={false}
            className="multiSelect"
            classNamePrefix="select"
            options={orderOptions(options)}
            blurInputOnSelect={false}
            closeMenuOnSelect={false}
            {...otherProps}
            onChange={onChange}
        />
    )
}