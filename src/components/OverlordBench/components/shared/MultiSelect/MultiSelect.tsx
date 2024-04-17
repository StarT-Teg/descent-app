import Select, {ActionMeta, OnChangeValue, StylesConfig} from "react-select";
import {SelectionOptionInterface} from "../../../../../shared";
import React from "react";

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

export interface MultiSelectProps {
    options: SelectionOptionInterface[];
    selectedOptions?: SelectionOptionInterface[] | null;

    onItemsChange?(items: SelectionOptionInterface[]): void;
}

export const MultiSelect = (props: MultiSelectProps) => {

    const {
        options,
        selectedOptions = null,
        onItemsChange,
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

        !!onItemsChange && onItemsChange(orderOptions(newValue));
    };


    return (
        <Select
            value={selectedOptions}
            isMulti
            styles={selectStyles}
            isClearable={false}
            className="multiSelect"
            classNamePrefix="select"
            onChange={onChange}
            options={orderOptions(options)}
            blurInputOnSelect={false}
            closeMenuOnSelect={false}
        />
    )
}