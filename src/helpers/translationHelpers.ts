import {TranslationDataAdaptedInterface} from "../shared";
import {useGameSaveContext} from "../context/game-save-context";

const controlsTranslation: { [key in string]: { [key in string]: string } } = {
    'Name/Class': {ru: 'Имя/Класс'},
    'Hero Name': {ru: 'Имя Героя'},
    'Choose hero': {ru: 'Выберите Героя'},
    'Hero class': {ru: 'Класс Героя'},
    'Hero Subclass': {ru: 'Подкласс Героя'},
    'Familiars': {ru: 'Фамильяры'},
    'Skills': {ru: 'Навыки'},
    'Items': {ru: 'Предметы'},
    'Save': {ru: 'Сохранить'},
    'Create New Game': {ru: 'Создать Новую Игру'},
    'Copy Invite Link': {ru: 'Скопировать Приглашение'},
    'Back To Game': {ru: 'Назад В Игру'},
    'Cancel': {ru: 'Отменить'},
    'Campaign': {ru: 'Кампания'},
    'Campaign Setup': {ru: 'Настройки Кампании'},
    'Overlord Deck': {ru: 'Колода Властелина'},
    'Army': {ru: 'Армия'},
    'Act': {ru: 'Акт'},
    'Mission': {ru: 'Миссия'},
    'Encounter': {ru: 'Столкновение'},
    'Basic': {ru: 'Базовая'},
    'Basic I': {ru: 'Базовая I'},
    'Basic II': {ru: 'Базовая II'},
    'Choose basic deck': {ru: 'Выберите Базовую Колоду'},
    'Available cards': {ru: 'Доступные карты'},
    'Monster serial numbers': {ru: 'Серийные Номера Монстров'},
    'Lieutenants': {ru: 'Лейтенанты'},
    'Relic': {ru: 'Реликвия'},
    'Default Groups': {ru: 'Обязательные группы'},
    'Open Groups': {ru: 'Открытые группы'},
    'Monster Showcase': {ru: 'Витрина Монстров'},
    'Send Translation': {ru: 'Отправить перевод'},
    'Overlord': {ru: 'Властелин'},
    'Hero': {ru: 'Герой'},
    'Choose Overlord Cards': {ru: 'Выберите Карты Властелина'},
    'Plot Deck': {ru: 'Колода Замыслов'},
    'Choose Plot Deck': {ru: 'Выберите Колоду Замыслов'},
    'Buy': {ru: 'Купить'},
    'Sell': {ru: 'Продать'},
    'Quit': {ru: 'Выйти'},
}

export const getTranslationData = (itemList: { [listKey: string]: string }, translation?: TranslationDataAdaptedInterface): { [p: string]: { [language in string]: string } | undefined } => {

    const getTranslationFromName = (itemName: string) => {

        if (!translation?.[itemName]) {
            return undefined;
        }

        const languageList = Object.keys(translation?.[itemName]);

        return languageList?.reduce((acc, language) => {
            if (!translation?.[itemName]?.[language]) {
                return {...acc}
            }

            return {
                ...acc,
                [language]: translation[itemName][language]
            }
        }, {})
    }

    return Object.keys(itemList).reduce((acc, listKey) => (
        {
            ...acc,
            [listKey]: getTranslationFromName(itemList[listKey]),
        }
    ), {})
}

export const useGetControlTranslation = () => {
    const {language} = useGameSaveContext()

    const getControlTranslation = (controlName: string) => {
        return controlsTranslation?.[controlName]?.[language || ''] || controlName
    }

    return {
        getControlTranslation,
    }
}

export const getAbilityNameUnified = (abilityName: string) => {
    return abilityName.replace(/(\+|s:|a:|ss:|sss:|[0-9]+)/gi, '').trim();
}
