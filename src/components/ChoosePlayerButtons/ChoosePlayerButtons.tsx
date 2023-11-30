import styles from './choose-player-buttons.module.css'
import {CurrentPlayersPicks, HeroPlayersEnum, navigationLinks} from "../../types/shared";
import {useNavigate} from "react-router-dom";
import React from "react";
import {useHeroesCurrentPicksContext} from "../../context/heroes-picks-context";

export const ChoosePlayerButtons = () => {
    const navigate = useNavigate();
    const playerPicks = useHeroesCurrentPicksContext() as CurrentPlayersPicks

    return (
        <div className={styles.content}>
            {Object.keys(playerPicks).map((heroPosition: string) => (
                    <div className={styles.button} onClick={() => {
                        navigate(navigationLinks.hero1)
                    }}>
                        {playerPicks[heroPosition as HeroPlayersEnum]?.heroName || heroPosition}
                    </div>
                )
            )}

            <div className={styles.button} onClick={() => {
                navigate(navigationLinks.overlord)
            }}>
                Overlord
            </div>
        </div>
    )
}