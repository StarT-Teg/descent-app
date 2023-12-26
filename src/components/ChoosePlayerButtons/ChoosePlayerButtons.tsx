import styles from './choose-player-buttons.module.css'
import {HeroPlayersEnum} from "../../types/shared";
import {useNavigate} from "react-router-dom";
import React from "react";
import {Button} from "../shared/Button/Button";
import {Initial_Player_Picks, useGameSaveContext, useGameSaveDispatchContext} from "../../context/game-save-context";
import {GameSaveReducerActionTypeEnum} from "../../context/game-save-context-reducer";

export const ChoosePlayerButtons = () => {
    const navigate = useNavigate();

    const {heroesPicks, overlordPicks} = useGameSaveContext();
    const dispatchPlayersPick = useGameSaveDispatchContext();

    // const localStorageSaveKey = 'descent-save-game-uuid';
    // const uuid = localStorage.getItem(localStorageSaveKey)!
    //
    // const {mutate} = useSetGameSaveTest();

    // const handleTest = () => {
    //
    //     mutate({data: {campaignPicks}, uuid}, {
    //         onSuccess: (res) => {
    //             console.log(res)
    //         }
    //     });
    // }


    return (
        <div className={styles.content}>
            {Object.keys(heroesPicks).map((heroPosition: string) => (
                <Button onClick={() => {
                    navigate(`${heroPosition}`)
                }}>{heroesPicks[heroPosition as HeroPlayersEnum]?.heroName || heroPosition}</Button>

                )
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

            {/*<button className={styles.button} onClick={handleTest}>test</button>*/}
        </div>
    )
}