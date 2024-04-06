import React from "react";
import {CampaignSetup} from "./components/CampaignSetup/CampaignSetup";
import {OverlordDeck} from "./components/OverlordDeck/OverlordDeck";
import styles from "../HeroSheet/сomponents/HeroSheetName/hero-sheet-name.module.css";
import {CampaignMonsters} from "./components/CampaignMonsters/CampaignMonsters";
import {Accordion, AccordionItem, Button} from "../shared";
import {useGameSaveContext} from "../../context/game-save-context";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {useSetSaveAndUpdate} from "../../helpers/hooks/useSetSaveAndUpdate";

export const OverlordBench = () => {

    const {campaignPicks, overlordPicks} = useGameSaveContext();
    const {setSaveAndUpdate, isLoading} = useSetSaveAndUpdate();

    const handleSaveChanges = () => {
        setSaveAndUpdate({campaignPicks, overlordPicks})
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