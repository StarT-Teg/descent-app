export const floatClearing = (initialNumber?: any) => {
    if (!initialNumber || !['number', 'string'].includes(typeof initialNumber)) {
        return 0
    }

    const numberFormatted = typeof initialNumber === 'number' ? initialNumber : initialNumber.replace(',', '.')

    return parseFloat(numberFormatted);
}

export const convertStringToNumber = (stringNumber: string | undefined) => {
    const convertedNumber = Number(stringNumber)

    return Number.isNaN(convertedNumber) ? 0 : convertedNumber
}
