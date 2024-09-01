import React, {useEffect, useState} from 'react';
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
import {ControlsNameEnum, useGetControlTranslation} from "../../../../helpers/translationHelpers";
import {InputLine} from "../../../shared/InputLine/InputLine";

export const OverlordDeck = () => {

    const {overlordCards, campaignsData} = useOverlordDataContext();
    const {overlordPicks, language, campaignProgressPicks, heroesPicks} = useGameSaveContext();
    const dispatch = useGameSaveDispatchContext();

    const {purchasedCards} = overlordPicks;

    const {getControlTranslation} = useGetControlTranslation()

    const numberOfHeroes = Object.keys(heroesPicks).length;
    const [overlordXP, setOverlordXP] = useState(numberOfHeroes);

    const getTranslation = (cardName: string, translationName: 'name') => {
        return !!language ? overlordCards[cardName]?.translations?.[translationName]?.[language] || cardName : cardName;
    }

    const [overlordCardsOptions, setOverlordCardOptions] = useState<SelectionOptionInterface[]>([]);


    const basicDecksOptions: SelectionOptionInterface[] = [{
        value: 'Basic I',
        label: `${getControlTranslation('Basic')} I`
    }, {
        value: 'Basic II',
        label: `${getControlTranslation('Basic')} II`,
    }]

    const selectedCards = purchasedCards?.map(cardName => toSelectOption(cardName, getTranslation(cardName, 'name'), ['Basic I', 'Basic II'].includes(overlordCards[cardName].className))!) || null;

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

    useEffect(() => {
        setOverlordXP(
            Object.keys(campaignProgressPicks?.availableMissions || {})?.reduce((acc: number, missionName) => {
                const heroesCoef = numberOfHeroes - 2;

                if (campaignProgressPicks?.availableMissions?.[missionName] === 'overlord') {
                    return acc + (campaignsData?.[campaignProgressPicks?.selectedCampaign || '']?.[missionName]?.rewards?.xpRewardOverlordWin || 0) + heroesCoef;
                }

                if (campaignProgressPicks?.availableMissions?.[missionName] === 'heroes') {
                    return acc + (campaignsData?.[campaignProgressPicks?.selectedCampaign || '']?.[missionName]?.rewards?.xpRewardOverlordDefeat || 0) + heroesCoef;
                }

                return acc;
            }, numberOfHeroes)
        )
    }, [campaignProgressPicks?.availableMissions, numberOfHeroes])

    useEffect(() => {
        setOverlordCardOptions(
            Object.keys(overlordCards).reduce((acc: SelectionOptionInterface[], cardName) => {
                const className = overlordCards[cardName][OverlordDeckDataParametersEnum.className];
                const cardNameTranslated = getTranslation(cardName, 'name');

                if (!Object.keys(OverlordBasicDecksEnum).includes(className)) {
                    acc.push(toSelectOption(cardName, cardNameTranslated, false)!)
                }

                if (overlordPicks?.basicDeck === className as unknown as OverlordBasicDecksEnum) {
                    acc.push(toSelectOption(cardName, cardNameTranslated, true)!)
                }

                return acc;
            }, [])
        )
    }, [overlordCards, purchasedCards])

    return (
        <>
            <InputLine inputProps={{inputValue: `Всего опыта - ${overlordXP}`}}/>
            <fieldset>
                <legend>{getControlTranslation(ControlsNameEnum.basicDeck)}</legend>
                <Select
                    className={'input'}
                    value={toSelectOption(overlordPicks?.basicDeck, getControlTranslation(overlordPicks?.basicDeck?.toString() || ''))}
                    options={basicDecksOptions}
                    onChange={onBasicDeckPick}
                    isClearable
                    name="basic-deck"
                    placeholder={getControlTranslation('Choose basic deck')}
                />
            </fieldset>

            <fieldset>
                <legend>{getControlTranslation(ControlsNameEnum.purchasedCards)}</legend>
                <MultiSelect options={overlordCardsOptions} value={selectedCards}
                             placeholder={getControlTranslation('Choose Overlord Cards')}
                             onItemsChange={(newValue) => {
                                 dispatchOverlordPicks({purchasedCards: newValue.map(cardData => cardData.value)})
                             }}/>
            </fieldset>

            {!!overlordPicks?.purchasedCards?.length && (
                <fieldset>
                    <legend>{getControlTranslation('Available cards')}</legend>

                    {overlordPicks?.purchasedCards?.map((cardName: string) => {
                            return (
                                <InputLine
                                    checkboxProps={
                                        Array.from({length: overlordCards[cardName].quantity}, (_, index) => {
                                            const cardsAmount = Number(overlordPicks?.pickedCards?.filter(pickedCardName => pickedCardName === cardName).length);
                                            return {
                                                onChange: () => onPickedCardsChange(cardName),
                                                checked: cardsAmount >= (index + 1)
                                            };
                                        })
                                    }
                                    inputProps={{
                                        inputValue: getTranslation(cardName, 'name'),
                                        onClick: () => onPickedCardsChange(cardName)
                                    }}
                                    suggestTranslationProps={{stringToTranslate: cardName}}
                                    brButtonProps={{br: overlordCards[cardName].br}}
                                    key={`overlordPicks-purchasedCards-${cardName}`}
                                />
                            )
                        }
                    )
                    }

                </fieldset>
            )}
        </>

    );
};