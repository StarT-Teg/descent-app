import styles from "./monster-card.module.css";
import React, {useEffect, useState} from "react";
import {useOverlordDataContext} from "../../../../context/overlord-data-context";
import {DiceIcon} from "../../../shared/icons/DiceIcon/DiceIcon";
import {AttackTypeIcon} from "../../../shared/icons/AttackTypeIcon/AttackTypeIcon";
import {useSwiper} from "swiper/react";

export const imgId = 'monster-card-background-img'

export const MonsterCard = ({monsterName}: { monsterName: string }) => {

    const swiper = useSwiper();

    const elementBounding = document.getElementById(imgId)?.getBoundingClientRect()

    const {monsters} = useOverlordDataContext()
    const [maxWidth, setMaxWidth] = useState<number | undefined>(undefined)
    const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined)

    const act = 'act1'
    const monsterData = monsters[monsterName][act];

    useEffect(() => {
        setMaxWidth(elementBounding?.width)
        setMaxHeight(elementBounding?.height)

        swiper.update();
    }, [elementBounding])

    return (
        <div className={styles.cardRoot}>
            <div className={styles.cardContent}
            >
                <div className={styles.cardDataTable}
                     style={{maxWidth, width: maxWidth, maxHeight, height: maxHeight}}
                >
                    <div className={styles.cardHeaderStats}>
                        <div className={styles.cardText}>{monsterData.minion.movement}</div>
                        <div className={styles.cardText}>{monsterData.minion.wounds}</div>
                        <div
                            className={styles.cardDefenceDice}>{monsterData.master.defenseDice.split(', ').map((diceColor, index, allDice) =>
                            <DiceIcon size={allDice.length > 1 ? 25 : 35} type={diceColor}/>)}</div>
                    </div>
                    <div className={styles.cardHeaderAbilities}>
                        {monsterData.minion?.abilities?.map((abilitieName, index) => (
                            <p key={`minion-${abilitieName}=${index}`}>{abilitieName}</p>))}
                        {monsterData.minion?.surgeAbilities?.map((abilitieName, index) => (
                            <p key={`minion-${abilitieName}=${index}`}>{abilitieName}</p>))}
                        {monsterData.minion?.actions?.map((actionName, index) => (
                            <p key={`minion-${actionName}=${index}`}>{actionName}</p>))}
                    </div>

                    <div className={styles.cardHeaderAttackDice}>
                        {monsterData.minion.attackDice.split(', ').map(diceColor => <DiceIcon type={diceColor}
                                                                                              size={25}/>)}
                    </div>

                    <div className={styles.middleBlock}>
                        <div className={styles.cardAttackTypeAndAct}>
                            <AttackTypeIcon type={monsterData.minion.attackType}/>

                            <div>
                                {act}
                            </div>
                        </div>

                        <div className={styles.cardMonsterName}>
                            {monsterName}
                        </div>
                    </div>

                    <div className={styles.cardHeaderAttackDice}>
                        {monsterData.master.attackDice.split(', ').map(diceColor => <DiceIcon type={diceColor}
                                                                                              size={25}/>)}
                    </div>

                    <div className={styles.cardHeaderAbilities}>
                        {monsterData.master?.abilities?.map(abilitieName => (<p>{abilitieName}</p>))}
                        {monsterData.master?.surgeAbilities?.map(abilitieName => (<p>{abilitieName}</p>))}
                        {monsterData.master?.actions?.map(actionName => (<p>{actionName}</p>))}
                    </div>

                    <div className={styles.cardHeaderStats}>
                        <div className={styles.cardText}>{monsterData.master.movement}</div>
                        <div className={styles.cardText}>{monsterData.master.wounds}</div>
                        <div
                            className={styles.cardDefenceDice}>{monsterData.master.defenseDice.split(', ').map((diceColor, index, allDice) =>
                            <DiceIcon size={allDice.length > 1 ? 25 : 35} type={diceColor}/>)}</div>
                    </div>

                </div>
                <img className={styles.backgroundImg} id={imgId}
                     src={require('../../../../assets/img/monsterShowcase/monster-card-front.png')} alt={''}/>
            </div>
        </div>
    )
}