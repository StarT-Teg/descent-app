import React from 'react';
import styles from './overlord-deck.module.css'
import Select, {ActionMeta, OnChangeValue, SingleValue, StylesConfig} from 'react-select';
import {
    CurrentOverlordPicks,
    OverlordBasicDecksEnum,
    OverlordDeckDataParametersEnum,
    SelectionOptionInterface
} from "../../../../types/shared";
import {toSelectOption} from "../../../../helpers";
import {useOverlordDataContext} from "../../../../context/overlord-data-context";
import {
    OverlordCurrentPicksReducerActionsEnum,
    useOverlordCurrentPicksContext,
    useOverlordPlayerPicksDispatchContext
} from "../../../../context";


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

const orderOptions = (values: readonly SelectionOptionInterface[]) => {
    return values
        .filter((v) => v.isFixed)
        .concat(values.filter((v) => !v.isFixed));
};

export const OverlordDeck = () => {

    const {overlordCards} = useOverlordDataContext();
    const overlordPicksContext = useOverlordCurrentPicksContext();
    const dispatch = useOverlordPlayerPicksDispatchContext();

    const overlordCardsOptions =
        Object.keys(overlordCards).reduce((acc: SelectionOptionInterface[], cardName) => {

            const className = overlordCards[cardName][OverlordDeckDataParametersEnum.className];

            if (!Object.keys(OverlordBasicDecksEnum).includes(className)) {
                acc.push(toSelectOption(cardName)!)
            }

            if (overlordPicksContext?.basicDeck === className as unknown as OverlordBasicDecksEnum) {
                acc.push(toSelectOption(cardName, cardName, true)!)
            }

            return acc;
        }, [])

    const basicDecksOptions: SelectionOptionInterface[] = [{value: 'Basic I', label: 'Basic I'}, {
        value: 'Basic II',
        label: 'Basic II'
    }]

    // const allCards =
    //     Object.keys(overlordCards).reduce((acc: OverlordDeckSkill[], packName) => {
    //
    //         Object.keys(overlordCards[packName]).forEach((cardName => (acc.push(overlordCards[packName][cardName]))))
    //
    //     return acc;
    // }, [])

    const selectedCards =
        !!overlordPicksContext?.purchasedCards?.length ?
            orderOptions(overlordPicksContext?.purchasedCards?.map(cardName => toSelectOption(cardName, cardName, ['Basic I', 'Basic II'].includes(overlordCards[cardName].className))!))
            :
            null

    const dispatchOverlordPicks = (overlordPicks: CurrentOverlordPicks) => {
        dispatch({overlordPicks: overlordPicks, actionType: OverlordCurrentPicksReducerActionsEnum.changePicks})
    }

    const onPurchasedCardsChange = (
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
                newValue = overlordCardsOptions.filter((v) => v.isFixed);
                break;
        }

        dispatchOverlordPicks({purchasedCards: newValue.map(cardData => cardData.value)});
    };

    const onBasicDeckPick = (newValue: SingleValue<SelectionOptionInterface>) => {
        let newCards = !!overlordPicksContext?.purchasedCards?.length ? [...overlordPicksContext.purchasedCards] : [];

        if (!!newValue) {
            Object.keys(overlordCards).forEach(card => {
                if (overlordCards[card].className === newValue.value) {
                    newCards.push(card)
                }
            })
        } else {
            newCards = newCards.filter(cardName => (
                !['Basic I', 'Basic II'].includes(overlordCards[cardName].className)
            ))
        }

        dispatchOverlordPicks({basicDeck: newValue?.value, purchasedCards: newCards})
    }

    const onPickedCardsChange = (cardName: string) => {
        let newCards = !!overlordPicksContext?.pickedCards?.length ? [...overlordPicksContext.pickedCards] : [];

        if(newCards.includes(cardName) && (overlordCards[cardName].quantity <= Number(overlordPicksContext?.pickedCards?.filter((pickedCardName) => (pickedCardName === cardName)).length))) {
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
                value={toSelectOption(overlordPicksContext?.basicDeck)}
                options={basicDecksOptions}
                onChange={onBasicDeckPick}
                isClearable
                name="basic-deck"
                placeholder={'Choose basic deck'}
            />

            <Select
                value={selectedCards}
                isMulti
                styles={selectStyles}
                isClearable={false}
                name="colors"
                // className="input"
                classNamePrefix="select"
                onChange={onPurchasedCardsChange}
                options={overlordCardsOptions}
            />

            {overlordPicksContext?.purchasedCards?.length && (
                <fieldset>
                    <legend>Available cards</legend>

                    {overlordPicksContext?.purchasedCards?.map((card: string, index) => {
                            return (
                                <div className="list" key={`overlord-cards-block-${card}`}>
                                    <div className={styles.checkbox}>
                                        {Array.from({length: overlordCards[card].quantity}, (_, index) => {

                                            const cardsAmount = Number(overlordPicksContext?.pickedCards?.filter(pickedCardName => pickedCardName === card).length);

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