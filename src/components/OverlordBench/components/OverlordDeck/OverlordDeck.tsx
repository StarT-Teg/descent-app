import React from 'react';
import styles from './overlord-deck.module.css'
import Select, {SingleValue} from 'react-select';
import {
    CurrentOverlordPicks,
    OverlordBasicDecksEnum,
    OverlordDeckDataParametersEnum,
    SelectionOptionInterface
} from "../../../../shared";
import {toSelectOption} from "../../../../helpers";
import {useOverlordDataContext} from "../../../../context/overlord-data-context";
import {MultiSelect} from "../shared/MultiSelect/MultiSelect";
import {useGameSaveContext, useGameSaveDispatchContext} from "../../../../context/game-save-context";
import {GameSaveReducerActionTypeEnum} from "../../../../context/game-save-context-reducer";
import {SuggestTranslationButton} from "../../../SuggestTranslationButton/SuggestTranslationButton";
import {useGetControlTranslation} from "../../../../helpers/translationHelpers";

export const OverlordDeck = () => {

    const {overlordCards} = useOverlordDataContext();
    const {overlordPicks, language} = useGameSaveContext();
    const dispatch = useGameSaveDispatchContext();

    const {getControlTranslation} = useGetControlTranslation()

    const getTranslation = (cardName: string, translationName: 'name') => {
        return !!language ? overlordCards[cardName]?.translations?.[translationName]?.[language] || cardName : cardName;
    }

    const overlordCardsOptions =
        Object.keys(overlordCards).reduce((acc: SelectionOptionInterface[], cardName) => {

            const className = overlordCards[cardName][OverlordDeckDataParametersEnum.className];
            const cardNameTranslated = getTranslation(cardName, 'name');

            if (!Object.keys(OverlordBasicDecksEnum).includes(className)) {
                acc.push(toSelectOption(cardName, cardNameTranslated)!)
            }

            if (overlordPicks?.basicDeck === className as unknown as OverlordBasicDecksEnum) {
                acc.push(toSelectOption(cardName, cardNameTranslated, true)!)
            }

            return acc;
        }, [])

    const basicDecksOptions: SelectionOptionInterface[] = [{
        value: 'Basic I',
        label: `${getControlTranslation('Basic')} I`
    }, {
        value: 'Basic II',
        label: `${getControlTranslation('Basic')} II`,
    }]

    const selectedCards = overlordPicks?.purchasedCards?.map(cardName => toSelectOption(cardName, getTranslation(cardName, 'name'), ['Basic I', 'Basic II'].includes(overlordCards[cardName].className))!);

    const dispatchOverlordPicks = (newOverlordPicks: CurrentOverlordPicks) => {
        dispatch({
            payload: {overlordPicks: {...overlordPicks, ...newOverlordPicks}},
            actionType: GameSaveReducerActionTypeEnum.changeOverlordPicks
        })
    }

    const onBasicDeckPick = (basicDeckNameData: SingleValue<SelectionOptionInterface>) => {
        let newCards = [...(overlordPicks?.purchasedCards || [])].filter(cardName => !['Basic I', 'Basic II'].includes(overlordCards[cardName].className));
        const newPickedCards: string[] = [...(overlordPicks?.pickedCards || [])].filter(cardName => !['Basic I', 'Basic II'].includes(overlordCards[cardName].className));

        if (!!basicDeckNameData?.value) {
            Object.keys(overlordCards).forEach(card => {
                if (overlordCards[card].className === basicDeckNameData.value) {
                    newCards.unshift(card)

                    for (let i = 1; i <= overlordCards[card].quantity; i++) {
                        newPickedCards.push(card);
                    }
                }
            })
        } else {
            newCards = newCards.filter(cardName => (
                !['Basic I', 'Basic II'].includes(overlordCards[cardName].className)
            ))
        }

        dispatchOverlordPicks({
            basicDeck: basicDeckNameData?.value,
            purchasedCards: newCards,
            pickedCards: newPickedCards
        })
    }

    const onPickedCardsChange = (cardName: string) => {
        let newCards = !!overlordPicks?.pickedCards?.length ? [...overlordPicks.pickedCards] : [];

        if (newCards.includes(cardName) && (overlordCards[cardName].quantity <= Number(overlordPicks?.pickedCards?.filter((pickedCardName) => (pickedCardName === cardName)).length))) {
            newCards = newCards.filter(card => card !== cardName)
        } else {
            newCards.push(cardName)
        }

        dispatchOverlordPicks({pickedCards: newCards})
    }

    return (
        <>
            <Select
                className={'input'}
                value={toSelectOption(overlordPicks?.basicDeck, getControlTranslation(overlordPicks?.basicDeck?.toString() || ''))}
                options={basicDecksOptions}
                onChange={onBasicDeckPick}
                isClearable
                name="basic-deck"
                placeholder={getControlTranslation('Choose basic deck')}
            />

            <MultiSelect options={overlordCardsOptions} selectedOptions={selectedCards} onItemsChange={(newValue) => {
                dispatchOverlordPicks({purchasedCards: newValue.map(cardData => cardData.value)})
            }}/>

            {!!overlordPicks?.purchasedCards?.length && (
                <fieldset>
                    <legend>{getControlTranslation('Available cards')}</legend>

                    {overlordPicks?.purchasedCards?.map((cardName: string) => {
                            return (
                                <div className={styles.listRow} key={`overlord-cards-block-${cardName}`}>
                                    <div className={styles.checkbox}>
                                        {Array.from({length: overlordCards[cardName].quantity}, (_, index) => {

                                            const cardsAmount = Number(overlordPicks?.pickedCards?.filter(pickedCardName => pickedCardName === cardName).length);

                                            return (
                                                <input type="checkbox"
                                                       key={`overlord-card-checkbox-${cardName}-${index}`}
                                                       onChange={() => onPickedCardsChange(cardName)}
                                                       checked={cardsAmount >= (index + 1)}
                                                />
                                            );
                                        })}
                                    </div>
                                    <input type="text" readOnly value={getTranslation(cardName, 'name')}
                                           key={`overlord-cards-list-${cardName}`}
                                           onClick={() => onPickedCardsChange(cardName)}
                                           className={'input'}
                                    />

                                    <SuggestTranslationButton stringToTranslate={cardName}/>
                                </div>
                            )
                        }
                    )
                    }

                </fieldset>
            )}
        </>

    );
};