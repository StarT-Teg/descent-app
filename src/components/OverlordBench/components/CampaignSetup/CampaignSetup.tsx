import {CampaignPicksInterface, SelectionOptionInterface} from "../../../../shared";
import {toSelectOption} from "../../../../helpers";
import React, {useEffect, useState} from "react";
import Select from "react-select";
import {useOverlordDataContext} from "../../../../context/overlord-data-context";
import {useGameSaveContext, useGameSaveDispatchContext} from "../../../../context/game-save-context";
import {GameSaveReducerActionTypeEnum} from "../../../../context/game-save-context-reducer";
import styles from "./campaign-setup.module.css";
import {SuggestTranslationButton} from "../../../SuggestTranslationButton/SuggestTranslationButton";
import {ControlsNameEnum, useGetControlTranslation} from "../../../../helpers/translationHelpers";


export const CampaignSetup = () => {

    const {campaignsData} = useOverlordDataContext();
    const {getControlTranslation} = useGetControlTranslation()

    const {campaignPicks, overlordPicks, language} = useGameSaveContext();
    const {selectedCampaign: selectedCampaignFromContext, selectedMission: selectedMissionFromContext} = campaignPicks;

    const dispatch = useGameSaveDispatchContext();

    const getCampaignTranslation = (campaignName: string | undefined) => {
        if (!!language && !!campaignName) {
            return Object.values(campaignsData[campaignName])[0]?.translation?.campaignName?.[language] || campaignName;
        }

        return campaignName;
    }

    const getMissionTranslation = (missionName?: string) => {
        if (!!language && !!campaignPicks?.selectedCampaign && !!missionName) {
            return campaignsData[campaignPicks.selectedCampaign][missionName]?.translation?.missionName?.[language] || missionName;
        }

        return missionName;
    }

    const availableCampaigns = Object.keys(campaignsData || {}).map((campaignName) => (toSelectOption(campaignName, getCampaignTranslation(campaignName))!))
    const availableActs = [{value: 1, label: `${getControlTranslation('Act')} 1`}, {
        value: 2,
        label: `${getControlTranslation('Act')} 2`
    }]
    const [availableMissions, setAvailableMissions] = useState<SelectionOptionInterface[] | undefined>(undefined);
    const availableEncounters = Object.keys(campaignsData?.[selectedCampaignFromContext || '']?.[selectedMissionFromContext || '']?.encounters || {})
        .map(encounter => toSelectOption(encounter, `${getControlTranslation('Encounter')} ${encounter}`)!)

    const selectedCampaign: SelectionOptionInterface | null = toSelectOption(campaignPicks?.selectedCampaign, getCampaignTranslation(campaignPicks?.selectedCampaign));
    const selectedAct: SelectionOptionInterface | null = toSelectOption(campaignPicks?.selectedAct, `${getControlTranslation('Act')} ${campaignPicks.selectedAct}`);
    const selectedMission: SelectionOptionInterface | null = toSelectOption(campaignPicks?.selectedMission, getMissionTranslation(campaignPicks?.selectedMission));
    const selectedEncounter: SelectionOptionInterface | null = toSelectOption(campaignPicks?.selectedEncounter, `${getControlTranslation('Encounter')} ${campaignPicks?.selectedEncounter}`);

    const dispatchCampaignPicks = (dispatchCampaignPicks: CampaignPicksInterface) => {
        const newCampaignPicks: CampaignPicksInterface = {
            ...campaignPicks,
            ...dispatchCampaignPicks,
        }

        const newOverlordPicks = {
            ...overlordPicks
        }

        if (!!campaignsData && !!newCampaignPicks.selectedCampaign) {
            const campaignName = newCampaignPicks.selectedCampaign;

            if (!!newCampaignPicks?.selectedMission && !!campaignsData?.[campaignName]?.[newCampaignPicks.selectedMission]) {
                const missionName = newCampaignPicks.selectedMission;

                const encounters = Object.keys(campaignsData?.[campaignName]?.[missionName]?.encounters || {});
                newCampaignPicks.selectedEncounter = encounters.length < 2 ? encounters[0] : newCampaignPicks?.selectedEncounter;
                newCampaignPicks.selectedAct = newCampaignPicks?.selectedAct || campaignsData?.[campaignName]?.[missionName]?.act;

                if (campaignsData?.[campaignName]?.[newCampaignPicks.selectedMission].act !== newCampaignPicks.selectedAct) {
                    newCampaignPicks.selectedMission = undefined;
                    newCampaignPicks.selectedEncounter = undefined;
                }

            } else {
                newCampaignPicks.selectedMission = undefined;
                newCampaignPicks.selectedEncounter = undefined;
            }

        } else {
            newCampaignPicks.selectedCampaign = undefined;
            newCampaignPicks.selectedAct = undefined;
            newCampaignPicks.selectedMission = undefined;
            newCampaignPicks.selectedEncounter = undefined;
        }

        dispatch({
            payload: {campaignPicks: {...newCampaignPicks}},
            actionType: GameSaveReducerActionTypeEnum.changeCampaignPicks
        },)

        dispatch({
            payload: {overlordPicks: {...newOverlordPicks, pickedMonsters: undefined, customActPicks: undefined}},
            actionType: GameSaveReducerActionTypeEnum.changeOverlordPicks
        },)
    }

    useEffect(() => {
        const newCampaignPicks: CampaignPicksInterface = {...campaignPicks}

        if (!!campaignsData && !!newCampaignPicks.selectedCampaign) {
            const campaignName = newCampaignPicks.selectedCampaign;

            if (!!newCampaignPicks.selectedAct) {
                const availableMissions = Object.keys(campaignsData[campaignName]).reduce((acc: SelectionOptionInterface[], missionName) => {
                    if (campaignsData[campaignName][missionName].act === newCampaignPicks.selectedAct) {
                        return (
                            [...acc, toSelectOption(missionName, getMissionTranslation(missionName))!]
                        )
                    }
                    return acc;
                }, [])
                setAvailableMissions(availableMissions)

            } else {
                const availableMissions = Object.keys(campaignsData[campaignName]).map((missionName) => (toSelectOption(missionName, getMissionTranslation(missionName))!))
                setAvailableMissions(availableMissions)
            }

        } else {
            setAvailableMissions(undefined);
        }
    }, [campaignPicks.selectedCampaign, campaignPicks.selectedAct, campaignPicks.selectedEncounter, campaignPicks.selectedMission])

    return (
        <>
            <div className={styles.listRow}>
                <Select
                    className={'input'}
                    value={selectedCampaign}
                    options={availableCampaigns}
                    onChange={(value) => {
                        dispatchCampaignPicks({selectedCampaign: value?.value})
                    }}
                    isClearable
                    name="select-campaign"
                    placeholder={getControlTranslation(ControlsNameEnum.campaign)}
                />

                <SuggestTranslationButton stringToTranslate={campaignPicks?.selectedCampaign}
                                          disabled={!campaignPicks?.selectedCampaign}/>
            </div>

            <Select
                className={'input'}
                value={selectedAct}
                options={availableActs}
                onChange={(value) => {
                    dispatchCampaignPicks({selectedAct: value?.value})
                }}
                isClearable
                name="select-act"
                placeholder={getControlTranslation('Act')}
            />

            <div className={styles.listRow}>
                <Select
                    className={'input'}
                    value={selectedMission}
                    options={availableMissions}
                    onChange={(value) => {
                        dispatchCampaignPicks({selectedMission: value?.value})
                    }}
                    isClearable
                    name="select-mission"
                    placeholder={getControlTranslation('Mission')}
                />
                <SuggestTranslationButton stringToTranslate={campaignPicks?.selectedMission}
                                          disabled={!campaignPicks?.selectedMission}/>
            </div>

            {Object.keys(campaignsData?.[selectedCampaign?.value]?.[selectedMission?.value]?.encounters || {}).length > 1 && (
                <Select
                    className={'input'}
                    value={selectedEncounter}
                    options={availableEncounters}
                    onChange={(value) => {
                        dispatchCampaignPicks({selectedEncounter: value?.value})
                    }}
                    isClearable
                    name="select-mission"
                    placeholder={getControlTranslation('Encounter')}
                />
            )}

        </>
    )
}