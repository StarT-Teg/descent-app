export const floatClearing = (initialNumber?: any) => {
    if (!initialNumber || !['number', 'string'].includes(typeof initialNumber)) {
        return 0
    }

    const numberFormatted = typeof initialNumber === 'number' ? initialNumber : initialNumber.replace(',', '.')

    return parseFloat(numberFormatted);
}