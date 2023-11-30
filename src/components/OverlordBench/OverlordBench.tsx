import {useGetCampaignsData} from "../../dataHooks";
import Select from "react-select";
import styles from "../HeroBundle/HeroSheet/сomponents/HeroSheetName/hero-sheet-name.module.css";
import React, {useEffect, useState} from "react";

interface SelectionOptionInterface {
    value: any,
    label: string,
}

export const OverlordBench = () => {

    const {data: campaignData} = useGetCampaignsData();

    const [selectedCampaign, setCampaign] = useState<SelectionOptionInterface | undefined | null>(undefined);
    const [selectedAct, setAct] = useState<SelectionOptionInterface | undefined | null>(undefined);
    const [selectedMission, setMission] = useState<SelectionOptionInterface | undefined | null>(undefined);
    const [selectedEncounter, setEncounter] = useState<SelectionOptionInterface | undefined | null>(undefined);

    console.log('mission: ', selectedMission)

    const availableCampaigns = Object.keys(campaignData || {}).map((campaignName) => ({
        value: campaignName,
        label: campaignName
    }))
    const availableActs = [{value: 1, label: 'Act 1'}, {value: 2, label: 'Act 2'}]
    const [availableMissions, setAvailableMissions] = useState<SelectionOptionInterface[] | undefined>(undefined);
    const availableEncounters = [{value: 1, label: 'Encounter 1'}, {value: 2, label: 'Encounter 2'}]

    useEffect(() => {
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
                setMission(null);
                setAvailableMissions(availableMissions)
            } else {
                const availableMissions = Object.keys(campaignData[selectedCampaign.value]).map((missionName) => ({
                    value: missionName,
                    label: missionName
                }))
                setMission(null);
                setAvailableMissions(availableMissions)
            }
        } else {
            setMission(null);
            setAvailableMissions(undefined);
        }
    }, [selectedCampaign, selectedAct])

    return (
        <div>
            <Select
                className={styles.singleSelect}
                value={selectedCampaign}
                options={availableCampaigns}
                onChange={(value, actionMeta) => {
                    setCampaign(value)
                }}
                isClearable
                name="select-campaign"
                placeholder={'Campaign'}
            />

            <Select
                className={styles.singleSelect}
                value={selectedAct}
                options={availableActs}
                onChange={(value, actionMeta) => {
                    setAct(value)
                }}
                isClearable
                name="select-act"
                placeholder={'Act'}
            />

            <Select
                className={styles.singleSelect}
                value={selectedMission}
                options={availableMissions}
                onChange={(value, actionMeta) => {
                    setMission(value)
                }}
                isClearable
                name="select-mission"
                placeholder={'Mission'}
            />

            {Object.keys(campaignData?.[selectedCampaign?.value]?.[selectedMission?.value]?.encounters || {}).length > 1 && (
                <Select
                    className={styles.singleSelect}
                    value={selectedEncounter}
                    options={availableEncounters}
                    onChange={(value, actionMeta) => {
                        setEncounter(value)
                    }}
                    isClearable
                    name="select-mission"
                    placeholder={'Encounter'}
                />
            )}

            <div>

            </div>
        </div>
    )
}