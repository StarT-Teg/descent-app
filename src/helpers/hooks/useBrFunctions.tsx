import {HeroPlayersEnum} from "../../types/shared";
import {floatClearing} from "../mathHelpers";
import {useOverlordDataContext} from "../../context/overlord-data-context";
import {useHeroesDataContext} from "../../context";
import {useGameSaveContext} from "../../context/game-save-context";


export function useBrFunctions() {

    const {campaignsData, overlordCards, monsters, lieutenants} = useOverlordDataContext();
    const {heroes, heroClasses, items} = useHeroesDataContext()

    const {overlordPicks, campaignPicks, heroesPicks} = useGameSaveContext();
    const {selectedCampaign, selectedMission, selectedEncounter, selectedAct} = campaignPicks
    const {pickedCards, pickedMonsters} = overlordPicks;

    const numberOfHeroes = Object.keys(heroesPicks).length;
    const currentAct = ('act' + selectedAct) as 'act1' | 'act2';

    function getMonsterGroupBr(monsterName: string) {
        if (!selectedAct) {
            return 0;
        }

        return Object.values(monsters?.[monsterName]['act' + selectedAct]).reduce((brAcc: number, monsterValue) => {
            const monsterAmount = monsterValue.groupSize[String(numberOfHeroes)];
            return Math.round(brAcc + (floatClearing(monsterValue.br) * monsterAmount));
        }, 0);
    }

    function getLieutenantBr(lieutenantName: string): number {

        if (!selectedAct) {
            return 0;
        }

        const baseBr = lieutenants[lieutenantName]?.[currentAct]?.br || 0;
        const additionalBr = lieutenants[lieutenantName][currentAct]?.stats?.[numberOfHeroes].br || 0;

        return Math.round(baseBr + additionalBr);
    };

    function getHeroBr(heroPosition: HeroPlayersEnum): number {

        const heroPicks = heroesPicks[heroPosition];
        let heroBr: number = 0;

        if (!!heroPicks?.heroName) {
            heroBr += floatClearing(heroes[heroPicks?.heroName].br);
        }

        if (!!heroPicks?.heroSkills?.length) {
            Object.keys(heroClasses).forEach((className) => {
                Object.keys(heroClasses[className].skills).forEach((skillName) => {
                    if (heroPicks.heroSkills?.includes(skillName)) {
                        heroBr += floatClearing(heroClasses[className].skills[skillName].br)
                    }
                })
            })
        }

        if (!!heroPicks?.heroItems?.length) {
            Object.keys(items).forEach((itemName) => {
                if (heroPicks.heroItems?.includes(itemName)) {
                    heroBr += floatClearing(items[itemName].br);
                }
            })
        }

        return Math.round(heroBr);
    }

    function getOverlordBr() {

        let overlordBr: number = 0;

        if (!Object.keys(overlordPicks).length) {
            return overlordBr;
        }

        if (!!pickedCards?.length) {
            pickedCards.forEach(cardName => {
                overlordBr += overlordCards[cardName].br;
            })
        }

        if (!!pickedMonsters?.length && !!campaignPicks?.selectedAct) {
            pickedMonsters.forEach(monsterName => {
                overlordBr += getMonsterGroupBr(monsterName);
            })
        }

        if (!!selectedCampaign && !!selectedMission && !!selectedEncounter) {
            campaignsData[selectedCampaign][selectedMission]?.encounters?.[selectedEncounter].lieutenants.forEach(lieutenantName => {
                overlordBr += getLieutenantBr(lieutenantName);
            })
        }

        return Math.round(overlordBr);
    }

    function getOverlordAvailableBr() {
        const heroesBR = Object.keys(heroesPicks).reduce((acc: number, heroPosition: string) => acc + getHeroBr(heroPosition as HeroPlayersEnum), 0)
        const overlordBR = getOverlordBr();

        return Math.round(heroesBR - overlordBR);
    }

    return {
        getMonsterGroupBr,
        getLieutenantBr,
        getHeroBr,
        getOverlordBr,
        getOverlordAvailableBr,
    }
}