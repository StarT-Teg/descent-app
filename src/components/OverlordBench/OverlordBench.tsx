import React from "react";
import {CampaignSetup} from "./components/CampaignSetup/CampaignSetup";
import {OverlordDeck} from "./components/OverlordDeck/OverlordDeck";
import styles from "../HeroSheet/сomponents/HeroSheetName/hero-sheet-name.module.css";
import {CampaignMonsters} from "./components/CampaignMonsters/CampaignMonsters";
import {Accordion, AccordionItem, Button} from "../shared";
import {useSetGameSave} from "../../dataHooks/useSetGameSave";
import {useGameSaveContext, useGameSaveDispatchContext} from "../../context/game-save-context";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {GameSaveReducerActionTypeEnum} from "../../context/game-save-context-reducer";

export const OverlordBench = () => {

    const {campaignPicks, overlordPicks} = useGameSaveContext();
    const dispatch = useGameSaveDispatchContext();

    const uuid = localStorage.getItem('descent-save-game-uuid')!;
    const {mutate, isLoading} = useSetGameSave();

    const handleSaveChanges = () => {
        mutate({uuid, data: {campaignPicks, overlordPicks}}, {
            onSuccess: (dataResponse => {
                dispatch({
                    payload: {...dataResponse.data},
                    actionType: GameSaveReducerActionTypeEnum.changeAllPicks
                })
            })
        })
    }

    if (isLoading) {
        return <LoadingSpinner/>
    }

    return (
        <div className={styles.formColumn}>
            <Accordion>
                <AccordionItem header={'Campaign Setup'}>
                    <CampaignSetup/>
                </AccordionItem>

                <AccordionItem header={'Overlord Deck'}>
                    <OverlordDeck/>
                </AccordionItem>

                <AccordionItem header={'Army'}>
                    <CampaignMonsters/>
                </AccordionItem>
            </Accordion>

            <Button theme='outlineRed' onClick={() => {
                handleSaveChanges()
            }}>Сохранить
            </Button>
        </div>
    )
}