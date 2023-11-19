import React from 'react';
import HeroSheet from "./SingleHeroSheet/HeroSheet";
import {useHeroesCurrentPicksContext} from "../../context/player-picks-context";
import {CurrentPlayersPicks, HeroPlayersEnum} from "../../types";

export default function HeroBundle() {

    const playerPicks = useHeroesCurrentPicksContext() as CurrentPlayersPicks;

    return (
        <div>
            {Object.keys(playerPicks).map((playerPosition) => {
                if (!!playerPicks[playerPosition as HeroPlayersEnum]) {
                    return (<HeroSheet heroPlayerPosition={playerPosition as HeroPlayersEnum} key={playerPosition}/>)
                }
                return null
            })}
            {/*<div>{allHeroesBRSum}</div>*/}
        </div>
    )

}
