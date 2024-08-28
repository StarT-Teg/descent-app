import Select, {OptionsOrGroups} from "react-select";
import {toSelectOption} from "../../../../helpers";
import React from "react";
import {useOverlordDataContext} from "../../../../context/overlord-data-context";
import {useGameSaveContext, useGameSaveDispatchContext} from "../../../../context/game-save-context";
import {useGetControlTranslation} from "../../../../helpers/translationHelpers";
import {SelectionOptionInterface} from "../../../../shared";
import {GameSaveReducerActionTypeEnum} from "../../../../context/game-save-context-reducer";
import {SuggestTranslationButton} from "../../../SuggestTranslationButton/SuggestTranslationButton";
import styles from './plot-deck.module.css';
import {InputLine} from "../../../shared/InputLine/InputLine";


export const PlotDeck = () => {

    const {plotCards} = useOverlordDataContext();
    const {overlordPicks, language} = useGameSaveContext();
    const {getControlTranslation} = useGetControlTranslation()
    const dispatch = useGameSaveDispatchContext();

    const getPlotDeckNameTranslation = (deckName?: string) => (
        plotCards?.[deckName || '']?.[0]?.translations.packName?.[language] || deckName
    )

    const getPlotCardNameTranslation = (cardName?: string) => (
        plotCards?.[overlordPicks?.plotDeck || '']?.[cardName || '']?.translations.cardName?.[language] || cardName
    )

    const plotDeckOptions: OptionsOrGroups<SelectionOptionInterface, any> | undefined =
        Object.keys(plotCards || {})
            .map((plodDeckName: string) => toSelectOption(plodDeckName, getPlotDeckNameTranslation(plodDeckName)))
    const pickedPlotDeck = toSelectOption(overlordPicks?.plotDeck, getPlotDeckNameTranslation(overlordPicks?.plotDeck))

    const plotCardsList = Object.values(plotCards[overlordPicks?.plotDeck || ''] || {})

    const onPlotDeckPick = (plotDeckName: string | undefined) => {
        dispatch({
            payload: {
                overlordPicks: {
                    plotDeck: plotDeckName,
                    pickedPlotCards: [...Object.values(plotCards[plotDeckName || ''] || {}).filter(plotDeckCard => plotDeckCard?.buyCost === 0).map(plotDeckCard => plotDeckCard?.cardName || '')]
                }
            },
            actionType: GameSaveReducerActionTypeEnum.changeOverlordPicks
        })
    }

    const onPlotCardPicked = (cardName: string) => {
        let newPickedCards = [...overlordPicks?.pickedPlotCards || []];

        if (newPickedCards?.includes(cardName)) {
            newPickedCards = newPickedCards.filter(card => card !== cardName)
        } else {
            newPickedCards.push(cardName)
        }

        dispatch({
            payload: {overlordPicks: {pickedPlotCards: newPickedCards}},
            actionType: GameSaveReducerActionTypeEnum.changeOverlordPicks
        })
    }

    return (
        <>
            <div className={styles.plotDeckLine}>
                <Select
                    className={'input'}
                    value={pickedPlotDeck}
                    options={plotDeckOptions}
                    onChange={(option) => {
                        onPlotDeckPick(option?.value)
                    }}
                    isClearable
                    name="basic-deck"
                    placeholder={getControlTranslation('Choose Plot Deck')}
                />

                <SuggestTranslationButton stringToTranslate={overlordPicks?.plotDeck}/>
            </div>

            {!!plotCardsList?.length && (
                <fieldset>
                    <legend>{getControlTranslation('Available cards')}</legend>
                    <div className={styles.plotCardsColumn}>
                        {plotCardsList.map(plotCardData => {

                            const cardName = plotCardData?.cardName!;
                            const br = Math.round(plotCardData?.br || 0);

                            return (
                                <InputLine
                                    checkboxProps={[{
                                        onChange: () => onPlotCardPicked(cardName),
                                        checked: !!overlordPicks.pickedPlotCards?.includes(cardName)
                                    }]}
                                    inputProps={{
                                        inputValue: getPlotCardNameTranslation(cardName),
                                        onClick: () => {
                                            onPlotCardPicked(cardName)
                                        }
                                    }}
                                    suggestTranslationProps={{stringToTranslate: cardName}}
                                    brButtonProps={{br}}
                                    key={`plot-card-${cardName}`}
                                />
                            )
                        })}
                    </div>
                </fieldset>
            )}
        </>
    )
}