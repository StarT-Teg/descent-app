import Select from "react-select";
import React, {useMemo} from "react";
import {toSelectOption} from "../../helpers";
import {useOverlordDataContext} from "../../context/overlord-data-context";
import {useGameSaveContext, useGameSaveDispatchContext} from "../../context/game-save-context";
import {ControlsNameEnum, useGetControlTranslation} from "../../helpers/translationHelpers";
import {CampaignsDataParametersEnum, SelectionOptionInterface} from "../../shared";
import styles from './campaign-progress.module.css'
import {GameSaveReducerActionTypeEnum} from "../../context/game-save-context-reducer";
import {useSetSaveAndUpdate} from "../../helpers/hooks/useSetSaveAndUpdate";
import {Button} from "../shared";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {CampaignProgressAdventure} from "./components/CampaignProgressAdventure/CampaignProgressAdventure";

export const CampaignProgress = () => {

    const {campaignsData} = useOverlordDataContext();
    const {campaignProgressPicks, language} = useGameSaveContext();
    const {getControlTranslation} = useGetControlTranslation();

    const {selectedCampaign, completedMissions} = campaignProgressPicks || {};
    const selectedCampaignData = selectedCampaign ? campaignsData?.[selectedCampaign] : undefined

    const {setSaveAndUpdate, isLoading} = useSetSaveAndUpdate();

    const dispatch = useGameSaveDispatchContext();

    const getCampaignTranslation = (campaignName: string | undefined) => {
        if (!!language && !!campaignName) {
            return Object.values(campaignsData[campaignName] || {})?.[0]?.translation?.campaignName?.[language] || campaignName;
        }
        return campaignName;
    }

    const availableCampaigns = Object.keys(campaignsData || {}).reduce((campaignAcc: SelectionOptionInterface[], campaignName) => {
        const newCampaignOption = toSelectOption(campaignName, getCampaignTranslation(campaignName));
        const haveMissions = Object.keys(campaignsData?.[campaignName]).length > 0
        return newCampaignOption && haveMissions ? [...campaignAcc, newCampaignOption] : campaignAcc
    }, [])
    const selectedCampaignFormatted: SelectionOptionInterface | null = toSelectOption(selectedCampaign, getCampaignTranslation(selectedCampaign));

    const allMissionsParsed = useMemo(() => {
        const allMissions = Object.keys(selectedCampaignData || {})
        const completedMissionsList = Object.keys(completedMissions || {})
        const excludedMissions = completedMissionsList?.reduce((acc: string[], missionName) => {
            const missionResult = completedMissions?.[missionName];
            const missionData = selectedCampaignData?.[missionName];
            const missionsToExclude: string[] | undefined = !!missionResult ? (missionResult === 'heroes' ? missionData?.act2MissionNameOverlordWin : missionData?.act2MissionNameHeroWin)?.split(',')?.map(missionName => missionName.trim()) : undefined;

            if (!!missionsToExclude?.length) {
                return [
                    ...acc,
                    ...missionsToExclude
                ]
            }
            return acc;
        }, [])

        let heroesAct1Wins = 0;
        let overlordAct1Wins = 0

        completedMissionsList?.forEach((missionName) => {
            const completedMissionResult = completedMissions?.[missionName]
            if (completedMissionResult && selectedCampaignData?.[missionName]?.act === 1 && selectedCampaignData?.[missionName]?.missionType === 'mission') {
                if (completedMissionResult === 'heroes') {
                    heroesAct1Wins += 1
                } else {
                    overlordAct1Wins += 1
                }
            }
        }, 0)

        return allMissions?.reduce((missionsAcc: { introMissions: string[]; act2Missions: string[]; finalMissions: string[]; act1Missions: string[]; interludeMission: string[] }, missionName: string) => {

            if (excludedMissions?.includes(missionName)) {
                return missionsAcc
            }

            const missionData = selectedCampaignData?.[missionName]

            if (missionData?.missionType === 'intro') {
                return {...missionsAcc, introMissions: [...missionsAcc?.introMissions, missionName]}
            } else if (missionData?.missionType === 'mission') {
                const isAct1 = missionData?.act === 1;
                const isAct2 = missionData?.act === 2;

                if (isAct1) {
                    return {...missionsAcc, act1Missions: [...missionsAcc?.act1Missions, missionName]}
                }

                if (isAct2) {
                    return {...missionsAcc, act2Missions: [...missionsAcc?.act2Missions, missionName]}
                }
            } else if (missionData?.missionType === 'interlude') {
                if (heroesAct1Wins > overlordAct1Wins && missionData?.[CampaignsDataParametersEnum.winnerForInterlude] === 'heroes') {
                    return {...missionsAcc, interludeMission: [...missionsAcc?.interludeMission, missionName]}
                }

                if (overlordAct1Wins > heroesAct1Wins && missionData?.[CampaignsDataParametersEnum.winnerForInterlude] === 'overlord') {
                    return {...missionsAcc, interludeMission: [...missionsAcc?.interludeMission, missionName]}
                }

                if (heroesAct1Wins === overlordAct1Wins) {
                    return {...missionsAcc, interludeMission: [...missionsAcc?.interludeMission, missionName]}
                }

                return missionsAcc
            } else if (missionData?.missionType === 'final') {
                return {...missionsAcc, finalMissions: [...missionsAcc?.finalMissions, missionName]}
            }

            return missionsAcc
        }, {introMissions: [], act1Missions: [], interludeMission: [], act2Missions: [], finalMissions: []})
    }, [selectedCampaignData, completedMissions])

    const dispatchCampaignProgress = (campaignName: string) => {
        if (selectedCampaign !== campaignName) {
            dispatch({
                payload: {selectedCampaign: campaignName, completedMissions: {}},
                actionType: GameSaveReducerActionTypeEnum.changeCampaignProgressPicks
            },)
        }
    }

    const handleSaveChanges = () => {
        setSaveAndUpdate({campaignProgressPicks})
    }

    if (isLoading) {
        return <LoadingSpinner/>
    }

    return (
        <div className={styles.root}>
            <fieldset className={styles.fieldset}>
                <legend>{getControlTranslation(ControlsNameEnum.campaign)}</legend>
                <Select
                    className={'input'}
                    value={selectedCampaignFormatted}
                    options={availableCampaigns}
                    onChange={(value) => {
                        dispatchCampaignProgress(value?.value)
                    }}
                    isClearable
                    name="select-campaign"
                    placeholder={getControlTranslation('Campaign')}
                    isSearchable={availableCampaigns?.length > 7}
                />
            </fieldset>

            {!!allMissionsParsed?.introMissions?.length && (
                <fieldset>
                    <legend>{getControlTranslation('Интро')}</legend>
                    <div className={styles.missionsColumn}>{allMissionsParsed?.introMissions.map((missionName) => (
                        <CampaignProgressAdventure missionName={missionName}
                                                   key={`${ControlsNameEnum.intro}-${missionName}`}/>
                    ))}</div>
                </fieldset>
            )}

            {!!allMissionsParsed?.act1Missions?.length && (
                <fieldset>
                    <legend>{getControlTranslation(ControlsNameEnum.act1)}</legend>
                    <div className={styles.missionsColumn}>{allMissionsParsed?.act1Missions.map((missionName) => (
                        <CampaignProgressAdventure missionName={missionName}
                                                   key={`${ControlsNameEnum.act1}-${missionName}`}/>
                    ))}</div>
                </fieldset>
            )}

            {!!allMissionsParsed?.interludeMission?.length && (
                <fieldset>
                    <legend>{getControlTranslation(ControlsNameEnum.interlude)}</legend>
                    <div className={styles.missionsColumn}>{allMissionsParsed?.interludeMission.map((missionName) => (
                        <CampaignProgressAdventure missionName={missionName}
                                                   key={`${ControlsNameEnum.interlude}-${missionName}`}/>
                    ))}</div>
                </fieldset>
            )}

            {!!allMissionsParsed?.act2Missions?.length && (
                <fieldset>
                    <legend>{getControlTranslation(ControlsNameEnum.act2)}</legend>
                    <div className={styles.missionsColumn}>{allMissionsParsed?.act2Missions?.map((missionName) => (
                        <CampaignProgressAdventure missionName={missionName}
                                                   key={`${ControlsNameEnum.act2}-${missionName}`}/>
                    ))}</div>
                </fieldset>
            )}

            {!!allMissionsParsed?.finalMissions?.length && (
                <fieldset>
                    <legend>{getControlTranslation(ControlsNameEnum.final)}</legend>
                    <div className={styles.missionsColumn}>{allMissionsParsed?.finalMissions?.map((missionName) => (
                        <CampaignProgressAdventure missionName={missionName}
                                                   key={`${ControlsNameEnum.final}-${missionName}`}/>
                    ))}</div>
                </fieldset>
            )}

            <div className={styles.buttonWrapper}>
                <Button theme='outlineRed' onClick={handleSaveChanges}>
                    {getControlTranslation('Save')}
                </Button>
            </div>
        </div>)
}
