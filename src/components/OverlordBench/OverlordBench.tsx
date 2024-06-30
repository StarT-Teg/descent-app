import React from "react";
import {CampaignSetup} from "./components/CampaignSetup/CampaignSetup";
import {OverlordDeck} from "./components/OverlordDeck/OverlordDeck";
import styles from "../HeroSheet/сomponents/HeroSheetName/hero-sheet-name.module.css";
import {CampaignMonsters} from "./components/CampaignMonsters/CampaignMonsters";
import {Accordion, AccordionItem, Button} from "../shared";
import {useGameSaveContext} from "../../context/game-save-context";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {useSetSaveAndUpdate} from "../../helpers/hooks/useSetSaveAndUpdate";
import {useGetControlTranslation} from "../../helpers/translationHelpers";

export const OverlordBench = () => {

    const {campaignPicks, overlordPicks} = useGameSaveContext();
    const {setSaveAndUpdate, isLoading} = useSetSaveAndUpdate();
    const {getControlTranslation} = useGetControlTranslation();

    const handleSaveChanges = () => {
        setSaveAndUpdate({campaignPicks, overlordPicks})
    }

    if (isLoading) {
        return <LoadingSpinner/>
    }

    return (
        <div className={styles.formColumn}>
            <Accordion>
                <AccordionItem header={getControlTranslation('Campaign Setup')}>
                    <CampaignSetup/>
                </AccordionItem>

                <AccordionItem header={getControlTranslation('Overlord Deck')}>
                    <OverlordDeck/>
                </AccordionItem>

                <AccordionItem header={getControlTranslation('Army')}>
                    <CampaignMonsters/>
                </AccordionItem>
            </Accordion>

            <Button theme='outlineRed' onClick={handleSaveChanges}>
                {getControlTranslation('Save')}
            </Button>
        </div>
    )
}