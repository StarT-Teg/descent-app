import Select from "react-select";
import React, {useEffect, useState} from "react";
import {toSelectOption} from "../../helpers";
import {useOverlordDataContext} from "../../context/overlord-data-context";
import {useGameSaveContext, useGameSaveDispatchContext} from "../../context/game-save-context";
import {ControlsNameEnum, useGetControlTranslation} from "../../helpers/translationHelpers";
import {SelectionOptionInterface} from "../../shared";
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

    const {setSaveAndUpdate, isLoading} = useSetSaveAndUpdate();

    const dispatch = useGameSaveDispatchContext();

    const getCampaignTranslation = (campaignName: string | undefined) => {
        if (!!language && !!campaignName) {
            return Object.values(campaignsData[campaignName] || {})?.[0]?.translation?.campaignName?.[language] || campaignName;
        }

        return campaignName;
    }

    const availableCampaigns = Object.keys(campaignsData || {}).map((campaignName) => (toSelectOption(campaignName, getCampaignTranslation(campaignName))!))
    const selectedCampaign: SelectionOptionInterface | null = toSelectOption(campaignProgressPicks?.selectedCampaign, getCampaignTranslation(campaignProgressPicks?.selectedCampaign));

    const introMission = Object.keys(campaignsData?.[campaignProgressPicks?.selectedCampaign || ''])?.find((missionName) => campaignsData?.[campaignProgressPicks?.selectedCampaign || '']?.[missionName]?.missionType === 'intro')
    const [act1Missions, setAct1Missions] = useState<string[]>([])
    const [interludeMission, setInterludeMission] = useState<string | undefined>()
    const [act2Missions, setAct2Missions] = useState<string[]>([])
    const [finalMission, setFinalMission] = useState<string | undefined>()

    useEffect(() => {
        const selectedCampaignData = Object.keys(campaignsData?.[campaignProgressPicks?.selectedCampaign || '']);
        const heroesAct2Wins = Object.keys(campaignProgressPicks?.availableMissions || {}).reduce((acc: number, missionName: string) => {
            if (
                campaignsData?.[campaignProgressPicks?.selectedCampaign || '']?.[missionName].act === 2 &&
                campaignProgressPicks?.availableMissions?.[missionName] === 'heroes'
            ) {
                return acc + 1;
            }
            return acc;
        }, 0);

        if (!!selectedCampaignData.length) {
            const finalMissionName = selectedCampaignData.find(
                (missionName) => (
                    campaignsData[campaignProgressPicks?.selectedCampaign || ''][missionName]?.missionType === 'final'
                ));
            const finalMissionData = campaignsData[campaignProgressPicks?.selectedCampaign || ''][finalMissionName || '']

            setFinalMission(!!finalMissionData && heroesAct2Wins >= 2 ? finalMissionData.act2MissionNameHeroWin : finalMissionData.act2MissionNameOverlordWin)

        } else {
            setFinalMission(undefined);
        }
    }, [act2Missions])

    useEffect(() => {
        const selectedCampaignData = Object.keys(campaignsData?.[campaignProgressPicks?.selectedCampaign || '']);
        const heroesAct1Wins = Object.keys(campaignProgressPicks?.availableMissions || {}).reduce((acc: number, missionName: string) => {
            if (
                campaignsData?.[campaignProgressPicks?.selectedCampaign || '']?.[missionName].act === 1 &&
                campaignProgressPicks?.availableMissions?.[missionName] === 'heroes'
            ) {
                return acc + 1;
            }
            return acc;
        }, 0);

        if (!!selectedCampaignData.length) {
            const interludeMissionName = selectedCampaignData.find(
                (missionName) => (
                    campaignsData[campaignProgressPicks?.selectedCampaign || ''][missionName]?.missionType === 'interlude'
                ));
            const interludeMissionData = campaignsData[campaignProgressPicks?.selectedCampaign || ''][interludeMissionName || '']

            setInterludeMission(!!interludeMissionData && heroesAct1Wins >= 2 ? interludeMissionData.act2MissionNameHeroWin : interludeMissionData.act2MissionNameOverlordWin)
        } else {
            setInterludeMission(undefined);
        }
    }, [campaignProgressPicks?.selectedCampaign, campaignsData, campaignProgressPicks?.availableMissions])

    useEffect(() => {
        if (!!campaignProgressPicks?.selectedCampaign) {
            const allMissions = Object.keys(campaignsData[campaignProgressPicks.selectedCampaign]);

            const act1MissionsLength = Object.keys(campaignProgressPicks?.availableMissions || {})?.filter((missionName) => {
                const missionData = campaignsData?.[campaignProgressPicks?.selectedCampaign || '']?.[missionName];

                return (
                    campaignProgressPicks?.availableMissions?.[missionName] &&
                    missionData?.act === 1 &&
                    missionData?.missionType === 'mission'
                )
            }).length

            const newAct1Missions = allMissions.reduce((acc: string[], missionName) => {
                const missionData = campaignsData?.[campaignProgressPicks?.selectedCampaign || '']?.[missionName];
                const isAct1 = missionData.act === 1;
                const isRegularMission = missionData.missionType === 'mission'
                const isInProgressPicks = !!campaignProgressPicks?.availableMissions?.[missionName];

                if (isAct1 && isRegularMission && (isInProgressPicks || act1MissionsLength < 3)) {
                    return (
                        [...acc, missionName]
                    )
                }
                return acc;
            }, [])

            setAct1Missions(newAct1Missions);
        } else {
            setAct1Missions([]);
        }
    }, [campaignProgressPicks?.selectedCampaign, campaignsData, campaignProgressPicks?.availableMissions])

    useEffect(() => {
        if (!!campaignProgressPicks?.selectedCampaign && !!campaignsData?.[campaignProgressPicks.selectedCampaign]) {
            const excludedMissions = act1Missions?.reduce((acc: string[], missionName) => {
                const missionResult = campaignProgressPicks?.availableMissions?.[missionName];
                const missionData = campaignsData[campaignProgressPicks?.selectedCampaign || ''][missionName];
                const missionToExclude = missionResult === 'heroes' ? missionData.act2MissionNameOverlordWin : missionData.act2MissionNameHeroWin;

                if (!!missionToExclude) {
                    return [
                        ...acc,
                        missionToExclude
                    ]
                }
                return acc;
            }, [])

            const allMissions = Object.keys(campaignsData[campaignProgressPicks.selectedCampaign]);

            const act2MissionsLength = Object.keys(campaignProgressPicks?.availableMissions || {})?.filter((missionName) => {
                const missionData = campaignsData?.[campaignProgressPicks?.selectedCampaign || '']?.[missionName];

                return (
                    campaignProgressPicks?.availableMissions?.[missionName] &&
                    missionData?.act === 2 &&
                    missionData?.missionType === 'mission'
                )
            }).length

            const newAct2Missions = allMissions.reduce((acc: string[], missionName) => {
                const mission = campaignsData[campaignProgressPicks?.selectedCampaign || '']?.[missionName];
                const isAct2 = mission.act === 2;
                const isRegularMission = mission.missionType === 'mission'
                const isInProgressPicks = !!campaignProgressPicks?.availableMissions?.[missionName];

                if (isAct2 && isRegularMission && !excludedMissions.includes(missionName) && (isInProgressPicks || act2MissionsLength < 3)) {
                    return (
                        [...acc, missionName]
                    )
                }
                return acc;
            }, [])
            setAct2Missions(newAct2Missions)
        } else {
            setAct2Missions([])
        }
    }, [campaignsData, act1Missions, campaignProgressPicks?.availableMissions, campaignProgressPicks?.selectedCampaign])

    const dispatchCampaignProgress = (campaignName: string) => {
        dispatch({
            payload: {selectedCampaign: campaignName},
            actionType: GameSaveReducerActionTypeEnum.changeCampaignProgressPicks
        },)
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
                    value={selectedCampaign}
                    options={availableCampaigns}
                    onChange={(value) => {
                        dispatchCampaignProgress(value?.value)
                    }}
                    isClearable
                    name="select-campaign"
                    placeholder={getControlTranslation('Campaign')}
                />
            </fieldset>

            {!!introMission && (
                <fieldset>
                    <legend>{getControlTranslation('Интро')}</legend>
                    <CampaignProgressAdventure missionName={introMission}/>
                </fieldset>
            )}

            <fieldset>
                <legend>{getControlTranslation(ControlsNameEnum.act1)}</legend>
                <div className={styles.missionsColumn}>{act1Missions?.map((missionName) => (
                    <CampaignProgressAdventure missionName={missionName}
                                               key={`${ControlsNameEnum.act1}-${missionName}`}/>
                ))}</div>
            </fieldset>

            {!!interludeMission && (
                <fieldset>
                    <legend>{getControlTranslation(ControlsNameEnum.interlude)}</legend>
                    <CampaignProgressAdventure missionName={interludeMission}/>
                </fieldset>
            )}

            <fieldset>
                <legend>{getControlTranslation(ControlsNameEnum.act2)}</legend>
                <div className={styles.missionsColumn}>{act2Missions?.map((missionName) => (
                    <CampaignProgressAdventure missionName={missionName}
                                               key={`${ControlsNameEnum.act2}-${missionName}`}/>
                ))}</div>
            </fieldset>

            {!!finalMission && (
                <fieldset>
                    <legend>{getControlTranslation(ControlsNameEnum.final)}</legend>
                    <CampaignProgressAdventure missionName={finalMission}/>
                </fieldset>
            )}

            <Button theme='outlineRed' onClick={handleSaveChanges}>
                {getControlTranslation('Save')}
            </Button>
        </div>)
}