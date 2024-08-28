import {InputLine} from "../../../shared/InputLine/InputLine";
import React from "react";
import {SelectionOptionInterface} from "../../../../shared";
import {toSelectOption, toSelectOptionArray} from "../../../../helpers";
import styles from './campaign-progress-adventure.module.css'
import classNames from "classnames";
import {GameSaveReducerActionTypeEnum} from "../../../../context/game-save-context-reducer";
import {useGameSaveContext, useGameSaveDispatchContext} from "../../../../context/game-save-context";

export const CampaignProgressAdventure = ({missionName}: { missionName: string }) => {

    const {campaignProgressPicks} = useGameSaveContext();
    const dispatch = useGameSaveDispatchContext();

    const selectedOption = toSelectOption(campaignProgressPicks?.availableMissions?.[missionName]);
    const selectOptions: SelectionOptionInterface[] = toSelectOptionArray([{value: 'heroes'}, {value: 'overlord'}])!;

    const dispatchCampaignProgress = (selectValue: "overlord" | "heroes" | null) => {
        dispatch({
            payload: {[missionName]: campaignProgressPicks?.availableMissions?.[missionName] === selectValue ? null : selectValue},
            actionType: GameSaveReducerActionTypeEnum.changeCampaignProgressMissions
        },)
    }

    return (
        <div className={styles.root}>
            <InputLine inputProps={{inputValue: missionName}}
                       extraStyles={{
                           input: classNames({
                               [styles.heroesColor]: selectedOption?.value === 'heroes',
                               [styles.overlordColors]: selectedOption?.value === 'overlord'
                           })
                       }}/>
            <div className={styles.tabs}>
                {selectOptions.map((option, index) => (
                    <div
                        className={classNames(styles.tabsButton, {[styles.tabsButtonSelected]: selectedOption?.value === option.value})}
                        key={`${missionName}-options-${option.label}-${index}`}
                        onClick={() => {
                            dispatchCampaignProgress(option?.value)
                        }}>{option.value}</div>
                ))}
            </div>
        </div>
    )
}