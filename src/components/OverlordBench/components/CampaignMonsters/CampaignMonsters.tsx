import React from "react";
import {CurrentOverlordPicks, SelectionOptionInterface} from "../../../../shared";
import {GameSaveReducerActionTypeEnum} from "../../../../context/game-save-context-reducer";
import {useGameSaveContext, useGameSaveDispatchContext} from "../../../../context/game-save-context";
import styles from './campaign-monsters.module.css'
import classNames from 'classnames';
import {useBrFunctions} from "../../../../helpers/hooks/useBrFunctions";
import {toSelectOption, useGetOverlordPicks} from "../../../../helpers";
import Select from "react-select";
import {useOverlordDataContext} from "../../../../context/overlord-data-context";
import ReactSwitch from "react-switch";
import {MonsterShowcase} from "../MonsterShowcase/MonsterShowcase";
import {ModalPortal} from "../../../Modal/ModalPortal";
import {MonsterCard} from "../MonsterCard/MonsterCard";
import {useGetControlTranslation} from "../../../../helpers/translationHelpers";
import {SuggestTranslationButton} from "../../../SuggestTranslationButton/SuggestTranslationButton";

export const CampaignMonsters = () => {

    const {getMonsterGroupBr, getLieutenantBr, getOverlordAvailableBr} = useBrFunctions();

    const {
        getOverlordDefaultMonsters,
        getOverlordDefaultLieutenants,
        getOverlordOpenGroups,
        getOpenGroupLimit,
        isMonsterChangeActAvailable
    } = useGetOverlordPicks();

    const {relics, monsters, lieutenants} = useOverlordDataContext()
    const {overlordPicks, campaignPicks, language} = useGameSaveContext();
    const {pickedMonsters = [], customActPicks = []} = overlordPicks;

    const {getControlTranslation} = useGetControlTranslation()

    const dispatch = useGameSaveDispatchContext();

    const availableRelics: SelectionOptionInterface[] = Object.values(relics).map(relicData => toSelectOption(relicData.name)!)

    const defaultMonsters = getOverlordDefaultMonsters();
    const defaultLieutenants = getOverlordDefaultLieutenants()
    const openGroupMonsters = getOverlordOpenGroups()

    const freeBr = getOverlordAvailableBr()

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

    const getMonsterNameTranslation = (monsterName: string) => (
        monsters[monsterName || '']['act1']?.master?.translation?.name?.[language] || monsterName
    )

    const getLieutenantNameTranslation = (lieutenantName: string) => (
        lieutenants[lieutenantName]?.translation?.name?.[language] || lieutenantName
    )

    const getRelicTranslation = (relicName?: string) => (
        relics[relicName || '']?.translation?.name?.[language] || relicName
    )

    return (
        <>
            {!![...defaultMonsters, ...pickedMonsters]?.length && (
                <fieldset>
                    <legend>{getControlTranslation('Monster serial numbers')}</legend>
                    <p className="input">{[...defaultMonsters, ...pickedMonsters].map(monsterName => monsters[monsterName].act1.master?.serialNumber).filter(monsterBr => !!monsterBr).sort((a, b) => (Number(a) - Number(b))).join(', ')}</p>
                </fieldset>
            )}

            {!!defaultLieutenants.length && (
                <fieldset>
                    <legend>{getControlTranslation('Lieutenants')}</legend>

                    {defaultLieutenants.map((lieutenantName: string, index) => {
                            const pickedRelic = overlordPicks?.pickedRelics?.[lieutenantName];
                            const isCanChangeAct = isMonsterChangeActAvailable(lieutenantName);
                            const minMonsterGroupBr = getLieutenantBr(lieutenantName, 1);
                            const maxMonsterGroupBr = getLieutenantBr(lieutenantName, 2);
                            const isSwitchDisabled = !(customActPicks.includes(lieutenantName) || campaignPicks.selectedAct === 2) && (maxMonsterGroupBr - minMonsterGroupBr) > freeBr

                            return (
                                <div key={`lieutenant-${lieutenantName}-${index}`}>
                                    <div className={styles.defaultMonsterLine}>
                                        <input type="text" readOnly value={getLieutenantNameTranslation(lieutenantName)}
                                               disabled
                                               className={'input'}
                                        />

                                        <SuggestTranslationButton stringToTranslate={lieutenantName}/>
                                        <div className={styles.br}>
                                            {getLieutenantBr(lieutenantName)}
                                        </div>
                                    </div>

                                    <div className={styles.unitOptions}>

                                        {isCanChangeAct && (
                                            <ReactSwitch
                                                uncheckedIcon={<div className={styles.switchIcon}><p>II</p></div>}
                                                checkedIcon={<div className={styles.switchIcon}><p>I</p></div>}
                                                checked={campaignPicks.selectedAct === 2 ? customActPicks.includes(lieutenantName) : !customActPicks.includes(lieutenantName)}
                                                onChange={() => {
                                                    onCustomActPick(lieutenantName)
                                                }}
                                                className={styles.extraSwitch}
                                                offColor={'#fc8245'}
                                                onColor={'#627a83'}
                                                disabled={isSwitchDisabled}
                                            />
                                        )}

                                        <Select
                                            className={'smallInput'}
                                            value={toSelectOption(pickedRelic, getRelicTranslation(pickedRelic))}
                                            options={availableRelics}
                                            onChange={(value) => {
                                                dispatchOverlordPicks({
                                                    pickedRelics: {
                                                        ...overlordPicks?.pickedRelics,
                                                        [lieutenantName]: value?.value || undefined
                                                    }
                                                })
                                            }}
                                            isClearable
                                            name={`${lieutenantName}-relic-select`}
                                            placeholder={getControlTranslation('Relic')}
                                        />

                                        <SuggestTranslationButton stringToTranslate={pickedRelic}/>
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
                    <legend>{getControlTranslation('Default Groups')}</legend>

                    {defaultMonsters.map((monsterName: string, index) => {
                            const isMonsterPicked = pickedMonsters?.includes(monsterName);
                            const isCanChangeAct = isMonsterChangeActAvailable(monsterName);
                            const minMonsterGroupBr = getMonsterGroupBr(monsterName, 1);
                            const maxMonsterGroupBr = getMonsterGroupBr(monsterName, 2);
                            const isSwitchDisabled = !(customActPicks.includes(monsterName) || campaignPicks.selectedAct === 2) && (isMonsterPicked ? (maxMonsterGroupBr - minMonsterGroupBr) : maxMonsterGroupBr) > freeBr

                            return (
                                <div key={`default-monster-${index}`}>
                                    <div className={styles.defaultMonsterLine}>
                                        <input type="text" readOnly value={getMonsterNameTranslation(monsterName)}
                                               disabled
                                               className={'input'}
                                        />

                                        <ModalPortal modalComponent={
                                            () => (
                                                <MonsterCard monsterName={monsterName}/>
                                            )
                                        } openModalButtonComponent={
                                            (onOpen) => (
                                                <div className={styles.monsterPreviewIcon} onClick={onOpen}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={16}
                                                        height={16}
                                                        fill="currentColor"
                                                        className="bi bi-eye"
                                                    >
                                                        <path
                                                            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                                        <path
                                                            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                                    </svg>
                                                </div>
                                            )
                                        }/>

                                        <SuggestTranslationButton stringToTranslate={monsterName}/>

                                        <div className={styles.br}>
                                            {getMonsterGroupBr(monsterName)}
                                        </div>
                                    </div>

                                    <div className={styles.unitOptions}>
                                        {isCanChangeAct && (
                                            <ReactSwitch uncheckedIcon={<div className={styles.switchIcon}><p>II</p></div>}
                                                         checkedIcon={<div className={styles.switchIcon}><p>I</p></div>}
                                                         checked={campaignPicks.selectedAct === 2 ? customActPicks.includes(monsterName) : !customActPicks.includes(monsterName)}
                                                         onChange={() => {
                                                             onCustomActPick(monsterName)
                                                         }}
                                                         className={styles.extraSwitch}
                                                         offColor={'#fc8245'}
                                                         onColor={'#627a83'}
                                                         disabled={isSwitchDisabled}
                                            />
                                        )}

                                    </div>
                                </div>
                            )
                        }
                    )
                    }
                </fieldset>
            )}

            <fieldset>
                <legend>{`${getControlTranslation('Open Groups')} ( ${openGroupsLimit} )`}</legend>

                {!!openGroupMonsters?.length && (
                    <MonsterShowcase/>
                )}

                {openGroupMonsters.map((monsterName: string, index) => {
                        const isMonsterPicked = pickedMonsters?.includes(monsterName);
                        const isCanChangeAct = isMonsterChangeActAvailable(monsterName);
                        const minMonsterGroupBr = getMonsterGroupBr(monsterName, 1);
                        const maxMonsterGroupBr = getMonsterGroupBr(monsterName, 2);
                        const isDisabled = !isMonsterPicked && (minMonsterGroupBr > freeBr || pickedMonsters.length >= openGroupsLimit);
                        const isSwitchDisabled = !(customActPicks.includes(monsterName) || campaignPicks.selectedAct === 2) && (isMonsterPicked ? (maxMonsterGroupBr - minMonsterGroupBr) : maxMonsterGroupBr) > freeBr

                        return (
                            <div
                                key={`open-group-monster-${index}`}>
                                <div className={styles.openGroupMonsterLine}>
                                    <input type="checkbox"
                                           onChange={() => {
                                               onOpenGroupPicked(monsterName)
                                           }}
                                           checked={isMonsterPicked}
                                           className={isDisabled ? styles.disabled : undefined}
                                    />

                                    <input type="text" readOnly value={getMonsterNameTranslation(monsterName)}
                                           onClick={() => {
                                               onOpenGroupPicked(monsterName)
                                           }}
                                           className={classNames({[styles.disabled]: isDisabled}, 'input')}
                                    />

                                    <ModalPortal modalComponent={
                                        () => (
                                            <MonsterCard monsterName={monsterName}/>
                                        )
                                    } openModalButtonComponent={
                                        (onOpen) => (
                                            <div className={styles.monsterPreviewIcon} onClick={onOpen}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={16}
                                                    height={16}
                                                    fill="currentColor"
                                                    className="bi bi-eye"
                                                >
                                                    <path
                                                        d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                                    <path
                                                        d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                                </svg>
                                            </div>
                                        )
                                    }/>

                                    <SuggestTranslationButton stringToTranslate={monsterName}/>

                                    <div className={styles.br}>
                                        {getMonsterGroupBr(monsterName)}
                                    </div>
                                </div>

                                {isMonsterPicked && isCanChangeAct && (
                                    <div className={styles.unitOptions}>
                                        <ReactSwitch uncheckedIcon={<div className={styles.switchIcon}><p>II</p></div>}
                                                     checkedIcon={<div className={styles.switchIcon}><p>I</p></div>}
                                                     checked={isSwitchDisabled || (campaignPicks.selectedAct === 2 ? customActPicks.includes(monsterName) : !customActPicks.includes(monsterName))}
                                                     onChange={() => {
                                                         onCustomActPick(monsterName)
                                                     }}
                                                     className={styles.extraSwitch}
                                                     offColor={'#fc8245'}
                                                     onColor={'#627a83'}
                                                     disabled={isSwitchDisabled}
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