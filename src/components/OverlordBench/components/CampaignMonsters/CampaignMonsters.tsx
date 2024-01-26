import React, {useEffect, useState} from "react";
import {CurrentOverlordPicks} from "../../../../types/shared";
import {GameSaveReducerActionTypeEnum} from "../../../../context/game-save-context-reducer";
import {useOverlordDataContext} from "../../../../context/overlord-data-context";
import {useGameSaveContext, useGameSaveDispatchContext} from "../../../../context/game-save-context";
import styles from './campaign-monsters.module.css'
import classNames from 'classnames';
import {useBrFunctions} from "../../../../helpers/hooks/useBrFunctions";

export const CampaignMonsters = () => {

    const {getMonsterGroupBr, getLieutenantBr, getOverlordAvailableBr} = useBrFunctions();
    const {campaignsData, monsters} = useOverlordDataContext();

    const {overlordPicks, campaignPicks} = useGameSaveContext();
    const {selectedCampaign, selectedMission, selectedEncounter, selectedAct} = campaignPicks
    const {pickedCards, pickedMonsters} = overlordPicks;

    const dispatch = useGameSaveDispatchContext();

    const [overlordFamiliars, setOverlordFamiliars] = useState<string[]>([]);
    const [defaultMonsters, setDefaultMonsters] = useState<string[]>([])
    const [defaultLieutenants, setDefaultLieutenants] = useState<string[]>([])
    const [openGroupMonsters, setOpenGroups] = useState<string[]>([]);
    const [pickedOpenGroups, setPickedOpenGroups] = useState<string[]>([...pickedMonsters?.filter(monsterName => !defaultMonsters.includes(monsterName)) || []]);

    const [freeBr, setFreeBr] = useState<number>(getOverlordAvailableBr());
    const [maxBrLimit, setMaxBrLimit] = useState<number>(freeBr);

    const openGroupsLimit = campaignsData[selectedCampaign || '']?.[selectedMission || '']?.encounters?.[selectedEncounter || 0]?.openGroupsAmount || 0;

    const dispatchOverlordPicks = (dispatchOverlordPicks: CurrentOverlordPicks) => {
        dispatch({
            payload: {overlordPicks: {...dispatchOverlordPicks}},
            actionType: GameSaveReducerActionTypeEnum.changeOverlordPicks
        })
    }

    const onOpenGroupPicked = (monsterName: string) => {

        setPickedOpenGroups(prevState => {
            let newMonsters: string[] = [...prevState || []]

            if (newMonsters?.includes(monsterName)) {
                newMonsters = newMonsters.filter((name) => name !== monsterName);
            } else {
                newMonsters.push(monsterName);
            }

            return newMonsters;
        })

        const newPickedMonstersList: string[] = [...pickedOpenGroups, ...defaultMonsters]

        dispatchOverlordPicks({pickedMonsters: newPickedMonstersList})
    }

    useEffect(() => {
        const newFreeBr = getOverlordAvailableBr()
        let newMaxBrLimit = newFreeBr;

        for (let i = 1; i < (openGroupsLimit - pickedOpenGroups.length); i++) {
            if (!!openGroupMonsters[openGroupMonsters.length - (i)]) {
                newMaxBrLimit -= getMonsterGroupBr(openGroupMonsters[openGroupMonsters.length - (i)])
            }
        }

        setFreeBr(newFreeBr);
        setMaxBrLimit(newMaxBrLimit);
    }, [getOverlordAvailableBr, getMonsterGroupBr, openGroupMonsters, openGroupsLimit])

    useEffect(() => {
        const newOpenGroups: string[] = [];

        if (!!selectedCampaign && !!selectedMission && !!selectedEncounter) {

            const act: 'act1' | 'act2' = 'act' + campaignsData[selectedCampaign][selectedMission].act as 'act1' | 'act2';
            const availableTraits = campaignsData[selectedCampaign][selectedMission]?.encounters?.[selectedEncounter].openGroupsTraits;

            Object.values(monsters).forEach(monsterData => {
                const newMonster = monsterData?.[act]?.master;

                if (newMonster?.traits?.some(r => availableTraits?.includes(r)) && !defaultMonsters.includes(newMonster.name)) {
                    newOpenGroups.push(newMonster.name)
                }
            })


            const newLieutenants: string[] = campaignsData[selectedCampaign][selectedMission]?.encounters?.[selectedEncounter].lieutenants || [];
            setDefaultLieutenants(newLieutenants)
        }

        setPickedOpenGroups([])
        setOpenGroups(newOpenGroups.sort((a, b) => (getMonsterGroupBr(b) - getMonsterGroupBr(a))));
    }, [campaignsData, monsters, selectedCampaign, selectedMission, selectedEncounter, selectedAct, defaultMonsters])

    useEffect(() => {
        const newPickedMonstersList: string[] = [...pickedOpenGroups, ...defaultMonsters]

        dispatchOverlordPicks({pickedMonsters: newPickedMonstersList})
    }, [pickedOpenGroups, defaultMonsters])

    useEffect(() => {
        const newFamiliars: string[] = []

        if (pickedCards?.includes('Call of the Ravens')) {
            newFamiliars.push('Raven Flock')
        }
        if (pickedCards?.includes('Ties That Bind')) {
            newFamiliars.push('Scourge')
        }

        setOverlordFamiliars(newFamiliars);
    }, [pickedCards])

    useEffect(() => {
        const newDefaultMonsters = (campaignsData?.[selectedCampaign || '']?.[selectedMission || '']?.encounters?.[selectedEncounter || 0]?.monsters || []).concat(overlordFamiliars);

        setDefaultMonsters(newDefaultMonsters);
    }, [campaignsData, selectedCampaign, selectedMission, selectedEncounter, overlordFamiliars])

    return (
        <>
            {!!defaultLieutenants.length && (
                <fieldset>
                    <legend>Lieutenants</legend>

                    {defaultLieutenants.map((lieutenantName: string, index) => {
                            return (
                                <div key={`default-monster-${index}`} className={styles.defaultMonsterLine}>
                                    <div className="list">
                                        <input type="text" readOnly value={lieutenantName} disabled
                                               className={'input'}
                                        />
                                    </div>
                                    <div className={styles.br}>
                                        <>
                                            BR: {getLieutenantBr(lieutenantName)}
                                        </>
                                    </div>
                                </div>
                            )
                        }
                    )
                    }
                </fieldset>
            )}

            {!!defaultMonsters.length && (
                <fieldset>
                    <legend>Default Monsters</legend>

                    {defaultMonsters.map((monsterName: string, index) => {
                        return (
                            <div key={`default-monster-${index}`} className={styles.defaultMonsterLine}>
                                <div className="list">
                                    <input type="text" readOnly value={monsterName} disabled
                                           className={'input'}
                                    />
                                </div>
                                <div className={styles.br}>
                                    BR: {getMonsterGroupBr(monsterName)}
                                </div>
                                </div>
                            )
                        }
                    )
                    }
                </fieldset>
            )}

            <fieldset>
                <legend>Open Groups ( {openGroupsLimit} )</legend>

                {openGroupMonsters.map((monsterName: string, index) => {
                    const monsterGroupBr = getMonsterGroupBr(monsterName);
                    const isDisabled = ((monsterGroupBr > maxBrLimit) || (monsterGroupBr > freeBr) || pickedOpenGroups.length >= openGroupsLimit) && !pickedOpenGroups?.includes(monsterName);

                    return (
                        <div
                            className={classNames(styles.openGroupMonsterLine, {[styles.disabled]: isDisabled})}
                            key={`open-group-monster-${index}`}>
                            <input type="checkbox"
                                   onChange={() => {
                                       onOpenGroupPicked(monsterName)
                                   }}
                                   checked={pickedMonsters?.includes(monsterName)}
                                />

                                <input type="text" readOnly value={monsterName}
                                       onClick={() => {
                                           onOpenGroupPicked(monsterName)
                                       }}
                                       className={'input'}
                                />

                            <div className={styles.br}>
                                BR: {monsterGroupBr}
                            </div>
                            </div>
                        )
                    }
                )
                }
            </fieldset>
        </>
    )
}