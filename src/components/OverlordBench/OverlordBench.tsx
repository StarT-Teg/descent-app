import React from "react";
import {CampaignSetup} from "./components/CampaignSetup/CampaignSetup";
import {OverlordDeck} from "./components/OverlordDeck/OverlordDeck";
import styles from "../HeroSheet/сomponents/HeroSheetName/hero-sheet-name.module.css";
import {CampaignMonsters} from "./components/CampaignMonsters/CampaignMonsters";
import {Accordion, AccordionItem} from "../shared";

export const OverlordBench = () => (
    <div className={styles.formColumn}>
        <Accordion>
            <AccordionItem header={'Campaign Setup'}>
                <CampaignSetup/>
            </AccordionItem>

            <AccordionItem header={'Overlord Deck'}>
                <OverlordDeck/>
            </AccordionItem>

            <AccordionItem header={'Monsters'}>
                <CampaignMonsters/>
            </AccordionItem>
        </Accordion>
    </div>
)