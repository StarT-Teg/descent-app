import React from "react";
import {CampaignSetup} from "./components/CampaignSetup/CampaignSetup";
import {OverlordDeck} from "./components/OverlordDeck/OverlordDeck";
import styles from "../HeroBundle/HeroSheet/сomponents/HeroSheetName/hero-sheet-name.module.css";

export const OverlordBench = () => (
    <div className={styles.formColumn}>
        <CampaignSetup />
        <OverlordDeck />
    </div>
)