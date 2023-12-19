import React, {useEffect, useState} from "react";
import {CurrentOverlordPicks} from "../../../../types/shared";
import {GameSaveReducerActionTypeEnum} from "../../../../context/game-save-context-reducer";
import {useOverlordDataContext} from "../../../../context/overlord-data-context";
import {useGameSaveContext, useGameSaveDispatchContext} from "../../../../context/game-save-context";
import styles from './campaign-monsters.module.css'
import {getMonsterGroupBr} from "../../../../helpers";

export const CampaignMonsters = () => {

    const {campaignsData, monsters} = useOverlordDataContext();

    const {overlordPicks, campaignPicks, heroesPicks} = useGameSaveContext();
    const {selectedCampaign, selectedMission, selectedEncounter, selectedAct} = campaignPicks
    const {purchasedCards, pickedCards, pickedMonsters} = overlordPicks;

    const dispatch = useGameSaveDispatchContext();

    const numberOfHeroes = Object.keys(heroesPicks).length;
    const currentAct = !!selectedAct ? `act${selectedAct}` : '';

    const [overlordFamiliars, setOverlordFamiliars] = useState<string[]>([]);
    const [defaultMonsters, setDefaultMonsters] = useState<string[]>([])
    const [openGroupMonsters, setOpenGroups] = useState<string[]>([]);
    const [pickedOpenGroups, setPickedOpenGroups] = useState<string[]>([]);

    const dispatchOverlordPicks = (dispatchOverlordPicks: CurrentOverlordPicks) => {

        const newOverlordPicks = {
            ...overlordPicks,
            ...dispatchOverlordPicks
        }

        dispatch({
            payload: {overlordPicks: {...newOverlordPicks}},
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
    }

    useEffect(() => {
        const newOpenGroups: string[] = [];

        if (!!selectedCampaign && !!selectedMission && !!selectedEncounter) {

            campaignsData[selectedCampaign][selectedMission].encounters?.[selectedEncounter].openGroupsTraits
                .forEach((groupTrait) => {
                    const act: 'act1' | 'act2' = 'act' + selectedAct as 'act1' | 'act2';

                    Object.keys(monsters).forEach(monsterName => {
                        const newMonster = monsters?.[monsterName]?.[act]?.master;

                        if (newMonster?.traits?.includes(groupTrait) && !defaultMonsters.includes(newMonster?.name)) {
                            newOpenGroups.push(monsterName);
                        }
                    })
                })
        }

        setOpenGroups(newOpenGroups);
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
        if (purchasedCards?.includes('Ties That Bind')) {
            newFamiliars.push('Scourge')
        }

        setOverlordFamiliars(newFamiliars);
    }, [pickedCards, purchasedCards])

    useEffect(() => {
        const newDefaultMonsters = (campaignsData?.[selectedCampaign || '']?.[selectedMission || '']?.encounters?.[selectedEncounter || 0]?.monsters || []).concat(overlordFamiliars);

        setDefaultMonsters(newDefaultMonsters);
    }, [campaignsData, selectedCampaign, selectedMission, selectedEncounter, overlordFamiliars])

    return (
        <>
            {!!defaultMonsters.length && (
                <fieldset>
                    <legend>Default Monsters</legend>

                    {defaultMonsters.map((monsterName: string, index) => {
                            return (
                                <div key={`default-monster-${index}`} className={styles.defaultMonsterLine}>
                                    <div className="list">
                                        <input type="text" readOnly value={monsterName}
                                               className={'input'}
                                        />
                                    </div>
                                    <div className={styles.br}>
                                        BR: {getMonsterGroupBr(monsters, monsterName, numberOfHeroes, currentAct)}
                                    </div>
                                </div>
                            )
                        }
                    )
                    }
                </fieldset>
            )}

            <fieldset>
                <legend>Open Groups
                    - {campaignsData[selectedCampaign || '']?.[selectedMission || '']?.encounters?.[selectedEncounter || 0]?.openGroupsAmount || 0}</legend>

                {openGroupMonsters?.sort((a, b) => (getMonsterGroupBr(monsters, b, numberOfHeroes, currentAct) - getMonsterGroupBr(monsters, a, numberOfHeroes, currentAct))).map((monsterName: string, index) => {
                        return (
                            <div className={styles.openGroupMonsterLine} key={`open-group-monster-${index}`}>
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
                                    BR: {getMonsterGroupBr(monsters, monsterName, numberOfHeroes, currentAct)}
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