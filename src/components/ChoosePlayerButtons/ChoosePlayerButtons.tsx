import styles from './choose-player-buttons.module.css'
import {HeroPlayersEnum} from "../../types/shared";
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

    const {getHeroBr} = useBrFunctions();

    return (
        <div className={styles.content}>
            {Object.keys(heroesPicks).map((heroPositionString: string) => {

                    const heroPosition = heroPositionString as HeroPlayersEnum;

                    return <Button onClick={() => {
                        navigate(`${heroPosition}`)
                    }}>{heroesPicks[heroPosition as HeroPlayersEnum]?.heroName || heroPosition} - {getHeroBr(heroPosition)}</Button>
                }
            )}

            {(Object.keys(heroesPicks).length < 4) && <Button onClick={() => {
                dispatchPlayersPick({
                    actionType: GameSaveReducerActionTypeEnum.changeHeroesPicks,
                    payload: {
                        heroesPicks: {
                            ...heroesPicks,
                            ['hero' + (Object.keys(heroesPicks).length + 1)]: Initial_Player_Picks,
                        }
                    }
                })
            }}>+</Button>}

            <Button theme='red' onClick={() => {
                navigate('overlord')
            }}>
                Overlord
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