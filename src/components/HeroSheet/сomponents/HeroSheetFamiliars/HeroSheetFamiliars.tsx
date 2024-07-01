import styles from "../../hero-sheet.module.css";
import React from "react";
import {useGetControlTranslation} from "../../../../helpers/translationHelpers";
import {useParams} from "react-router-dom";
import {HeroPlayerPicks, HeroPlayersEnum} from "../../../../shared";
import {useHeroesDataContext} from "../../../../context";
import {getHeroFamiliars} from "../../../../helpers";
import {useGameSaveContext} from "../../../../context/game-save-context";

export const HeroSheetFamiliars = () => {

    const {playerRole} = useParams();
    const heroPlayerPosition = playerRole as HeroPlayersEnum;
    const {heroesPicks} = useGameSaveContext();
    const playerPicks = heroesPicks[heroPlayerPosition] as HeroPlayerPicks;

    const {familiars} = useHeroesDataContext()
    const {getControlTranslation} = useGetControlTranslation()

    const heroAvailableFamiliars = getHeroFamiliars(playerPicks);

    if (!heroAvailableFamiliars?.length) {
        return null;
    }

    return (
        <fieldset>
            <legend>{getControlTranslation('Familiars')}</legend>

            {heroAvailableFamiliars?.map((familiarName: string, index) => {
                    return (
                        <div className={styles.checkboxLine}
                             key={`${heroPlayerPosition}-familiar-${index}`}>
                            <input type="checkbox"
                                   onChange={() => {
                                   }}
                                   checked={heroAvailableFamiliars?.includes(familiarName)}
                            />

                            <input type="text" readOnly value={familiarName}
                                   onClick={() => {
                                   }}
                                   className={'input'}
                            />

                            <div className={styles.br}>
                                BR: {familiars?.[familiarName]?.br || 0}
                            </div>
                        </div>
                    )
                }
            )
            }
        </fieldset>
    )
}