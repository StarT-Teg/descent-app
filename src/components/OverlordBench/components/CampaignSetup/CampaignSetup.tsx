import {CampaignPicksInterface, SelectionOptionInterface} from "../../../../types/shared";
import {toSelectOption} from "../../../../helpers";
import React, {useState} from "react";
import Select from "react-select";
import {useOverlordDataContext} from "../../../../context/overlord-data-context";
import {useGameSaveContext, useGameSaveDispatchContext} from "../../../../context/game-save-context";
import {GameSaveReducerActionTypeEnum} from "../../../../context/game-save-context-reducer";


export const CampaignSetup = () => {

    const {campaignsData} = useOverlordDataContext();

    const {campaignPicks} = useGameSaveContext();
    const dispatch = useGameSaveDispatchContext();

    const availableCampaigns = Object.keys(campaignsData || {}).map((campaignName) => ({
        value: campaignName,
        label: campaignName
    }))
    const availableActs = [{value: 1, label: 'Act 1'}, {value: 2, label: 'Act 2'}]
    const [availableMissions, setAvailableMissions] = useState<SelectionOptionInterface[] | undefined>(undefined);
    const availableEncounters = [{value: 1, label: 'Encounter 1'}, {value: 2, label: 'Encounter 2'}]

    const selectedCampaign: SelectionOptionInterface | undefined | null = toSelectOption(campaignPicks?.selectedCampaign);
    const selectedAct: SelectionOptionInterface | undefined | null = toSelectOption(campaignPicks?.selectedAct, `Act ${campaignPicks.selectedAct}`);
    const selectedMission: SelectionOptionInterface | undefined | null = toSelectOption(campaignPicks?.selectedMission);
    const selectedEncounter: SelectionOptionInterface | undefined | null = toSelectOption(campaignPicks?.selectedEncounter, `Encounter ${campaignPicks?.selectedEncounter}`);

    const dispatchCampaignPicks = (dispatchCampaignPicks: CampaignPicksInterface) => {

        const newCampaignPicks: CampaignPicksInterface = {
            ...campaignPicks,
            ...dispatchCampaignPicks,
        }

        if (!!campaignsData && !!newCampaignPicks.selectedCampaign) {
            const campaignName = newCampaignPicks.selectedCampaign;

            if (!!newCampaignPicks.selectedAct) {
                const availableMissions = Object.keys(campaignsData[campaignName]).reduce((acc: SelectionOptionInterface[], missionName) => {
                    if (campaignsData[campaignName][missionName].act === newCampaignPicks.selectedAct) {
                        return (
                            [...acc, {
                                value: missionName,
                                label: missionName
                            }]
                        )
                    }
                    return acc;
                }, [])
                setAvailableMissions(availableMissions)

            } else {
                const availableMissions = Object.keys(campaignsData[campaignName]).map((missionName) => ({
                    value: missionName,
                    label: missionName
                }))
                setAvailableMissions(availableMissions)
            }

            if (!!newCampaignPicks.selectedMission) {
                const missionName = newCampaignPicks.selectedMission;

                newCampaignPicks.selectedEncounter = Object.keys(campaignsData?.[campaignName]?.[missionName]?.encounters || {}).length === 1 ? 1 : newCampaignPicks?.selectedEncounter;
                newCampaignPicks.selectedAct = campaignsData[campaignName][missionName].act;
            } else {
                newCampaignPicks.selectedEncounter = undefined;
            }

        } else {
            newCampaignPicks.selectedCampaign = undefined;
            newCampaignPicks.selectedAct = undefined;
            newCampaignPicks.selectedMission = undefined;
            newCampaignPicks.selectedEncounter = undefined;
            setAvailableMissions(undefined);
        }

        dispatch({
            payload: {campaignPicks: {...newCampaignPicks}},
            actionType: GameSaveReducerActionTypeEnum.changeCampaignPicks
        },)
    }

    return (
        <>
            <Select
                className={'input'}
                value={toSelectOption(campaignPicks.selectedCampaign)}
                options={availableCampaigns}
                onChange={(value, actionMeta) => {
                    dispatchCampaignPicks({selectedCampaign: value?.value})
                }}
                isClearable
                name="select-campaign"
                placeholder={'Campaign'}
            />

            <Select
                className={'input'}
                value={selectedAct}
                options={availableActs}
                onChange={(value, actionMeta) => {
                    dispatchCampaignPicks({selectedAct: value?.value})
                }}
                isClearable
                name="select-act"
                placeholder={'Act'}
            />

            <Select
                className={'input'}
                value={selectedMission}
                options={availableMissions}
                onChange={(value, actionMeta) => {
                    dispatchCampaignPicks({selectedMission: value?.value})
                }}
                isClearable
                name="select-mission"
                placeholder={'Mission'}
            />

            {Object.keys(campaignsData?.[selectedCampaign?.value]?.[selectedMission?.value]?.encounters || {}).length > 1 && (
                <Select
                    className={'input'}
                    value={selectedEncounter}
                    options={availableEncounters}
                    onChange={(value, actionMeta) => {
                        dispatchCampaignPicks({selectedEncounter: value?.value})
                    }}
                    isClearable
                    name="select-mission"
                    placeholder={'Encounter'}
                />
            )}

        </>
    )
}