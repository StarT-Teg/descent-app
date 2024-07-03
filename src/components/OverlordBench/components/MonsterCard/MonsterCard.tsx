import styles from "./monster-card.module.css";
import React, {ReactNode, useEffect, useState} from "react";
import {useOverlordDataContext} from "../../../../context/overlord-data-context";
import {DiceIcon} from "../../../shared/icons/DiceIcon/DiceIcon";
import {AttackTypeIcon} from "../../../shared/icons/AttackTypeIcon/AttackTypeIcon";
import {useSwiper} from "swiper/react";
import {useGameSaveContext} from "../../../../context/game-save-context";
import classNames from "classnames";
import {getAbilityNameUnified} from "../../../../helpers/translationHelpers";
import {AbilitiesIcon, ActionTypeToSymbolEnum} from "../../../shared/icons/AbilitiesIcon/AbilitiesIcon";

export const imgId = 'monster-card-background-img'

const replaceAbilityNameNumbers = (abilityName: string) => {
    return abilityName.replace(/[0-9]+/gi, 'X').trim()
}

export const MonsterCard = ({monsterName}: { monsterName: string }) => {

    const swiper = useSwiper();

    const {campaignPicks, overlordPicks, language} = useGameSaveContext();
    const {selectedAct} = campaignPicks;
    const {customActPicks} = overlordPicks;

    const elementBounding = document.getElementById(imgId)?.getBoundingClientRect();

    const {monsters, abilitiesData} = useOverlordDataContext()
    const [maxWidth, setMaxWidth] = useState<number | undefined>(undefined)
    const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined)

    const [cardRotated, setCardRotated] = useState<boolean>(false)

    const currentAct = ('act' + selectedAct || 1) as 'act1' | 'act2';
    let act: 'act1' | 'act2' = customActPicks?.includes(monsterName) ? selectedAct === 2 ? 'act1' : 'act2' : currentAct;
    const monsterData = monsters[monsterName][act];
    const minionAbilities = [...(monsterData.minion?.abilities || []), ...(monsterData.minion?.surgeAbilities || []), ...(monsterData.minion?.actions || [])];
    const masterAbilities = [...(monsterData.master?.abilities || []), ...(monsterData.master?.surgeAbilities || []), ...(monsterData.master?.actions || [])];

    const getAbilityIconsReplaced = (text: string) => {

        const Icon = ({iconType}: { iconType: ActionTypeToSymbolEnum }) =>
            (
                <>
                    <AbilitiesIcon iconType={iconType}/>
                    {text.replace(/(s:|a:|ss:|sss:)/gi, '').trim()}
                </>
            )


        if (!!text.match(/sss:/gi)?.length) {
            return <Icon iconType={ActionTypeToSymbolEnum.tripleSurge}/>;
        }

        if (!!text.match(/ss:/gi)?.length) {
            return <Icon iconType={ActionTypeToSymbolEnum.doubleSurge}/>;
        }

        if (!!text.match(/s:/gi)?.length) {
            return <Icon iconType={ActionTypeToSymbolEnum.surge}/>;
        }

        if (!!text.match(/a:/gi)?.length) {
            return <Icon iconType={ActionTypeToSymbolEnum.action}/>;
        }

        return text;

    }

    const getAbilityTranslation = (abilityName: string): ReactNode => {
        const clearedAbilityName = getAbilityNameUnified(abilityName);
        const translation = abilitiesData?.[clearedAbilityName]?.translation?.name?.[language || ''];

        return getAbilityIconsReplaced(!!translation ? abilityName.replace(clearedAbilityName, translation) : abilityName);
    }

    const getDescriptionTranslation = (abilityName: string): string => {
        return abilitiesData?.[abilityName]?.translation?.description?.[language || ''] || abilitiesData?.[abilityName].description || '';
    }

    const getMonsterNameTranslation = (monsterName: string) => (
        monsters[monsterName || '']['act1']?.master?.translation?.name?.[language] || monsterName
    )

    const handleRotateCard = () => {
        setCardRotated(prevState => !prevState)
    }

    useEffect(() => {
        setMaxWidth(elementBounding?.width)
        setMaxHeight(elementBounding?.height)

        swiper?.update();
    }, [elementBounding, swiper])

    return (
        <div className={styles.flipCard} style={{maxWidth, width: maxWidth, maxHeight, height: maxHeight}}
             onClick={handleRotateCard}>
            <div className={classNames(styles.flipCardInner, {[styles.cardRotated]: cardRotated})}>
                <div className={styles.flipCardFront}>
                    <div className={styles.cardRoot}>
                        <div className={styles.cardContent}>
                            <div
                                className={styles.cardDataTable}
                            >
                                <div className={styles.cardHeaderStats}>
                                    <div className={styles.cardText}>{monsterData.minion.movement}</div>
                                    <div className={styles.cardText}>{monsterData.minion.wounds}</div>
                                    <div
                                        className={styles.cardDefenceDice}>{monsterData.minion.defenseDice.split(', ').map((diceColor, index, allDice) =>
                                        <DiceIcon size={allDice.length > 1 ? 25 : 35} type={diceColor}
                                                  key={`${monsterName}-minion-defence-dice-${diceColor}-${index}`}/>)}</div>
                                </div>
                                <div className={styles.cardHeaderAbilities}>
                                    {minionAbilities?.map((abilityName, index) => (
                                        <div key={`${monsterName}-minion-abilities-${abilityName}-${index}`}
                                             className={styles.abilityItem}>
                                            {getAbilityTranslation(abilityName)}
                                        </div>))}
                                </div>
                                <div className={styles.cardHeaderAttackDice}>
                                    {monsterData.minion.attackDice.split(', ').map((diceColor, index) => <DiceIcon
                                        type={diceColor}
                                        size={25}
                                        key={`${monsterName}-minion-attack-dice-${diceColor}-${index}`}
                                    />)}
                                </div>

                                <div className={styles.middleBlock}>
                                    <div className={styles.cardAttackTypeAndAct}>
                                        <AttackTypeIcon type={monsterData.minion.attackType}/>

                                        <div className={styles.cardAct}>
                                            {act === 'act1' ? 'I' : 'II'}
                                        </div>
                                    </div>

                                    <div className={styles.cardMonsterName}>
                                        {getMonsterNameTranslation(monsterName)}
                                    </div>
                                </div>

                                <div className={styles.cardHeaderAttackDice}>
                                    {monsterData.master.attackDice.split(', ').map((diceColor, index) => <DiceIcon
                                        type={diceColor}
                                        size={25}
                                        key={`${monsterName}-master-attack-dice-${diceColor}-${index}`}/>)}
                                </div>

                                <div className={styles.cardHeaderAbilities}>
                                    {masterAbilities.map((abilitieName, index) => (
                                        <div
                                            key={`${monsterName}-master-abilities-${abilitieName}-${index}`}>{getAbilityTranslation(abilitieName)}</div>))}
                                </div>

                                <div className={styles.cardHeaderStats}>
                                    <div className={styles.cardText}>{monsterData.master.movement}</div>
                                    <div className={styles.cardText}>{monsterData.master.wounds}</div>
                                    <div
                                        className={styles.cardDefenceDice}>{monsterData.master.defenseDice.split(', ').map((diceColor, index, allDice) =>
                                        <DiceIcon size={allDice.length > 1 ? 25 : 35} type={diceColor}
                                                  key={`${monsterName}-master-defence-dice-${diceColor}-${index}`}
                                        />)}
                                    </div>
                                </div>

                            </div>
                            <img className={styles.backgroundImg} id={imgId}
                                 src={require('../../../../assets/img/monsterShowcase/monster-card-front.png')}
                                 alt={''}/>
                        </div>
                    </div>
                </div>
                <div className={styles.flipCardBack}>
                    <div className={styles.cardRoot}>
                        <div className={styles.cardContent}>
                            <div className={styles.cardDataTable}>
                                <div className={styles.backCardHeader}>
                                    <div>1</div>
                                    <div className={styles.cardAct}>
                                        {act === 'act1' ? 'I' : 'II'}
                                    </div>
                                    <div>2</div>
                                </div>
                                <div className={styles.backCardMonsterName}>
                                    {getMonsterNameTranslation(monsterName)}
                                </div>
                                <div className={styles.backCardAbilities}>
                                    {[...minionAbilities, ...masterAbilities]
                                        .reduce((acc: string[], abilityName, index, array) => {
                                            const unifiedAbility = getAbilityNameUnified(abilityName);
                                            const unifiedArray = array.map((abilityName) => getAbilityNameUnified(abilityName));

                                            if (unifiedArray.indexOf(unifiedAbility) === index && !!abilitiesData?.[unifiedAbility]) {
                                                return [...acc, abilityName]
                                            }

                                            return [...acc]
                                        }, [])
                                        .map((abilityName, index) => {
                                            const abilityNameUnified = getAbilityNameUnified(abilityName);
                                            return (
                                                <div
                                                    key={`${monsterName}-abilities-description-${abilityName}-${index}`}>
                                                <span>
                                                    <b>{getAbilityTranslation(replaceAbilityNameNumbers(abilityName))}:</b> {getDescriptionTranslation(abilityNameUnified)}
                                                </span>
                                                </div>
                                            )
                                        })}
                                </div>
                                <div className={styles.backCardCount}>
                                    <div className={styles.backCardCountSize}>
                                        <b>{monsterData?.minion?.groupSize['2']}</b>
                                        <b>{monsterData?.master?.groupSize['2']}</b>
                                    </div>
                                    <div className={styles.backCardCountSize}>
                                        <b>{monsterData?.minion?.groupSize['3']}</b>
                                        <b>{monsterData?.master?.groupSize['3']}</b>
                                    </div>
                                    <div className={styles.backCardCountSize}>
                                        <b>{monsterData?.minion?.groupSize['4']}</b>
                                        <b>{monsterData?.master?.groupSize['4']}</b>
                                    </div>
                                </div>
                            </div>
                            <img className={styles.backgroundImg}
                                 src={require('../../../../assets/img/monsterShowcase/monster-card-back.png')}
                                 alt={''}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}