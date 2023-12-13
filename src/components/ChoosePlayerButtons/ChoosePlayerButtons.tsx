import styles from './choose-player-buttons.module.css'
import {CurrentPlayersPicks, HeroPlayersEnum, navigationLinks} from "../../types/shared";
import {useNavigate} from "react-router-dom";
import React from "react";
import {
    initialPlayerPicks,
    useHeroesCurrentPicksContext,
    useHeroesCurrentPicksDispatchContext,
    CurrentHeroesPicksReducerActionsEnum
} from "../../context";
import {HeroButton} from "../shared/HeroButton/HeroButton";

export const ChoosePlayerButtons = () => {
    const navigate = useNavigate();
    const playerPicks = useHeroesCurrentPicksContext() as CurrentPlayersPicks
    const dispatchPlayersPick = useHeroesCurrentPicksDispatchContext();
    // const {mutate} = useSetGameSave(); // "API keys are not supported by this API. Expected OAuth2 access token or other authentication credentials that assert a principal. See https://cloud.google.com/docs/authentication"

    return (
        <div className={styles.content}>
            {Object.keys(playerPicks).map((heroPosition: string) => (
                    <HeroButton onClick={() => {
                        navigate(`players/${heroPosition}`)
                    }} buttonText={playerPicks[heroPosition as HeroPlayersEnum]?.heroName || heroPosition}/>

                )
            )}

            {(Object.keys(playerPicks).length < 4) && <HeroButton onClick={() => {
                dispatchPlayersPick({
                    actionType: CurrentHeroesPicksReducerActionsEnum.changePicks,
                    playersPicks: {
                        ['hero'+(Object.keys(playerPicks).length + 1)]: initialPlayerPicks,
                    }
                })
            }} buttonText={'+'}/>}

            <div className={styles.button} onClick={() => {
                navigate(navigationLinks.overlord)
            }}>
                Overlord
            </div>
        </div>
    )
}