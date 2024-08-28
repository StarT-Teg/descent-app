import styles from './choose-player-buttons.module.css'
import {HeroPlayersEnum} from "../../shared";
import {useNavigate} from "react-router-dom";
import React from "react";
import {Button} from "../shared";
import {Initial_Player_Picks, useGameSaveContext, useGameSaveDispatchContext} from "../../context/game-save-context";
import {GameSaveReducerActionTypeEnum} from "../../context/game-save-context-reducer";
import {useBrFunctions} from "../../helpers/hooks/useBrFunctions";
import {useHeroesDataContext} from "../../context";
import {ControlsNameEnum, useGetControlTranslation} from "../../helpers/translationHelpers";

export const ChoosePlayerButtons = () => {
    const navigate = useNavigate();

    const {heroesPicks, language} = useGameSaveContext();
    const {heroes} = useHeroesDataContext();
    const dispatchPlayersPick = useGameSaveDispatchContext();
    const {getControlTranslation} = useGetControlTranslation();

    const getNameTranslation = (name?: string) => {
        return heroes?.[name || '']?.translation?.name?.[language || ''] || name;
    }


    const {getHeroBr, getOverlordBr} = useBrFunctions();

    return (
        <div className={styles.root}>
            <Button theme='simple' onClick={() => {
                navigate(`campaignProgress`)
            }}>{getControlTranslation(ControlsNameEnum.campaignProgress)}</Button>
            <div className={styles.content}>

                <Button onClick={() => {
                    navigate(`${HeroPlayersEnum.hero1}`)
                }}>{getNameTranslation(heroesPicks[HeroPlayersEnum.hero1]?.heroName) || (getControlTranslation('Hero') + ' 1')} - {getHeroBr(HeroPlayersEnum.hero1)}</Button>

                <Button onClick={() => {
                    navigate(`${HeroPlayersEnum.hero2}`)
                }}>{getNameTranslation(heroesPicks[HeroPlayersEnum.hero2]?.heroName) || (getControlTranslation('Hero') + ' 2')} - {getHeroBr(HeroPlayersEnum.hero2)}</Button>

                {!!heroesPicks?.hero3 ? (
                    <Button onClick={() => {
                        navigate(`${HeroPlayersEnum.hero3}`)
                    }}>{getNameTranslation(heroesPicks[HeroPlayersEnum.hero3]?.heroName) || (getControlTranslation('Hero') + ' 3')} - {getHeroBr(HeroPlayersEnum.hero3)}</Button>
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
                    }}>{getNameTranslation(heroesPicks[HeroPlayersEnum.hero4]?.heroName) || (getControlTranslation('Hero') + ' 4')} - {getHeroBr(HeroPlayersEnum.hero4)}</Button>
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
                    {getControlTranslation('Overlord')} - {getOverlordBr()}
                </Button>

                {/*<Button onClick={() => {*/}
                {/*    navigate('/settings')*/}
                {/*}}>*/}
                {/*    Test*/}
                {/*</Button>*/}

                {/*<button className={styles.button} onClick={handleTest}>test</button>*/}
            </div>
        </div>
    )
}