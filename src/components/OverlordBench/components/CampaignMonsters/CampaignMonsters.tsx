import React, {useEffect, useState} from "react";
import {CurrentOverlordPicks, SelectionOptionInterface} from "../../../../types/shared";
import {GameSaveReducerActionTypeEnum} from "../../../../context/game-save-context-reducer";
import {useGameSaveContext, useGameSaveDispatchContext} from "../../../../context/game-save-context";
import styles from './campaign-monsters.module.css'
import classNames from 'classnames';
import {useBrFunctions} from "../../../../helpers/hooks/useBrFunctions";
import {toSelectOption, useGetOverlordPicks} from "../../../../helpers";
import {Accordion, AccordionItem} from "../../../shared";
import Select from "react-select";
import {useOverlordDataContext} from "../../../../context/overlord-data-context";
import ReactSwitch from "react-switch";

export const CampaignMonsters = () => {

    const {getMonsterGroupBr, getLieutenantBr, getOverlordAvailableBr} = useBrFunctions();

    const {
        getOverlordDefaultMonsters,
        getOverlordDefaultLieutenants,
        getOverlordOpenGroups,
        getOpenGroupLimit
    } = useGetOverlordPicks();

    const {relics} = useOverlordDataContext()
    const {overlordPicks} = useGameSaveContext();
    const {pickedMonsters = [], customActPicks = []} = overlordPicks;

    const dispatch = useGameSaveDispatchContext();

    const availableRelics: SelectionOptionInterface[] = Object.values(relics).map(relicData => toSelectOption(relicData.name)!)

    const defaultMonsters = getOverlordDefaultMonsters();
    const defaultLieutenants = getOverlordDefaultLieutenants()
    const openGroupMonsters = getOverlordOpenGroups()

    const freeBr = getOverlordAvailableBr()
    const [maxBrLimit, setMaxBrLimit] = useState<number>(freeBr);

    const openGroupsLimit = getOpenGroupLimit();

    const dispatchOverlordPicks = (dispatchOverlordPicks: CurrentOverlordPicks) => {
        dispatch({
            payload: {overlordPicks: {...dispatchOverlordPicks}},
            actionType: GameSaveReducerActionTypeEnum.changeOverlordPicks
        })
    }

    const onCustomActPick = (unitName: string) => {
        let newPicks: string[] = [...customActPicks || []]

        if (newPicks?.includes(unitName)) {
            newPicks = newPicks.filter((name) => name !== unitName);
        } else {
            newPicks.push(unitName);
        }

        dispatchOverlordPicks({customActPicks: newPicks})
    }

    const onOpenGroupPicked = (monsterName: string) => {
        let newMonsters: string[] = [...pickedMonsters || []]

        if (newMonsters?.includes(monsterName)) {
            newMonsters = newMonsters.filter((name) => name !== monsterName);
        } else {
            newMonsters.push(monsterName);
        }

        dispatchOverlordPicks({pickedMonsters: newMonsters})
    }

    useEffect(() => {
        let newMaxBrLimit = freeBr;

        for (let i = 1; i < (openGroupsLimit - pickedMonsters.length); i++) {
            if (!!openGroupMonsters[openGroupMonsters.length - (i)]) {
                newMaxBrLimit -= getMonsterGroupBr(openGroupMonsters[openGroupMonsters.length - (i)])
            }
        }

        setMaxBrLimit(newMaxBrLimit);
    }, [getOverlordAvailableBr, getMonsterGroupBr, openGroupMonsters, openGroupsLimit])

    return (
        <>
            {!!defaultLieutenants.length && (
                <fieldset>
                    <legend>Lieutenants</legend>

                    {defaultLieutenants.map((lieutenantName: string, index) => {
                            return (
                                <Accordion key={`${lieutenantName}-${index}`}>
                                    <AccordionItem
                                        chevronDisabled
                                        initialEntered
                                        theme='buttonWithOptions'
                                        header={<div key={`default-monster-${index}`}
                                                     className={styles.defaultMonsterLine}>
                                            <div className="input">
                                                {lieutenantName}
                                            </div>
                                            <div className={styles.br}>
                                                BR: {getLieutenantBr(lieutenantName)}
                                            </div>
                                        </div>}>

                                        <div className={styles.unitOptions}>
                                            <ReactSwitch
                                                uncheckedIcon={<div className={styles.switchIcon}><p>II</p></div>}
                                                checkedIcon={<div className={styles.switchIcon}><p>I</p></div>}
                                                checked={!customActPicks.includes(lieutenantName)}
                                                onChange={() => {
                                                    onCustomActPick(lieutenantName)
                                                }}
                                                className={styles.extraSwitch}
                                                offColor={'#fc8245'}
                                                onColor={'#627a83'}
                                            />

                                            <Select
                                                className={'smallInput'}
                                                value={toSelectOption(overlordPicks?.pickedRelics?.[lieutenantName])}
                                                options={availableRelics}
                                                onChange={(value, actionMeta) => {
                                                    dispatchOverlordPicks({
                                                        pickedRelics: {
                                                            ...overlordPicks?.pickedRelics,
                                                            [lieutenantName]: value?.value || undefined
                                                        }
                                                    })
                                                }}
                                                isClearable
                                                name={`${lieutenantName}-relic-select`}
                                                placeholder={'Relic'}
                                            />
                                        </div>

                                    </AccordionItem>
                                </Accordion>
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
                    const isMonsterPicked = pickedMonsters?.includes(monsterName);
                    const monsterGroupBr = getMonsterGroupBr(monsterName);
                    const isDisabled = ((monsterGroupBr > maxBrLimit) || (monsterGroupBr > freeBr) || pickedMonsters.length >= openGroupsLimit) && !pickedMonsters?.includes(monsterName);

                    return (
                        <div
                            key={`open-group-monster-${index}`}>
                            <div className={classNames(styles.openGroupMonsterLine, {[styles.disabled]: false})}>
                                <input type="checkbox"
                                       onChange={() => {
                                           onOpenGroupPicked(monsterName)
                                       }}
                                       checked={isMonsterPicked}
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

                            {isMonsterPicked && (
                                <div className={styles.unitOptions}>
                                    <ReactSwitch uncheckedIcon={<div className={styles.switchIcon}><p>II</p></div>}
                                                 checkedIcon={<div className={styles.switchIcon}><p>I</p></div>}
                                                 checked={!customActPicks.includes(monsterName)}
                                                 onChange={() => {
                                                     onCustomActPick(monsterName)
                                                 }}
                                                 className={styles.extraSwitch}
                                                 offColor={'#fc8245'}
                                                 onColor={'#627a83'}
                                    />
                                </div>
                            )}
                        </div>
                        )
                    }
                )
                }
            </fieldset>
        </>
    )
}