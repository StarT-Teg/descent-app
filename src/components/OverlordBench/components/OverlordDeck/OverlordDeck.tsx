import React from 'react';
import styles from './overlord-deck.module.css'
import Select, {SingleValue} from 'react-select';
import {
    CurrentOverlordPicks,
    OverlordBasicDecksEnum,
    OverlordDeckDataParametersEnum,
    SelectionOptionInterface
} from "../../../../types/shared";
import {toSelectOption} from "../../../../helpers";
import {useOverlordDataContext} from "../../../../context/overlord-data-context";
import {MultiSelect} from "../shared/MultiSelect/MultiSelect";
import {useGameSaveContext, useGameSaveDispatchContext} from "../../../../context/game-save-context";
import {GameSaveReducerActionTypeEnum} from "../../../../context/game-save-context-reducer";

export const OverlordDeck = () => {

    const {overlordCards} = useOverlordDataContext();
    const {overlordPicks} = useGameSaveContext();
    const dispatch = useGameSaveDispatchContext();

    const overlordCardsOptions =
        Object.keys(overlordCards).reduce((acc: SelectionOptionInterface[], cardName) => {

            const className = overlordCards[cardName][OverlordDeckDataParametersEnum.className];

            if (!Object.keys(OverlordBasicDecksEnum).includes(className)) {
                acc.push(toSelectOption(cardName)!)
            }

            if (overlordPicks?.basicDeck === className as unknown as OverlordBasicDecksEnum) {
                acc.push(toSelectOption(cardName, cardName, true)!)
            }

            return acc;
        }, [])

    const basicDecksOptions: SelectionOptionInterface[] = [{value: 'Basic I', label: 'Basic I'}, {
        value: 'Basic II',
        label: 'Basic II'
    }]

    const selectedCards = overlordPicks?.purchasedCards?.map(cardName => toSelectOption(cardName, cardName, ['Basic I', 'Basic II'].includes(overlordCards[cardName].className))!);

    const dispatchOverlordPicks = (newOverlordPicks: CurrentOverlordPicks) => {
        dispatch({
            payload: {overlordPicks: {...overlordPicks, ...newOverlordPicks}},
            actionType: GameSaveReducerActionTypeEnum.changeOverlordPicks
        })
    }

    const onBasicDeckPick = (basicDeckNameData: SingleValue<SelectionOptionInterface>) => {
        let newCards = !!overlordPicks?.purchasedCards?.length ? [...overlordPicks.purchasedCards] : [];
        const newPickedCards: string[] = !!overlordPicks?.pickedCards?.length ? [...overlordPicks?.pickedCards] : [];

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
                value={toSelectOption(overlordPicks?.basicDeck)}
                options={basicDecksOptions}
                onChange={onBasicDeckPick}
                isClearable
                name="basic-deck"
                placeholder={'Choose basic deck'}
            />

            <MultiSelect options={overlordCardsOptions} selectedOptions={selectedCards} onItemsChange={(newValue) => {
                dispatchOverlordPicks({purchasedCards: newValue.map(cardData => cardData.value)})
            }}/>

            {!!overlordPicks?.purchasedCards?.length && (
                <fieldset>
                    <legend>Available cards</legend>

                    {overlordPicks?.purchasedCards?.map((card: string, index) => {
                        return (
                            <div className="list" key={`overlord-cards-block-${card}`}>
                                <div className={styles.checkbox}>
                                    {Array.from({length: overlordCards[card].quantity}, (_, index) => {

                                        const cardsAmount = Number(overlordPicks?.pickedCards?.filter(pickedCardName => pickedCardName === card).length);

                                        return (
                                            <input type="checkbox"
                                                   key={`overlord-card-checkbox-${card}-${index}`}
                                                       onChange={() => onPickedCardsChange(card)}
                                                       checked={ cardsAmount >= (index + 1)}
                                                />
                                            );
                                        })}
                                    </div>
                                    <input type="text" readOnly value={card}
                                           key={`overlord-cards-list-${card}`}
                                           onClick={() => onPickedCardsChange(card)}
                                           className={'input'}
                                    />
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