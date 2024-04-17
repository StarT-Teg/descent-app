import styles from './choose-player-buttons.module.css'
import {HeroPlayersEnum} from "../../shared";
import {useNavigate} from "react-router-dom";
import React from "react";
import {Button} from "../shared/Button/Button";
import {Initial_Player_Picks, useGameSaveContext, useGameSaveDispatchContext} from "../../context/game-save-context";
import {GameSaveReducerActionTypeEnum} from "../../context/game-save-context-reducer";
import {useBrFunctions} from "../../helpers/hooks/useBrFunctions";

export const ChoosePlayerButtons = () => {
    const navigate = useNavigate();

    const {heroesPicks} = useGameSaveContext();
    const dispatchPlayersPick = useGameSaveDispatchContext();

    const {getHeroBr, getOverlordBr} = useBrFunctions();

    return (
        <div className={styles.content}>

            <Button onClick={() => {
                navigate(`${HeroPlayersEnum.hero1}`)
            }}>{heroesPicks[HeroPlayersEnum.hero1]?.heroName || 'Hero 1'} - {getHeroBr(HeroPlayersEnum.hero1)}</Button>

            <Button onClick={() => {
                navigate(`${HeroPlayersEnum.hero2}`)
            }}>{heroesPicks[HeroPlayersEnum.hero2]?.heroName || 'Hero 2'} - {getHeroBr(HeroPlayersEnum.hero2)}</Button>

            {!!heroesPicks?.hero3 ? (
                <Button onClick={() => {
                    navigate(`${HeroPlayersEnum.hero3}`)
                }}>{heroesPicks[HeroPlayersEnum.hero3]?.heroName || 'Hero 3'} - {getHeroBr(HeroPlayersEnum.hero3)}</Button>
            ) : (
                <Button onClick={() => {
                    dispatchPlayersPick({
                        actionType: GameSaveReducerActionTypeEnum.changeHeroesPicks,
                        payload: {
                            heroesPicks: {
                                ...heroesPicks,
                                [HeroPlayersEnum.hero3]: Initial_Player_Picks,
                            }
                        }
                    })
                }}>+</Button>
            )}

            {(!!heroesPicks?.hero4) ? (
                <Button onClick={() => {
                    navigate(`${HeroPlayersEnum.hero4}`)
                }}>{heroesPicks[HeroPlayersEnum.hero4]?.heroName || 'Hero 4'} - {getHeroBr(HeroPlayersEnum.hero4)}</Button>
            ) : (
                <Button onClick={() => {
                    dispatchPlayersPick({
                        actionType: GameSaveReducerActionTypeEnum.changeHeroesPicks,
                        payload: {
                            heroesPicks: {
                                ...heroesPicks,
                                [HeroPlayersEnum.hero4]: Initial_Player_Picks,
                            }
                        }
                    })
                }}>+</Button>
            )}

            <Button theme='red' onClick={() => {
                navigate('overlord')
            }}>
                Overlord - {getOverlordBr()}
            </Button>

            {/*<Button onClick={() => {*/}
            {/*    navigate('/settings')*/}
            {/*}}>*/}
            {/*    Test*/}
            {/*</Button>*/}

            {/*<button className={styles.button} onClick={handleTest}>test</button>*/}
        </div>
    )
}