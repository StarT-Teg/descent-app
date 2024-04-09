export const floatClearing = (number: string) => {
    if (!number) {
        return 0
    }
    return parseFloat(number.replace(',', '.'));
}