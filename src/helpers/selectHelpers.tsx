import {SelectionOptionInterface} from "../shared";

export const toSelectOption = <T,> (value?: T, label?: string, isFixed = false): SelectionOptionInterface | null => {

    if (value === undefined || value === null) {
        return null;
    }

    return {
        value: value,
        label: label || String(value),
        isFixed: isFixed,
    }
}

export const toSelectOptionArray = <T,> (valuesArray?: {value: T, label?: string, isFixed?: boolean}[] | null): SelectionOptionInterface[] | null => {

    if (valuesArray === undefined || valuesArray === null) {
        return null;
    }


    return valuesArray.map(value => (
        {
            value: value.value,
            label: value?.label || String(value),
            isFixed: !!value.isFixed,
        }
    ))

}