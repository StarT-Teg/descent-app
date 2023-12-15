import styles from './header.module.css'
import {Link, Outlet} from "react-router-dom";
import {useHeroesDataContext} from "../../context";
import {CurrentOverlordPicks, HeroPlayerPicks} from "../../types/shared";
import {useOverlordDataContext} from "../../context/overlord-data-context";
import React, {SVGProps} from 'react';
import {JSX} from 'react/jsx-runtime';
import {useGameSaveContext} from "../../context/game-save-context";
import {getMonsterGroupBr} from "../../helpers";

const ArrowBackIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        width={64}
        height={64}
        viewBox="0 0 26.676 26.676"
        {...props}
    >
        <path
            d="M26.105 21.891a.568.568 0 0 1-.529-.346c-.066-.156-1.716-3.857-7.885-4.59-1.285-.156-2.824-.236-4.693-.25v4.613a.574.574 0 0 1-.304.508.577.577 0 0 1-.588-.033L.254 13.815a.573.573 0 0 1 0-.953l11.857-7.979a.563.563 0 0 1 .588-.029c.19.102.303.295.303.502v4.293c2.578.336 13.674 2.33 13.674 11.674a.574.574 0 0 1-.459.562c-.037.006-.076.006-.112.006z"/>
    </svg>
)

export const Header = () => {

    const {heroes, heroClasses, items} = useHeroesDataContext()
    const {heroesPicks, overlordPicks, campaignPicks} = useGameSaveContext();
    const {
        overlordCards,
        plotCards,
        lieutenants,
        relics,
        agents,
        monsters,
    } = useOverlordDataContext();

    console.log('overlordPicks: ', overlordPicks)

    const heroesAmount = Object.keys(heroesPicks).length;

    const getHeroBr = (heroPicks: HeroPlayerPicks): number => {
        let heroBr: number = 0;

        if (!!heroPicks?.heroName) {
            heroBr += parseFloat(heroes[heroPicks?.heroName].br);
        }

        if (!!heroPicks?.heroSkills?.length) {
            Object.keys(heroClasses).forEach((className) => {
                Object.keys(heroClasses[className].skills).forEach((skillName) => {
                    if (heroPicks.heroSkills?.includes(skillName)) {
                        console.log('skill Br: ', parseFloat(heroClasses[className].skills[skillName].br))
                        heroBr += parseFloat(heroClasses[className].skills[skillName].br)
                    }
                })
            })
        }

        if (!!heroPicks.heroItems?.length) {
            Object.keys(items).forEach((itemName) => {
                if (heroPicks.heroItems?.includes(itemName)) {
                    console.log('item BR:', parseFloat(items[itemName].br))
                    heroBr += parseFloat(items[itemName].br);
                }
            })
        }

        return Math.floor(heroBr);
    }

    const getOverlordBr = (overlordPicks: CurrentOverlordPicks) => {
        let overlordBr = 0;

        if (!Object.keys(overlordPicks).length) {
            return overlordBr;
        }

        if (!!overlordPicks.pickedCards?.length) {
            overlordPicks.pickedCards.forEach(cardName => {
                overlordBr += overlordCards[cardName].br;
            })
        }

        if (!!overlordPicks.pickedMonsters?.length && !!campaignPicks?.selectedAct) {
            overlordPicks.pickedMonsters.forEach(monsterName => {
                overlordBr += getMonsterGroupBr(monsters, monsterName, heroesAmount, `act${campaignPicks.selectedAct}`);
            })
        }

        return overlordBr;
    }

    const heroesBR = Object.values(heroesPicks!).reduce((acc: number, heroData) => acc + getHeroBr(heroData), 0)
    const overlordBR = getOverlordBr(overlordPicks);

    return (
        <div className={styles.root} id='root'>
            <div className={styles.header}>
                <Link to={`/`}> <ArrowBackIcon className={styles.extraBackArrowIcon}/></Link>
                heroes BR: {heroesBR}
                overlord BR: {overlordBR}
            </div>
            <div className={styles.content}>
                <Outlet/>
            </div>
        </div>
    )
}