import {useGetCampaignsData} from "../../../../dataHooks";
import {
    OverlordCurrentPicksReducerActionsEnum,
    useOverlordCurrentPicksContext,
    useOverlordPlayerPicksDispatchContext
} from "../../../../context";
import {CurrentOverlordPicks, SelectionOptionInterface} from "../../../../types/shared";
import {toSelectOption} from "../../../../helpers";
import React, {useEffect, useState} from "react";
import Select from "react-select";


export const CampaignSetup = () => {

    const {data: campaignData} = useGetCampaignsData();
    const overlordPicksContext = useOverlordCurrentPicksContext();
    const dispatch = useOverlordPlayerPicksDispatchContext();

    const selectedCampaign: SelectionOptionInterface | undefined | null = toSelectOption(overlordPicksContext.selectedCampaign);
    const selectedAct: SelectionOptionInterface | undefined | null = toSelectOption(overlordPicksContext.selectedAct, `Act ${overlordPicksContext.selectedAct}`);
    const selectedMission: SelectionOptionInterface | undefined | null = toSelectOption(overlordPicksContext.selectedMission);
    const selectedEncounter: SelectionOptionInterface | undefined | null = toSelectOption(overlordPicksContext.selectedEncounter);

    const availableCampaigns = Object.keys(campaignData || {}).map((campaignName) => ({
        value: campaignName,
        label: campaignName
    }))
    const availableActs = [{value: 1, label: 'Act 1'}, {value: 2, label: 'Act 2'}]
    const [availableMissions, setAvailableMissions] = useState<SelectionOptionInterface[] | undefined>(undefined);
    const availableEncounters = [{value: 1, label: 'Encounter 1'}, {value: 2, label: 'Encounter 2'}]

    const dispatchOverlordPicks = (overlordPicks: CurrentOverlordPicks) => {
        dispatch({overlordPicks: overlordPicks, actionType: OverlordCurrentPicksReducerActionsEnum.changePicks})
    }

    useEffect(() => {

        const newOverlordPicks: CurrentOverlordPicks = {}

        if (!!campaignData && !!selectedCampaign) {

            if (!!selectedAct) {
                const availableMissions = Object.keys(campaignData[selectedCampaign.value]).reduce((acc: SelectionOptionInterface[], missionName) => {
                    if (campaignData[selectedCampaign.value][missionName].act === selectedAct.value) {
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
                const availableMissions = Object.keys(campaignData[selectedCampaign.value]).map((missionName) => ({
                    value: missionName,
                    label: missionName
                }))
                newOverlordPicks.selectedMission = undefined;
                newOverlordPicks.selectedEncounter = undefined;
                setAvailableMissions(availableMissions)
            }

            if (!selectedMission) {
                newOverlordPicks.selectedEncounter = undefined;
            }

        } else {
            newOverlordPicks.selectedAct = undefined;
            newOverlordPicks.selectedMission = undefined;
            newOverlordPicks.selectedEncounter = undefined;
            setAvailableMissions(undefined);
        }

        dispatchOverlordPicks(newOverlordPicks)
    }, [overlordPicksContext.selectedCampaign, overlordPicksContext.selectedAct, overlordPicksContext.selectedMission, overlordPicksContext.selectedEncounter])

    return (
        <>
            <Select
                className={'input'}
                value={toSelectOption(overlordPicksContext.selectedCampaign)}
                options={availableCampaigns}
                onChange={(value, actionMeta) => {
                    dispatchOverlordPicks({selectedCampaign: value?.value})
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
                    dispatchOverlordPicks({selectedAct: value?.value})
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
                    dispatchOverlordPicks({selectedMission: value?.value})
                }}
                isClearable
                name="select-mission"
                placeholder={'Mission'}
            />

            {Object.keys(campaignData?.[selectedCampaign?.value]?.[selectedMission?.value]?.encounters || {}).length > 1 && (
                <Select
                    className={'input'}
                    value={selectedEncounter}
                    options={availableEncounters}
                    onChange={(value, actionMeta) => {
                        dispatchOverlordPicks({selectedEncounter: value?.value})
                    }}
                    isClearable
                    name="select-mission"
                    placeholder={'Encounter'}
                />
            )}
        </>
    )
}