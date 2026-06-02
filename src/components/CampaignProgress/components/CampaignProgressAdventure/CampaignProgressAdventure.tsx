import {InputLine} from "../../../shared/InputLine/InputLine";
import React from "react";
import {SelectionOptionInterface} from "../../../../shared";
import {toSelectOption, toSelectOptionArray} from "../../../../helpers";
import styles from './campaign-progress-adventure.module.css'
import classNames from "classnames";
import {GameSaveReducerActionTypeEnum} from "../../../../context/game-save-context-reducer";
import {useGameSaveContext, useGameSaveDispatchContext} from "../../../../context/game-save-context";
import {useOverlordDataContext} from "../../../../context/overlord-data-context";
import {ControlsNameEnum, useGetControlTranslation} from "../../../../helpers/translationHelpers";

export const CampaignProgressAdventure = ({missionName}: { missionName: string }) => {

    const {campaignsData} = useOverlordDataContext();
    const {campaignProgressPicks, language} = useGameSaveContext();
    const dispatch = useGameSaveDispatchContext();
    const {getControlTranslation} = useGetControlTranslation();

    const selectedOption = toSelectOption(campaignProgressPicks?.completedMissions?.[missionName]);
    const selectOptions: SelectionOptionInterface[] = toSelectOptionArray([{
        value: 'heroes',
        label: getControlTranslation(ControlsNameEnum.heroes)
    }, {value: 'overlord', label: getControlTranslation(ControlsNameEnum.overlord)}])!;

    const dispatchCampaignProgress = (selectValue: "overlord" | "heroes" | null) => {
        const missionData = !!selectValue && !!campaignProgressPicks?.selectedCampaign ? campaignsData?.[campaignProgressPicks?.selectedCampaign]?.[missionName] : undefined
        const missionsToExclude = !!selectValue ? (selectValue === "overlord" ? missionData?.act2MissionNameHeroWin : missionData?.act2MissionNameOverlordWin)?.split(',')?.reduce((missionsAcc, missionName) => ({
            ...missionsAcc,
            [missionName.trim()]: null
        }), {}) : undefined;

        dispatch({
            payload: {[missionName]: campaignProgressPicks?.completedMissions?.[missionName] === selectValue ? null : selectValue, ...missionsToExclude},
            actionType: GameSaveReducerActionTypeEnum.changeCampaignProgressMissions
        },)
    }

    const dispatchProgressComment = (comment: string) => {
        dispatch({
            payload: {[missionName]: comment},
            actionType: GameSaveReducerActionTypeEnum.changeCampaignProgressComments
        },)
    }

    const getMissionTranslation = (missionName?: string) => {
        if (!!language && !!campaignProgressPicks?.selectedCampaign && !!missionName) {
            return campaignsData[campaignProgressPicks.selectedCampaign][missionName]?.translation?.missionName?.[language] || missionName;
        }

        return missionName;
    }

    return (
        <div className={styles.root}>
            <InputLine inputProps={{inputValue: getMissionTranslation(missionName)}}
                       suggestTranslationProps={{stringToTranslate: missionName}}
                       commentButtonProps={{
                           comment: campaignProgressPicks?.comments?.[missionName],
                           onCommentSave: (comment: string) => {
                               dispatchProgressComment(comment);
                           }
                       }}
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
                        }}>{option.label}</div>
                ))}
            </div>
        </div>
    )
}
