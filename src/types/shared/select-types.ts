export interface SelectionOptionInterface {
    value: any,
    label: string,
    color?: string,
    isFixed?: boolean,
    isDisabled?: boolean,
}

export interface GroupedSelectOptionsInterface {
    label: string,
    options: SelectionOptionInterface[],
}