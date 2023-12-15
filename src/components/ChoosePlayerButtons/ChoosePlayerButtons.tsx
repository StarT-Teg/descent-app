import styles from './choose-player-buttons.module.css'
import {HeroPlayersEnum, navigationLinks} from "../../types/shared";
import {useNavigate} from "react-router-dom";
import React from "react";
import {HeroButton} from "../shared/HeroButton/HeroButton";
import {Initial_Player_Picks, useGameSaveContext, useGameSaveDispatchContext} from "../../context/game-save-context";
import {GameSaveReducerActionTypeEnum} from "../../context/game-save-context-reducer";

export const ChoosePlayerButtons = () => {
    const navigate = useNavigate();

    const {heroesPicks} = useGameSaveContext();
    const dispatchPlayersPick = useGameSaveDispatchContext();
    // const {mutate} = useSetGameSave(); // "API keys are not supported by this API. Expected OAuth2 access token or other authentication credentials that assert a principal. See https://cloud.google.com/docs/authentication"

    return (
        <div className={styles.content}>
            {Object.keys(heroesPicks).map((heroPosition: string) => (
                    <HeroButton onClick={() => {
                        navigate(`players/${heroPosition}`)
                    }} buttonText={heroesPicks[heroPosition as HeroPlayersEnum]?.heroName || heroPosition}/>

                )
            )}

            {(Object.keys(heroesPicks).length < 4) && <HeroButton onClick={() => {
                dispatchPlayersPick({
                    actionType: GameSaveReducerActionTypeEnum.changeHeroesPicks,
                    payload: {
                        heroesPicks: {
                            ...heroesPicks,
                            ['hero' + (Object.keys(heroesPicks).length + 1)]: Initial_Player_Picks,
                        }
                    }
                })
            }} buttonText={'+'}/>}

            <button className={styles.button} onClick={() => {
                navigate(navigationLinks.overlord)
            }}>
                Overlord
            </button>
        </div>
    )
}