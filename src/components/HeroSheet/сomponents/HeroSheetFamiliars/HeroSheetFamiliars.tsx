import styles from "../../hero-sheet.module.css";
import React from "react";
import {useGetControlTranslation} from "../../../../helpers/translationHelpers";
import {useParams} from "react-router-dom";
import {HeroPlayerPicks, HeroPlayersEnum} from "../../../../shared";
import {useHeroesDataContext} from "../../../../context";
import {getHeroFamiliars} from "../../../../helpers";
import {useGameSaveContext} from "../../../../context/game-save-context";
import {BrButton} from "../../../BrButton/BrButton";
import {SuggestTranslationButton} from "../../../SuggestTranslationButton/SuggestTranslationButton";

export const HeroSheetFamiliars = () => {

    const {playerRole} = useParams();
    const heroPlayerPosition = playerRole as HeroPlayersEnum;
    const {heroesPicks, language} = useGameSaveContext();
    const playerPicks = heroesPicks[heroPlayerPosition] as HeroPlayerPicks;

    const {familiars} = useHeroesDataContext()
    const {getControlTranslation} = useGetControlTranslation()

    const heroAvailableFamiliars = getHeroFamiliars(playerPicks);

    if (!heroAvailableFamiliars?.length) {
        return null;
    }

    const getFamiliarNameTranslation = (familiarName: string) => (
        familiars[familiarName]?.translation?.name?.[language] || familiarName
    )

    return (
        <fieldset>
            <legend>{getControlTranslation('Familiars')}</legend>

            {heroAvailableFamiliars?.map((familiarName: string, index) => {
                    const br = familiars?.[familiarName]?.br || 0;
                    return (
                        <div className={styles.checkboxLine}
                             key={`${heroPlayerPosition}-familiar-${index}`}>
                            {/*<input type="checkbox"*/}
                            {/*       onChange={() => {*/}
                            {/*       }}*/}
                            {/*       checked={heroAvailableFamiliars?.includes(familiarName)}*/}
                            {/*/>*/}

                            <input type="text" readOnly value={getFamiliarNameTranslation(familiarName)}
                                   onClick={() => {
                                   }}
                                   className={'input'}
                            />

                            <SuggestTranslationButton stringToTranslate={familiarName}/>

                            <BrButton br={br}/>
                        </div>
                    )
                }
            )
            }
        </fieldset>
    )
}